import { Button } from "@/components/ui/button";
import { STORAGE_URL } from "@/config/api";
import ArchivePreviewSkeleton from "@/pages/archive/ArchivePreviewSkeleton";
import OfficePreview from "@/pages/archive/OfficePreview";
import {
  getArchiveById,
  validateArchivePreview,
} from "@/services/archive.service";
import {
  ArrowLeft,
  Download,
  FileSpreadsheet,
  FileText,
  FileType2,
  Image as ImageIcon,
} from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";

const IMAGE_EXTENSIONS = ["png", "jpg", "jpeg", "gif", "webp"];
const OFFICE_EXTENSIONS = ["doc", "docx", "xls", "xlsx"];

const getExtension = (fileName = "", filePath = "") => {
  const source = fileName || filePath;
  const cleaned = source.split("?")[0].split("#")[0];
  const ext = cleaned.includes(".") ? cleaned.split(".").pop() : "";
  return (ext || "").toLowerCase();
};

const resolveFileUrl = (url = "") => {
  if (!url) return "";
  if (/^https?:\/\//i.test(url) || url.startsWith("blob:")) return url;
  return `${STORAGE_URL}${url}`;
};

export default function ArchivePreviewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { archiveId } = useParams();

  const params = new URLSearchParams(location.search);

  const archiveTitleFromQuery = params.get("title") || "";
  const fileUrlFromQuery = params.get("file_url") || "";
  const fileNameFromQuery = params.get("file_name") || "";

  const [archiveData, setArchiveData] = useState(null);
  const [archiveLoading, setArchiveLoading] = useState(true);

  const archiveTitle =
    location.state?.archiveTitle || archiveTitleFromQuery || "Dokumen Arsip";
  const archiveFileName =
    archiveData?.files?.file_name || archiveData?.file_name || "";
  const archiveFilePath =
    archiveData?.files?.file_url || archiveData?.file_path || "";
  const filePath =
    location.state?.fileUrl || fileUrlFromQuery || archiveFilePath || "";
  const fileName =
    location.state?.fileName || fileNameFromQuery || archiveFileName || "";
  const previewUrl = `${STORAGE_URL}/api/v1/archives/${archiveId}/preview`;
  const downloadUrl = `${STORAGE_URL}/api/v1/archives/${archiveId}/download`;
  const [previewError, setPreviewError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArchiveData = async () => {
      if (!archiveId) return;
      try {
        const response = await getArchiveById(archiveId);
        setArchiveData(response.data);
      } catch (error) {
        console.error("Failed to fetch archive:", error);
      } finally {
        setArchiveLoading(false);
      }
    };

    fetchArchiveData();
  }, [archiveId]);

  const fileUrl = useMemo(() => resolveFileUrl(filePath), [filePath]);

  const fileExtension = getExtension(fileName, filePath);

  const previewType = useMemo(() => {
    if (fileExtension === "pdf") return "pdf";
    if (IMAGE_EXTENSIONS.includes(fileExtension)) return "image";
    if (OFFICE_EXTENSIONS.includes(fileExtension)) return "office";
    return "unsupported";
  }, [fileExtension]);

  const fileTypeLabel = useMemo(() => {
    if (!fileExtension) return "Tidak diketahui";
    return fileExtension.toUpperCase();
  }, [fileExtension]);

  const previewAvailable = Boolean(filePath || fileName);

  useEffect(() => {
    let isLoadinged = true;

    const validatePreview = async () => {
      setIsLoading(true);
      if (!previewAvailable) {
        if (isLoadinged) {
          setPreviewError("");
          setIsLoading(false);
        }
        return;
      }

      try {
        const result = await validateArchivePreview(archiveId);
        if (isLoadinged) {
          setPreviewError(result.ok ? "" : result.message);
        }
      } catch (error) {
        if (isLoadinged) {
          setPreviewError(`${error.message || "Gagal memuat preview arsip."}`);
        }
      } finally {
        if (isLoadinged) {
          setIsLoading(false);
        }
      }
    };

    validatePreview();
    return () => {
      isLoadinged = false;
    };
  }, [archiveId, previewAvailable]);

  if (isLoading || archiveLoading) {
    return <ArchivePreviewSkeleton />;
  }

  return (
    <section className="space-y-4 mt-5">
      <div className="rounded-sm border border-border/80 bg-card p-4 md:p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Pratinjau Arsip
            </p>
            <h1 className="text-lg font-semibold text-foreground md:text-xl">
              {archiveTitle}
            </h1>
            <p className="text-sm text-muted-foreground">
              Format file: {fileTypeLabel}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="outline"
              className="rounded-sm border-border/80"
              onClick={() => navigate("/archives")}
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </Button>

            {previewAvailable && !previewError && (
              <>
                <Button
                  asChild
                  className="rounded-sm bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <a href={downloadUrl} download={fileName || undefined}>
                    <Download className="h-4 w-4" />
                    Download File
                  </a>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-sm border border-border/80 bg-card p-3 md:p-4">
        {!previewAvailable && (
          <div className="flex min-h-[55vh] flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-border/80 bg-muted/10 px-4 text-center">
            <FileType2 className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm font-semibold text-foreground">
              File tidak tersedia.
            </p>
            <p className="text-sm text-muted-foreground">
              Metadata file tidak ditemukan untuk arsip ID {archiveId}.
            </p>
          </div>
        )}

        {previewAvailable && previewError && (
          <div className="flex min-h-[55vh] flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-border/80 bg-muted/10 px-4 text-center">
            <FileType2 className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm font-semibold text-foreground">
              Preview gagal dimuat.
            </p>
            <p className="text-sm text-muted-foreground">{previewError}</p>
          </div>
        )}

        {previewAvailable && !previewError && previewType === "pdf" && (
          <iframe
            title="Preview PDF Arsip"
            src={previewUrl}
            className="min-h-[70vh] w-full rounded-sm border border-border/80"
          />
        )}

        {previewAvailable && !previewError && previewType === "image" && (
          <div className="flex min-h-[70vh] items-center justify-center rounded-sm border border-border/80 bg-muted/10 p-2">
            <img
              src={previewUrl}
              alt={fileName || "Preview Gambar Arsip"}
              className="max-h-[68vh] w-auto max-w-full rounded-sm object-contain"
            />
          </div>
        )}

        {previewAvailable && !previewError && previewType === "office" && (
          <OfficePreview
            archiveId={archiveId}
            fileUrl={fileUrl}
            fileName={fileName}
          />
        )}

        {previewAvailable && !previewError && previewType === "unsupported" && (
          <div className="flex min-h-[55vh] flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-border/80 bg-muted/10 px-4 text-center">
            {fileTypeLabel.includes("XLS") ? (
              <FileSpreadsheet className="h-8 w-8 text-muted-foreground" />
            ) : fileTypeLabel.includes("PNG") ||
              fileTypeLabel.includes("JPG") ||
              fileTypeLabel.includes("JPEG") ? (
              <ImageIcon className="h-8 w-8 text-muted-foreground" />
            ) : (
              <FileText className="h-8 w-8 text-muted-foreground" />
            )}
            <p className="text-sm font-semibold text-foreground">
              Preview belum didukung untuk format {fileTypeLabel}.
            </p>
            <p className="text-sm text-muted-foreground">
              Silakan gunakan tombol download untuk membuka file secara lokal.
            </p>
          </div>
        )}
      </div>

      <div>
        <Link
          to="/archives"
          className="text-sm font-medium text-primary hover:underline"
        >
          Kembali ke daftar arsip
        </Link>
      </div>
    </section>
  );
}
