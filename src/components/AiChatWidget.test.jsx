import React from "react";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";

const askAiMock = vi.hoisted(() => vi.fn());
const extractOcrBase64Mock = vi.hoisted(() => vi.fn());

vi.mock("@/services/ai.service", () => ({
  askAi: askAiMock,
  extractOcrBase64: extractOcrBase64Mock,
}));

import AiChatWidget from "./AiChatWidget";

const renderWidget = () =>
  render(
    <MemoryRouter>
      <AiChatWidget />
    </MemoryRouter>,
  );

const openWidget = async (user) => {
  renderWidget();
  await user.click(screen.getByRole("button", { name: /asisten ai/i }));
};

const getTextarea = () => screen.getByPlaceholderText("Ketik pesan Anda...");

const getSendButton = () =>
  getTextarea().closest("form").querySelector('button[type="submit"]');

const getFileInput = () =>
  document.querySelector('input[type="file"][accept="image/*,.pdf,.doc,.docx"]');

describe("AiChatWidget", () => {
  beforeEach(() => {
    askAiMock.mockReset();
    extractOcrBase64Mock.mockReset();
    localStorage.clear();
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:preview-test");
    document.body.innerHTML = "";
    delete window.mammoth;
    delete window.pdfjsLib;
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("menampilkan empty state, contoh prompt, dan mengisi textarea saat contoh diklik", async () => {
    const user = userEvent.setup();

    await openWidget(user);

    expect(screen.getByText("Spentaru AI")).toBeInTheDocument();
    expect(screen.getByText(/Halo! Saya Spentaru AI/i)).toBeInTheDocument();

    await user.click(screen.getByText("Cari arsip kegiatan"));

    expect(getTextarea()).toHaveValue("Carikan saya arsip kegiatan tahun 2024");
    expect(getSendButton()).toBeEnabled();
  });

  it("mengirim prompt yang sudah di-trim, mempertahankan unicode/script payload, dan menampilkan file cards", async () => {
    const user = userEvent.setup();
    askAiMock.mockResolvedValueOnce({
      answer: "Ini **jawaban** AI",
      file_cards: [
        {
          archive_id: "arsip-1",
          title: "Raport <script>alert(1)</script> 😀",
          file_name: "raport.pdf",
          file_url: "/storage/raport.pdf",
          year: 2024,
          category: "Akademik",
          subcategory: "Raport",
          location: {
            cabinet_name: "Lemari A",
            rack_number: 2,
            slot_number: 3,
            label_code: "A-2-3",
          },
        },
      ],
    });

    await openWidget(user);
    fireEvent.change(getTextarea(), {
      target: { value: "  Cari raport 😀\n<script>alert(1)</script>  " },
    });
    await user.click(getSendButton());

    expect(askAiMock).toHaveBeenCalledWith(
      "Cari raport 😀\n<script>alert(1)</script>",
    );
    expect(screen.getByText("Cari raport 😀")).toBeInTheDocument();
    expect(screen.getAllByText(/<script>alert\(1\)<\/script>/)).toHaveLength(2);
    expect(
      await screen.findByText(
        (_, element) =>
          element.tagName.toLowerCase() === "p" &&
          element.textContent === "Ini jawaban AI",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Raport <script>alert(1)</script> 😀"),
    ).toBeInTheDocument();
    expect(screen.getByText("raport.pdf")).toBeInTheDocument();
    expect(screen.getByText("Lemari A · Rak 2 · Slot 3 · A-2-3")).toBeInTheDocument();
    expect(screen.getByText("Lihat File")).toHaveAttribute(
      "href",
      expect.stringContaining("/archives/arsip-1/preview"),
    );
    expect(screen.getByText("Unduh File")).toHaveAttribute(
      "href",
      "http://localhost:8000/api/v1/archives/arsip-1/download",
    );
  });

  it("tidak mengirim input kosong, spasi saja, atau ketika sedang loading", async () => {
    const user = userEvent.setup();
    askAiMock.mockImplementationOnce(() => new Promise(() => {}));

    await openWidget(user);
    expect(getSendButton()).toBeDisabled();

    await user.type(getTextarea(), "     ");
    expect(getSendButton()).toBeDisabled();
    fireEvent.submit(getTextarea().closest("form"));
    expect(askAiMock).not.toHaveBeenCalled();

    await user.clear(getTextarea());
    await user.type(getTextarea(), "pertanyaan valid");
    await user.click(getSendButton());
    expect(askAiMock).toHaveBeenCalledTimes(1);
    expect(getSendButton()).toBeDisabled();

    fireEvent.submit(getTextarea().closest("form"));
    expect(askAiMock).toHaveBeenCalledTimes(1);
  });

  it("menampilkan pesan error saat response AI tidak punya answer valid", async () => {
    const user = userEvent.setup();
    askAiMock.mockResolvedValueOnce({ answer: "   ", file_cards: [] });

    await openWidget(user);
    await user.type(getTextarea(), "response malformed");
    await user.keyboard("{Enter}");

    expect(
      await screen.findByText("Respons AI tidak valid."),
    ).toBeInTheDocument();
    expect(console.error).toHaveBeenCalled();
  });

  it("memilih pesan error backend paling spesifik dan fallback network jika dependency gagal", async () => {
    const user = userEvent.setup();
    askAiMock
      .mockRejectedValueOnce({
        response: { data: { error: { message: "Quota backend habis" } } },
      })
      .mockRejectedValueOnce({ code: "ERR_NETWORK" });

    await openWidget(user);
    await user.type(getTextarea(), "pertanyaan pertama");
    await user.click(getSendButton());
    expect(await screen.findByText("Quota backend habis")).toBeInTheDocument();

    await user.type(getTextarea(), "pertanyaan kedua");
    await user.click(getSendButton());
    expect(
      await screen.findByText(/Tidak bisa terhubung ke backend Laravel/i),
    ).toBeInTheDocument();
  });

  it("menyimpan preset lebar dan membaca nilai dari localStorage", async () => {
    const user = userEvent.setup();
    localStorage.setItem("ai-widget-width", "500");

    await openWidget(user);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveStyle({ width: "500px" });

    await user.click(screen.getByRole("button", { name: /pengaturan lebar/i }));
    await user.click(screen.getByRole("button", { name: /sempit/i }));

    expect(localStorage.getItem("ai-widget-width")).toBe("320");
    expect(dialog).toHaveStyle({ width: "320px" });
  });

  it("memproses upload gambar lewat EasyOCR dan merender preview serta metadata hasil", async () => {
    extractOcrBase64Mock.mockResolvedValueOnce({
      text: "Nama: Siswa Unicode 😀",
      engine: "EasyOCR",
      confidence: 93.456,
    });
    const user = userEvent.setup();

    await openWidget(user);
    const file = new File(["fake image"], "scan 😀.png", {
      type: "image/png",
    });
    fireEvent.change(getFileInput(), { target: { files: [file] } });

    expect(await screen.findByText("scan 😀.png")).toBeInTheDocument();
    expect(URL.createObjectURL).toHaveBeenCalledWith(file);
    await waitFor(() =>
      expect(extractOcrBase64Mock).toHaveBeenCalledWith(
        expect.stringMatching(/^ZmFrZSBpbWFnZQ==/),
      ),
    );
    expect(await screen.findByText("Nama: Siswa Unicode 😀")).toBeInTheDocument();
    expect(screen.getByText("EasyOCR")).toBeInTheDocument();
    expect(screen.getByText("93.46%")).toBeInTheDocument();
  });

  it("memproses dokumen Word dengan mammoth dan mereset status loading", async () => {
    window.mammoth = {
      extractRawText: vi.fn().mockResolvedValue({ value: "" }),
    };
    const user = userEvent.setup();

    await openWidget(user);
    const file = new File(["word"], "kosong.docx", {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    fireEvent.change(getFileInput(), { target: { files: [file] } });

    expect(
      await screen.findByText("Mengekstrak teks dokumen Word..."),
    ).toBeInTheDocument();

    expect(
      await screen.findByText("(Dokumen kosong)", {}, { timeout: 2500 }),
    ).toBeInTheDocument();
    expect(screen.getByText("Native Text Extractor (Mammoth)")).toBeInTheDocument();
    expect(screen.queryByText("Mengekstrak teks dokumen Word...")).not.toBeInTheDocument();
  });

  it("mengambil teks native dari PDF multi-halaman tanpa memanggil OCR saat teks cukup panjang", async () => {
    const longText = "teks ".repeat(90);
    const getTextContent = vi
      .fn()
      .mockResolvedValueOnce({ items: [{ str: longText }] })
      .mockResolvedValueOnce({ items: [{ str: "halaman dua" }] });
    window.pdfjsLib = {
      GlobalWorkerOptions: {},
      getDocument: vi.fn(() => ({
        promise: Promise.resolve({
          numPages: 2,
          getPage: vi.fn().mockResolvedValue({ getTextContent }),
        }),
      })),
    };
    const user = userEvent.setup();

    await openWidget(user);
    fireEvent.change(getFileInput(), {
      target: {
        files: [
          new File(["%PDF"], "arsip.pdf", { type: "application/pdf" }),
        ],
      },
    });

    expect(await screen.findByText(/teks teks teks/)).toBeInTheDocument();
    expect(screen.getByText("Native PDF Extractor")).toBeInTheDocument();
    expect(extractOcrBase64Mock).not.toHaveBeenCalled();
  });

  it("menampilkan error untuk format file tidak didukung dan dependency OCR yang rusak", async () => {
    const user = userEvent.setup();
    extractOcrBase64Mock.mockResolvedValueOnce({ confidence: Number.NaN });

    await openWidget(user);
    fireEvent.change(getFileInput(), {
      target: { files: [new File(["x"], "catatan.txt", { type: "text/plain" })] },
    });

    expect(
      await screen.findByText("Gagal memproses file: Format tidak didukung."),
    ).toBeInTheDocument();

    fireEvent.change(getFileInput(), {
      target: { files: [new File(["bad"], "rusak.png", { type: "image/png" })] },
    });

    expect(
      await screen.findByText(
        "Gagal memproses file: EasyOCR processing failed: EasyOCR processing failed",
      ),
    ).toBeInTheDocument();
  });
});
