import { cn } from "@/lib/utils";

export function StatusPill({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "success" | "warning" | "neutral";
}) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-[12px] font-semibold",
        tone === "success" && "bg-[#e6f8ee] text-[#1c8d53]",
        tone === "warning" && "bg-[#fff4df] text-[#ba7b03]",
        tone === "neutral" && "bg-[#eff4fb] text-[#54657d]",
      )}
    >
      {children}
    </span>
  );
}
