"use client";

import { DownloadIcon } from "@/components/icons";

export default function DownloadButton({ src }: { src: string }) {
  return (
    <button
      type="button"
      onClick={() => window.open(src, "_blank", "noopener,noreferrer")}
      aria-label="Download"
      title="Download"
      className="absolute top-2.5 right-2.5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white shadow-soft backdrop-blur-md transition-all hover:scale-105 hover:bg-black/70 active:scale-95"
    >
      <DownloadIcon className="h-4 w-4" />
    </button>
  );
}
