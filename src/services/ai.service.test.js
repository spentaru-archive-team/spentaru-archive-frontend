import { beforeEach, describe, expect, it, vi } from "vitest";

const postMock = vi.hoisted(() => vi.fn());

vi.mock("./axios", () => ({
  default: {
    post: postMock,
  },
}));

import {
  askAi,
  extractOcr,
  extractOcrBase64,
  extractPdfNative,
} from "./ai.service";

describe("ai.service", () => {
  beforeEach(() => {
    postMock.mockReset();
  });

  describe("askAi", () => {
    it("mengirim prompt, use_search, dan trace id eksplisit yang sudah di-trim", async () => {
      postMock.mockResolvedValueOnce({
        data: { data: { answer: "Jawaban AI", file_cards: [] } },
      });

      const result = await askAi("Cari arsip tahun 2024", true, " trace-123 ");

      expect(postMock).toHaveBeenCalledWith(
        "/chat/ask",
        { message: "Cari arsip tahun 2024", use_search: true },
        { headers: { "X-Trace-Id": "trace-123" } },
      );
      expect(result).toEqual({ answer: "Jawaban AI", file_cards: [] });
    });

    it("menghasilkan trace id UUID saat trace id kosong/null/undefined", async () => {
      const randomUUIDSpy = vi
        .spyOn(crypto, "randomUUID")
        .mockReturnValue("uuid-from-test");
      postMock.mockResolvedValueOnce({ data: { answer: "ok" } });

      await askAi("Halo", false, "   ");

      expect(postMock).toHaveBeenCalledWith(
        "/chat/ask",
        { message: "Halo", use_search: false },
        { headers: { "X-Trace-Id": "uuid-from-test" } },
      );
      randomUUIDSpy.mockRestore();
    });

    it("mengembalikan payload top-level jika backend lama mengirim answer di root", async () => {
      postMock.mockResolvedValueOnce({
        data: { answer: "Format lama", extra: "tetap dipertahankan" },
      });

      await expect(askAi("format lama")).resolves.toEqual({
        answer: "Format lama",
        extra: "tetap dipertahankan",
      });
    });

    it("mengembalikan data nested non-answer untuk kompatibilitas response parsial", async () => {
      postMock.mockResolvedValueOnce({
        data: { data: { status: "queued", meta: { retryAfter: 3 } } },
      });

      await expect(askAi("status")).resolves.toEqual({
        status: "queued",
        meta: { retryAfter: 3 },
      });
    });

    it("mengembalikan object kosong saat response data null/undefined", async () => {
      postMock.mockResolvedValueOnce({ data: null });

      await expect(askAi("payload null")).resolves.toEqual({});
    });

    it("tidak mengubah payload prompt ekstrem karena sanitasi bukan tanggung jawab service client", async () => {
      const prompt =
        "  <script>alert(1)</script>\nSELECT * FROM archives;\t😀 漢字  ";
      postMock.mockResolvedValueOnce({ data: { answer: "aman" } });

      await askAi(prompt);

      expect(postMock.mock.calls[0][1].message).toBe(prompt);
    });

    it("meneruskan error dependency agar caller dapat menampilkan fallback UI", async () => {
      const apiError = new Error("timeout");
      postMock.mockRejectedValueOnce(apiError);

      await expect(askAi("akan gagal")).rejects.toThrow("timeout");
    });
  });

  describe("extractOcr", () => {
    it("mengirim file sebagai multipart form-data dan mengambil data OCR nested", async () => {
      const file = new File(["isi"], "scan.png", { type: "image/png" });
      postMock.mockResolvedValueOnce({
        data: { data: { text: "teks hasil OCR", confidence: 98.12 } },
      });

      const result = await extractOcr(file, "ocr-trace");

      expect(postMock).toHaveBeenCalledWith(
        "/ai/ocr/extract",
        expect.any(FormData),
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-Trace-Id": "ocr-trace",
          },
        },
      );
      expect(postMock.mock.calls[0][1].get("file")).toBe(file);
      expect(result).toEqual({ text: "teks hasil OCR", confidence: 98.12 });
    });

    it("mengembalikan object kosong saat backend OCR mengirim payload rusak", async () => {
      postMock.mockResolvedValueOnce({ data: { malformed: true } });

      await expect(extractOcr(new Blob(["x"]), "trace")).resolves.toEqual({});
    });
  });

  describe("extractOcrBase64", () => {
    it("mengirim base64 apa adanya, termasuk string kosong dan karakter non-base64", async () => {
      postMock.mockResolvedValueOnce({ data: { data: { text: "" } } });

      await extractOcrBase64("not-base64-😀", "base64-trace");

      expect(postMock).toHaveBeenCalledWith(
        "/ai/ocr/extract-base64",
        { image: "not-base64-😀" },
        { headers: { "X-Trace-Id": "base64-trace" } },
      );
    });

    it("mengembalikan object kosong saat response undefined", async () => {
      postMock.mockResolvedValueOnce({});

      await expect(extractOcrBase64("", "trace")).resolves.toEqual({});
    });
  });

  describe("extractPdfNative", () => {
    it("mengirim PDF sebagai multipart form-data", async () => {
      const file = new File(["%PDF"], "dokumen.pdf", {
        type: "application/pdf",
      });
      postMock.mockResolvedValueOnce({ data: { data: { text: "PDF asli" } } });

      const result = await extractPdfNative(file, "pdf-trace");

      expect(postMock).toHaveBeenCalledWith(
        "/ai/pdf/extract-native",
        expect.any(FormData),
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-Trace-Id": "pdf-trace",
          },
        },
      );
      expect(postMock.mock.calls[0][1].get("file")).toBe(file);
      expect(result).toEqual({ text: "PDF asli" });
    });
  });
});
