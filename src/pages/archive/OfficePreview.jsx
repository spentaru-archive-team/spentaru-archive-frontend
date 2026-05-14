import { useEffect, useRef, useState, useMemo } from "react";
import * as XLSX from "xlsx";
import * as docx from "docx-preview";
import JSZip from "jszip";
import api from "@/services/axios";

const getExtensionFromName = (name = "") => {
  if (!name) return "";
  const cleaned = name.split("?")[0].split("#")[0];
  const parts = cleaned.split(".");
  return parts.length > 1 ? parts.pop().toLowerCase() : "";
};

const extractFilename = (contentDisposition = "") => {
  if (!contentDisposition) return "";
  const match = contentDisposition.match(
    /filename\*?=(?:UTF-8''|"|')?([^"';\n]+)/i,
  );
  if (!match || !match[1]) return "";
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
};

export default function OfficePreview({ archiveId, fileName }) {
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const ext = useMemo(() => {
    return getExtensionFromName(fileName || "");
  }, [fileName]);

  const renderExcel = (blob, container) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });

          container.innerHTML = "";

          workbook.SheetNames.forEach((sheetName) => {
            const sheet = workbook.Sheets[sheetName];
            const html = XLSX.utils.sheet_to_html(sheet);

            const wrapper = document.createElement("div");
            wrapper.className = "mb-6";
            wrapper.innerHTML = html;

            container.appendChild(wrapper);
          });

          resolve();
        } catch (err) {
          reject(err);
        }
      };

      reader.onerror = () => reject(new Error("Gagal membaca file Excel"));
      reader.readAsArrayBuffer(blob);
    });
  };

  const renderWithTimeout = (promise, timeout = 10000) => {
    return Promise.race([
      promise,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Render timeout")), timeout),
      ),
    ]);
  };

  useEffect(() => {
    let isMounted = true;

    const waitForRef = async () => {
      let tries = 0;
      while (!containerRef.current && tries < 10) {
        await new Promise((r) => setTimeout(r, 50));
        tries++;
      }
      if (!containerRef.current) {
        throw new Error("Container tidak tersedia");
      }
    };

    const loadFile = async () => {
      if (!archiveId) return;

      setIsLoading(true);
      setError(null);

      try {
        await waitForRef();

        // ✅ SELALU LEWAT BACKEND (NO DIRECT FETCH)
        const response = await api.get(`/archives/${archiveId}/preview`, {
          responseType: "blob",
        });

        if (!isMounted) return;

        const blob = response.data;
        const headers = response.headers || {};

        if (!blob || blob.size === 0) {
          throw new Error("File kosong / gagal dimuat");
        }

        const contentDisposition =
          headers["content-disposition"] ||
          headers["Content-Disposition"] ||
          "";

        const contentType =
          headers["content-type"] || headers["Content-Type"] || "";

        const filenameFromHeader = extractFilename(contentDisposition);
        const headerExt = getExtensionFromName(filenameFromHeader);

        const typeExt = contentType.includes("wordprocessingml")
          ? "docx"
          : contentType.includes("spreadsheetml")
            ? "xlsx"
            : "";

        const effectiveExt = ext || headerExt || typeExt;

        containerRef.current.innerHTML = "";

        if (["xlsx", "xls"].includes(effectiveExt)) {
          await renderWithTimeout(renderExcel(blob, containerRef.current));
        } else if (effectiveExt === "docx") {
          await renderWithTimeout(
            docx.renderAsync(blob, containerRef.current, null, {
              jszip: JSZip,
              className: "docx-preview",
            }),
          );
        } else if (effectiveExt === "doc") {
          throw new Error("Format DOC tidak didukung");
        } else {
          throw new Error("Format tidak didukung");
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Gagal memuat preview");
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadFile();

    return () => {
      isMounted = false;
    };
  }, [archiveId, ext]);

  return (
    <div className="relative rounded-sm border border-border/80 bg-muted/10">
      {/* LOADING */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-card/70 z-10">
          <div className="flex flex-col items-center gap-2">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="text-sm text-muted-foreground">Memuat preview...</p>
          </div>
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
          <p className="text-sm font-semibold text-foreground">{error}</p>
        </div>
      )}

      {/* CONTAINER */}
      <div
        ref={containerRef}
        style={{ minHeight: "70vh" }}
        className="p-4 overflow-auto"
      />
    </div>
  );
}
