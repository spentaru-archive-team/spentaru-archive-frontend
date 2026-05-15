import React, {
  useMemo,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
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
  Settings,
  GripVertical,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  FileQuestion,
  Search,
  BookOpen,
  ExternalLink,
  Download,
  // GripLinesVertical,
} from "lucide-react";
import { askAi, extractOcrBase64 } from "@/services/ai.service";
import { STORAGE_URL } from "@/config/api";
import Markdown from "react-markdown";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "react-router";

const EXAMPLE_PROMPTS = [
  {
    icon: FileQuestion,
    label: "Cari arsip raport",
    text: "Bagaimana cara mencari arsip raport siswa?",
  },
  {
    icon: Search,
    label: "Cari arsip kegiatan",
    text: "Carikan saya arsip kegiatan tahun 2024",
  },
  {
    icon: BookOpen,
    label: "Panduan penggunaan",
    text: "Bagaimana cara upload arsip baru?",
  },
];

const WIDTH_PRESETS = [
  { label: "Lebar", value: 500, icon: ChevronLeft },
  { label: "Sedang", value: 400, icon: MessageCircle },
  { label: "Sempit", value: 320, icon: ChevronRight },
];

export default function AiChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [processStatus, setProcessStatus] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [widgetWidth, setWidgetWidth] = useState(400);
  const [isDragging, setIsDragging] = useState(false);
  const [messages, setMessages] = useState([]);

  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const sheetContentRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  }, [open]);

  useEffect(() => {
    const savedWidth = localStorage.getItem("ai-widget-width");
    if (savedWidth) setWidgetWidth(parseInt(savedWidth));
  }, []);

  useEffect(() => {
    const loadScript = (src) => {
      if (!document.querySelector(`script[src="${src}"]`)) {
        const script = document.createElement("script");
        script.src = src;
        script.crossOrigin = "anonymous";
        document.body.appendChild(script);
      }
    };
    loadScript(
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",
    );
    loadScript("https://unpkg.com/mammoth@1.6.0/mammoth.browser.min.js");
  }, []);

  const handleWidthChange = (newWidth) => {
    setWidgetWidth(newWidth);
    localStorage.setItem("ai-widget-width", newWidth.toString());
  };

  const isSendDisabled = useMemo(() => {
    return loading || (!input.trim() && !processStatus);
  }, [input, loading, processStatus]);

  const formatText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-bold text-primary">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  const handleSend = async (event) => {
    if (event) event.preventDefault();

    const prompt = input.trim();
    if (!prompt || loading) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: prompt, type: "text" },
    ]);
    setInput("");
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }
    setLoading(true);

    try {
      const aiResult = await askAi(prompt);
      const answer = aiResult?.answer?.trim();
      const fileCards = aiResult?.file_cards;

      if (!answer) {
        throw new Error("Respons AI tidak valid.");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: answer,
          type: "text",
          file_cards:
            Array.isArray(fileCards) && fileCards.length > 0
              ? fileCards
              : undefined,
        },
      ]);
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      console.error("Error saat memanggil AI service:", err);
      const message =
        error?.response?.data?.error?.message ||
        error?.response?.data?.message ||
        error?.message ||
        (error?.code === "ERR_NETWORK"
          ? "Tidak bisa terhubung ke AI service. Pastikan ai-service berjalan di http://localhost:5000."
          : "Maaf, terjadi kesalahan saat mengambil jawaban AI.");

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: message,
          type: "text",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleExampleClick = (text) => {
    setInput(text);
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height =
        Math.min(inputRef.current.scrollHeight, 120) + "px";
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  };

  const handleTextareaKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  const callLocalEasyOCR = async (base64Data) => {
    const result = await extractOcrBase64(base64Data);
    if (!result || typeof result.text !== "string") {
      throw new Error("EasyOCR processing failed");
    }
    return result;
  };

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

      let dataUrlToProcess = "";
      if (isPdf) {
        setProcessStatus("Menganalisa isi PDF...");
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

      setProcessStatus("Memproses gambar dengan EasyOCR...");
      const base64String = dataUrlToProcess.split(",")[1];
      try {
        const easyOCRResult = await callLocalEasyOCR(base64String);

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

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const newWidth = Math.max(
        280,
        Math.min(600, window.innerWidth - e.clientX),
      );
      setWidgetWidth(newWidth);
      localStorage.setItem("ai-widget-width", newWidth.toString());
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "ew-resize";
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDragging]);

  return (
    <TooltipProvider delayDuration={300}>
      <Button
        onClick={() => setOpen(true)}
        className="fixed right-6 bottom-6 z-40 h-15 md:h-12 w-auto rounded-full px-5 shadow-lg flex items-center gap-2.5 transition-all hover:scale-105 bg-linear-to-r from-primary to-primary/90 text-primary-foreground"
      >
        <div className="relative">
          <BotMessageSquare className="size-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-success rounded-full animate-pulse" />
        </div>
        <span className="font-medium hidden md:block">Asisten AI</span>
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          ref={sheetContentRef}
          side="right"
          showCloseButton={false}
          showOverlay={false}
          className="z-80 h-dvh p-0 flex flex-col bg-background border-l shadow-2xl right-0 left-auto fixed"
          style={{ width: `${widgetWidth}px`, maxWidth: "100vw" }}
        >
          <div
            className={`absolute left-0 top-0 bottom-0 w-1 cursor-ew-resize hover:bg-primary/50 bg-transparent transition-colors z-20 ${
              isDragging ? "bg-primary/70" : ""
            }`}
            onMouseDown={handleMouseDown}
          >
            <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity bg-destructive">
              <GripVertical className="size-4 text-primary/70" />
            </div>
          </div>

          <SheetHeader className="border-b bg-linear-to-r from-primary/5 to-transparent px-4 py-3 flex flex-row items-center justify-between z-10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                <BotMessageSquare className="size-5 text-primary" />
              </div>
              <div>
                <SheetTitle className="text-base font-bold flex items-center gap-2">
                  Spentaru AI
                  <span className="text-[10px] px-1.5 py-0.5 bg-success text-success-foreground rounded-full font-normal">
                    Online
                  </span>
                </SheetTitle>
                <p className="text-xs text-muted-foreground">
                  Asisten arsip sekolah
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowSettings(!showSettings)}
                    className={`h-8 w-8 rounded-lg transition-colors ${
                      showSettings
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted"
                    }`}
                  >
                    <Settings className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Pengaturan lebar</p>
                </TooltipContent>
              </Tooltip>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
                className="h-8 w-8 rounded-lg hover:bg-destructive/10 hover:text-destructive"
              >
                <X className="size-4" />
              </Button>
            </div>
          </SheetHeader>

          {showSettings && (
            <div className="bg-muted/30 border-b px-4 py-3 shrink-0">
              <p className="text-xs font-medium text-muted-foreground mb-2">
                Ukuran Tampilan
              </p>
              <div className="flex gap-2">
                {WIDTH_PRESETS.map((preset) => (
                  <Button
                    key={preset.value}
                    variant={
                      widgetWidth === preset.value ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => handleWidthChange(preset.value)}
                    className="flex-1 h-8 text-xs gap-1"
                  >
                    <preset.icon className="size-3.5" />
                    {preset.label}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="flex min-h-0 flex-1 flex-col">
            <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5">
              {messages.length === 0 && (
                <div className="space-y-6">
                  <div className="bg-card rounded-2xl p-5 border border-primary/10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-primary/15 rounded-xl flex items-center justify-center">
                        <Sparkles className="size-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground">
                          Halo! Saya Spentaru AI 👋
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Siap membantu Anda
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Tanyakan tentang arsip sekolah, cari dokumen, atau minta
                      bantuan teknis. Saya siap membantu!
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground px-1">
                      Contoh pertanyaan:
                    </p>
                    <div className="grid gap-2">
                      {EXAMPLE_PROMPTS.map((prompt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleExampleClick(prompt.text)}
                          className="flex items-center gap-3 p-3 rounded-xl border bg-background hover:bg-muted/50 hover:border-primary/30 transition-all text-left group cursor-pointer"
                        >
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <prompt.icon className="size-4 text-primary" />
                          </div>
                          <span className="text-sm text-foreground">
                            {prompt.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-muted/30 rounded-xl p-4 border">
                    <p className="text-xs text-muted-foreground text-center">
                      💡 Anda juga bisa upload file (PDF, Gambar, Word) untuk
                      saya baca & ekstrak teksnya
                    </p>
                  </div>
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
                      className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                        isUser
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : "bg-muted/50 text-foreground border rounded-bl-md"
                      }`}
                    >
                      {message.type === "file" && (
                        <div className="mb-3 p-3 bg-primary/10 rounded-xl flex items-center gap-3 border border-primary/20">
                          <div className="p-2 bg-primary/20 rounded-lg">
                            {message.isPdf ? (
                              <FileText className="size-5 text-primary" />
                            ) : message.isImage ? (
                              <ImageIcon className="size-5 text-primary" />
                            ) : (
                              <FileIcon className="size-5 text-primary" />
                            )}
                          </div>
                          <span
                            className="text-sm font-medium truncate max-w-45"
                            title={message.fileName}
                          >
                            {message.fileName}
                          </span>
                        </div>
                      )}

                      {message.imageUrl && (
                        <div className="mb-2 rounded-xl overflow-hidden border border-primary/20">
                          <img
                            src={message.imageUrl}
                            alt="Uploaded"
                            className="w-full h-auto object-cover max-h-48"
                          />
                        </div>
                      )}

                      <div className="whitespace-pre-wrap wrap-break-word">
                        <Markdown>{message.content}</Markdown>
                      </div>

                      {message.file_cards && message.file_cards.length > 0 && (
                        <div className="mt-3 space-y-2 border-t pt-3 border-border/50">
                          {message.file_cards.map((card, idx) => (
                            <div
                              key={card.archive_id || idx}
                              className="bg-background rounded-xl border p-3 space-y-1.5 shadow-xs"
                            >
                              <p className="font-semibold text-sm leading-tight text-foreground">
                                {card.title || "(Tanpa judul)"}
                              </p>
                              <div className="text-xs text-muted-foreground space-y-0.5">
                                {card.file_name && (
                                  <p className="flex items-center gap-1">
                                    <FileText className="size-3 shrink-0" />

                                    <span className="truncate">
                                      {card.file_name}
                                    </span>
                                  </p>
                                )}
                                {card.year && <p>{card.year}</p>}
                                {card.category && (
                                  <p>
                                    {card.category}
                                    {card.subcategory
                                      ? ` — ${card.subcategory}`
                                      : ""}
                                  </p>
                                )}
                                {card.location && (
                                  <p>
                                    {[
                                      card.location.cabinet_name,
                                      card.location.rack_number != null &&
                                        `Rak ${card.location.rack_number}`,
                                      card.location.slot_number != null &&
                                        `Slot ${card.location.slot_number}`,
                                      card.location.label_code,
                                    ]
                                      .filter(Boolean)
                                      .join(" · ")}
                                  </p>
                                )}
                              </div>
                              {card.file_url && (
                                <>
                                  <Link
                                    to={`/archives/${card.archive_id}/preview?file_name=${encodeURIComponent(card?.files?.file_name || "")}&title=${encodeURIComponent(card?.title || "")}`}
                                    state={{
                                      archiveId: card.archive_id,
                                      archiveTitle: card?.title || "",
                                      fileUrl: card?.file_url || "",
                                      fileName: card?.file_name || "",
                                      fileSourceUrl: `${STORAGE_URL}${card?.file_url || ""}`,
                                    }}
                                    className="inline-flex items-center gap-1 mt-1.5 text-xs font-medium text-primary hover:text-primary/80 hover:underline transition-colors mr-2"
                                  >
                                    <FileText size={16} />
                                    Lihat File
                                  </Link>
                                  <a
                                    href={`${STORAGE_URL}/api/v1/archives/${card.archive_id}/download`}
                                    download={card.file_url || undefined}
                                    className="inline-flex items-center gap-1 mt-1.5 text-xs font-medium text-primary hover:text-primary/80 hover:underline transition-colors"
                                  >
                                    <Download className="size-3.5" />
                                    Unduh File
                                  </a>
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {message.type === "ocr_result" && message.engine && (
                        <div
                          className={`mt-4 p-3 rounded-xl border text-xs font-mono flex flex-col gap-1.5 ${
                            message.isFallback
                              ? "bg-accent border-accent/30 text-accent-foreground"
                              : message.engine.includes("Native")
                                ? "bg-info border-info/30 text-info-foreground"
                                : "bg-success border-success/30 text-success-foreground"
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
                  <div className="bg-muted/50 text-muted-foreground rounded-2xl rounded-bl-md border px-4 py-3 text-sm flex items-center gap-3 shadow-sm">
                    <span className="flex gap-1.5">
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce"></span>
                      <span
                        className="w-2 h-2 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "0.15s" }}
                      ></span>
                      <span
                        className="w-2 h-2 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "0.3s" }}
                      ></span>
                    </span>
                    <span className="text-xs">
                      {processStatus || "Sedang mengetik..."}
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="bg-background border-t p-3 z-10">
              <form
                onSubmit={handleSend}
                className="flex items-center gap-2 bg-muted/30 rounded-2xl p-1.5 focus-within:ring-2 focus-within:ring-primary/50"
              >
                <input
                  type="file"
                  accept="image/*,.pdf,.doc,.docx"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => fileInputRef.current.click()}
                      disabled={loading}
                      className="h-9 w-9 shrink-0 rounded-xl hover:bg-primary/10"
                    >
                      <Paperclip className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Upload file</p>
                  </TooltipContent>
                </Tooltip>

                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleTextareaKeyDown}
                  placeholder="Ketik pesan Anda..."
                  rows={1}
                  disabled={loading}
                  className="flex-1 min-h-[36px] max-h-[120px] text-sm border-0 bg-transparent px-3 py-2 resize-none outline-none"
                />

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="submit"
                      size="icon"
                      className="h-9 w-9 shrink-0 rounded-xl bg-primary hover:bg-primary/90"
                      disabled={isSendDisabled}
                    >
                      <SendHorizontal className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Kirim</p>
                  </TooltipContent>
                </Tooltip>
              </form>
              <p className="text-[10px] text-center text-muted-foreground mt-2">
                Spentaru AI · Tekan Enter untuk mengirim
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </TooltipProvider>
  );
}
