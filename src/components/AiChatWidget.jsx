import React, { useMemo, useState, useRef, useEffect } from "react";
import {
  BotMessageSquare,
  SendHorizontal,
  Sparkles,
  X,
  Paperclip,
  FileText,
  Image as ImageIcon,
  File as FileIcon,
  Zap,
  FileCode,
  Wand2,
} from "lucide-react";
import axios from "axios";

// Import file system prompt lokalmu
import systemPromptText from "@/services/system.txt?raw";

// Import Komponen Shadcn UI
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

// =====================================================================
// KONFIGURASI API & PROMPT AI
// =====================================================================
// URL sudah dibersihkan dan dipastikan benar 100%
const AI_URL = "https://api.siputzx.my.id/api/ai/glm47flash";

// Gunakan prompt dari file txt, ATAU gunakan fallback prompt ketat ini
const SYSTEM_PROMPT =
  systemPromptText?.trim() ||
  `Kamu adalah "Spentaru AI", asisten virtual resmi untuk sistem pengarsipan di SMP Negeri 1 Waru.
  
  KONTEKS PENTING:
  Spentaru adalah Sistem Penyimpanan Terpadu Arsip (Integrated Archive System) untuk SMP Negeri 1 Waru. Sistem ini berfungsi untuk mengelola, mengarsipkan, dan menyimpan dokumen-dokumen sekolah secara digital. Spentaru ini berada di dalam website resmi SMP Negeri 1 Waru, khususnya di menu Web Arsip.
  
  ATURAN SANGAT KETAT:
  1. Kamu HANYA BOLEH menjawab pertanyaan yang berhubungan dengan: SMPN 1 Waru, pengarsipan dokumen, tata letak hardfile (lemari/rak), event sekolah, OCR, dan fitur website ini.
  2. Jika pengguna bertanya hal di LUAR TOPIK (seperti coding umum, resep makanan, cuaca, dll), TOLAK DENGAN SOPAN.
  3. Jawabanmu harus profesional, ramah, dan ringkas. Gunakan format tebal (dengan tanda **teks**) untuk menekankan kata-kata penting.`;

// Fungsi pemanggil API Teks (Siputzx)
async function askAi(prompt) {
  const response = await axios.get(AI_URL, {
    params: {
      prompt,
      system: SYSTEM_PROMPT,
      temperature: 0.3, // Suhu diturunkan agar AI lebih fokus dan formal
    },
  });

  const payload = response?.data;

  if (payload?.status === false) {
    throw new Error("Layanan AI sedang tidak tersedia.");
  }

  const text =
    payload?.data?.response ||
    payload?.data?.parts?.[0]?.text ||
    payload?.data?.text ||
    payload?.result ||
    payload?.message;

  if (!text || typeof text !== "string") {
    throw new Error("Respons AI tidak valid.");
  }

  return text.trim();
}

// =====================================================================
// KOMPONEN UTAMA WIDGET
// =====================================================================
export default function AiChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [processStatus, setProcessStatus] = useState("");

  const [messages, setMessages] = useState([]);

  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Load Library OCR & Extractor secara dinamis
  useEffect(() => {
    const loadScript = (src) => {
      if (!document.querySelector(`script[src="${src}"]`)) {
        const script = document.createElement("script");
        script.src = src;
        script.crossOrigin = "anonymous";
        document.body.appendChild(script);
      }
    };
    // URL Library dipastikan bersih tanpa tag markdown
    loadScript(
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",
    );
    loadScript("https://unpkg.com/mammoth@1.6.0/mammoth.browser.min.js");
  }, []);

  const isSendDisabled = useMemo(() => {
    return loading || (!input.trim() && !processStatus);
  }, [input, loading, processStatus]);

  // Fungsi untuk merender Markdown Bold (**teks**) menjadi <strong>
  const formatText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-bold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  // --- HANDLER CHAT TEKS BIASA ---
  const handleSend = async (event) => {
    if (event) event.preventDefault();

    const prompt = input.trim();
    if (!prompt || loading) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: prompt, type: "text" },
    ]);
    setInput("");
    setLoading(true);

    try {
      // Memanggil fungsi askAi yang sekarang menyatu di file ini
      const answer = await askAi(prompt);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: answer, type: "text" },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Maaf, terjadi kesalahan saat mengambil jawaban AI.",
          type: "text",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // --- API LOCAL EASYOCR (UNTUK FALLBACK OCR) ---
  const callLocalEasyOCR = async (base64Data, mimeType) => {
    const response = await fetch("http://localhost:5000/api/ocr/extract", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image: base64Data,
        mimeType: mimeType,
      }),
    });

    if (!response.ok) throw new Error("Gagal menghubungi EasyOCR Local Server");

    const result = await response.json();
    if (!result.status)
      throw new Error(result.error || "EasyOCR processing failed");

    return result.data;
  };

  // --- HANDLER UPLOAD FILE (HYBRID OCR ROUTER) ---
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileExt = file.name.split(".").pop().toLowerCase();
    const mimeType = file.type;
    const isImage = mimeType.startsWith("image/");
    const isPdf = fileExt === "pdf" || mimeType === "application/pdf";

    let previewUrl = null;
    if (isImage) previewUrl = URL.createObjectURL(file);

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        type: "file",
        content: "Tolong baca dan ekstrak file ini:",
        fileName: file.name,
        isImage,
        isPdf,
        imageUrl: previewUrl,
      },
    ]);

    setLoading(true);

    try {
      // 1. DOCX (Mammoth)
      if (fileExt === "docx" || fileExt === "doc") {
        setProcessStatus("Mengekstrak teks dokumen Word...");
        const arrayBuffer = await file.arrayBuffer();
        const result = await window.mammoth.extractRawText({ arrayBuffer });

        await new Promise((r) => setTimeout(r, 1000));
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            type: "ocr_result",
            content: result.value || "(Dokumen kosong)",
            engine: "Native Text Extractor (Mammoth)",
            score: "100% Akurat",
            isFallback: false,
          },
        ]);
        return;
      }

      // 2. PDF
      let dataUrlToProcess = "";
      if (isPdf) {
        setProcessStatus("Menganalisa isi PDF...");
        // URL ini juga sudah dibersihkan
        if (window.pdfjsLib)
          window.pdfjsLib.GlobalWorkerOptions.workerSrc =
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

        const arrayBuffer = await file.arrayBuffer();
        const pdf = await window.pdfjsLib.getDocument({
          data: new Uint8Array(arrayBuffer),
        }).promise;

        let fullPdfText = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          fullPdfText +=
            textContent.items.map((item) => item.str).join(" ") + "\n";
        }

        if (fullPdfText.replace(/\s/g, "").length > 300) {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              type: "ocr_result",
              content: fullPdfText.trim(),
              engine: "Native PDF Extractor",
              score: "100% Akurat (Teks Asli)",
              isFallback: false,
            },
          ]);
          return;
        }

        setProcessStatus("Isi PDF berupa gambar. Merender ke Canvas...");
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 2.0 });
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        await page.render({ canvasContext: ctx, viewport }).promise;
        dataUrlToProcess = canvas.toDataURL("image/png");
      } else if (isImage) {
        dataUrlToProcess = await new Promise((res, rej) => {
          const reader = new FileReader();
          reader.onload = () => res(reader.result);
          reader.onerror = rej;
          reader.readAsDataURL(file);
        });
      } else {
        throw new Error("Format tidak didukung.");
      }

      // 3. EASYOCR UNTUK GAMBAR & PDF IMAGE
      setProcessStatus("Memproses gambar dengan EasyOCR...");
      const base64String = dataUrlToProcess.split(",")[1];
      const imgMimeType = dataUrlToProcess
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];

      try {
        const easyOCRResult = await callLocalEasyOCR(base64String, imgMimeType);

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            type: "ocr_result",
            content: easyOCRResult.text,
            engine: easyOCRResult.engine,
            score: `${easyOCRResult.confidence.toFixed(2)}%`,
            isFallback: false,
          },
        ]);
        return;
      } catch (error) {
        throw new Error(`EasyOCR processing failed: ${error.message}`);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Gagal memproses file: ${error.message}`,
          type: "text",
        },
      ]);
    } finally {
      setLoading(false);
      setProcessStatus("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="fixed right-6 bottom-6 z-40 h-11 w-auto rounded-full px-5 shadow-lg flex items-center gap-2 transition-all hover:scale-105"
      >
        <Sparkles className="size-5" />
        <span>Asisten AI</span>
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="w-full p-0 sm:max-w-md flex flex-col bg-background"
        >
          <SheetHeader className="border-b bg-background px-5 py-4 flex flex-row items-center justify-between z-10">
            <div className="flex flex-col space-y-1">
              <SheetTitle className="flex items-center gap-2 text-lg">
                <BotMessageSquare className="size-5 text-primary" />
                Spentaru AI
              </SheetTitle>
              <SheetDescription className="text-xs">
                Asisten Pengarsipan & OCR Terpadu
              </SheetDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              className="rounded-full hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="size-4" />
            </Button>
          </SheetHeader>

          <div className="flex min-h-0 flex-1 flex-col">
            <div className="flex-1 space-y-5 overflow-y-auto px-5 py-6">
              {messages.length === 0 && (
                <div className="bg-background text-muted-foreground rounded-xl border p-5 text-sm text-center shadow-sm flex flex-col items-center">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-3">
                    <Sparkles className="size-6" />
                  </div>
                  <p className="font-bold text-foreground mb-2">
                    Halo! Saya Spentaru AI.
                  </p>
                  <p className="leading-relaxed">
                    Tanyakan info seputar arsip sekolah, atau unggah dokumen
                    (📎) untuk diekstrak teksnya.
                  </p>
                </div>
              )}

              {messages.map((message, index) => {
                const isUser = message.role === "user";

                return (
                  <div
                    key={`${message.role}-${index}`}
                    className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                        isUser
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-background text-foreground border rounded-bl-sm"
                      }`}
                    >
                      {/* UI FILE */}
                      {message.type === "file" && (
                        <div className="mb-3 p-3 bg-white/20 rounded-xl flex items-center gap-3 border border-white/30 backdrop-blur-sm">
                          <div className="p-2 bg-white/20 rounded-lg">
                            {message.isPdf ? (
                              <FileText className="size-6 text-red-200" />
                            ) : message.isImage ? (
                              <ImageIcon className="size-6 text-blue-200" />
                            ) : (
                              <FileIcon className="size-6 text-blue-200" />
                            )}
                          </div>
                          <span
                            className="text-sm font-semibold truncate max-w-[150px] text-white"
                            title={message.fileName}
                          >
                            {message.fileName}
                          </span>
                        </div>
                      )}

                      {/* UI GAMBAR */}
                      {message.imageUrl && (
                        <div className="mb-2 rounded-xl overflow-hidden border border-white/20">
                          <img
                            src={message.imageUrl}
                            alt="Uploaded"
                            className="w-full h-auto object-cover max-h-48"
                          />
                        </div>
                      )}

                      {/* TEXT BOLD RENDERER */}
                      <div className="whitespace-pre-wrap break-words">
                        {formatText(message.content)}
                      </div>

                      {/* UI OCR METADATA */}
                      {message.type === "ocr_result" && message.engine && (
                        <div
                          className={`mt-4 p-3 rounded-xl border text-xs font-mono flex flex-col gap-1.5 ${
                            message.isFallback
                              ? "bg-purple-500/10 border-purple-500/20 text-purple-600"
                              : message.engine.includes("Native")
                                ? "bg-blue-500/10 border-blue-500/20 text-blue-600"
                                : "bg-green-500/10 border-green-500/20 text-green-600"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-bold flex items-center gap-1.5">
                              {message.isFallback ? (
                                <Wand2 className="size-3.5" />
                              ) : message.engine.includes("Native") ? (
                                <FileCode className="size-3.5" />
                              ) : (
                                <Zap className="size-3.5" />
                              )}
                              Engine:
                            </span>
                            <span>{message.engine}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-bold">Akurasi:</span>
                            <span>{message.score}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-background text-muted-foreground rounded-2xl rounded-bl-sm border px-4 py-3 text-sm flex items-center gap-3 shadow-sm">
                    <span className="flex gap-1.5">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></span>
                      <span
                        className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "0.15s" }}
                      ></span>
                      <span
                        className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "0.3s" }}
                      ></span>
                    </span>
                    <span className="italic">
                      {processStatus || "Sedang mengetik..."}
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* AREA INPUT CHAT */}
            <div className="bg-background border-t p-4 z-10">
              <form onSubmit={handleSend} className="flex items-center gap-2">
                <input
                  type="file"
                  accept="image/*,.pdf,.doc,.docx"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  onClick={() => fileInputRef.current.click()}
                  disabled={loading}
                  className="h-10 w-10 shrink-0 rounded-full"
                >
                  <Paperclip className="size-5" />
                </Button>

                <Input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ketik pesan atau upload file..."
                  className="h-10 py-2 rounded-full px-4 bg-muted/50 focus:bg-background transition-colors"
                  disabled={loading}
                />

                <Button
                  type="submit"
                  size="icon"
                  className="h-10 w-10 shrink-0 rounded-full"
                  disabled={isSendDisabled}
                >
                  <SendHorizontal className="size-5" />
                  <span className="sr-only">Kirim</span>
                </Button>
              </form>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
