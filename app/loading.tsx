import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex min-h-dvh flex-1 items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-6">
        <Image
          src="/loading.png"
          alt="Memuat Sains Edukasi Kimia"
          width={180}
          height={180}
          priority
          className="select-none"
        />
        <div
          className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-200"
          style={{ borderTopColor: "var(--brand)" }}
          aria-label="Loading"
          role="status"
        />
      </div>
    </div>
  );
}

