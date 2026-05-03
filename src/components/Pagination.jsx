import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  totalData = 0,
  dataPerPage = 10,
}) {
  // Hitung range data (biar dinamis)
  const start = (currentPage - 1) * dataPerPage + 1;
  const end = Math.min(currentPage * dataPerPage, totalData);

  const pages = Array.from({ length: totalPages }, (_, i) =>
    (i + 1).toString(),
  );

  return (
    <div className="mt-4 flex flex-col gap-3 border-t border-border/70 pt-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Info */}
      <div className="text-sm text-muted-foreground">
        Menampilkan{" "}
        <span className="font-semibold text-foreground">
          {start}-{end}
        </span>{" "}
        dari <span className="font-semibold text-foreground">{totalData}</span>{" "}
        data.
      </div>

      {/* Pagination Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Prev */}
        <Button
          variant="outline"
          className="h-9 w-fit border-border/80 px-3 py-2 text-sm shadow-none"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft size={16} />
          <span className="hidden md:block">Sebelumnya</span>
          {/* <span className="block md:hidden">Prev</span> */}
        </Button>

        {/* Number */}
        {pages.map((page) => {
          const isActive = Number(page) === currentPage;

          return (
            <Button
              key={page}
              variant={isActive ? "default" : "outline"}
              className={`h-9 w-7 px-0 py-0 text-sm shadow-none ${
                !isActive ? "border-border/80" : ""
              }`}
              onClick={() => onPageChange(Number(page))}
            >
              {page}
            </Button>
          );
        })}

        {/* Next */}
        <Button
          variant="outline"
          className="h-9 w-fit border-border/80 px-3 py-2 text-sm shadow-none"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <span className="hidden md:block">Selanjutnya</span>
          {/* <span className="block md:hidden">Next</span> */}
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
}
