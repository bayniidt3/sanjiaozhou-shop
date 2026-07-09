export function SummaryCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string | number;
  accent: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/70 bg-white/88 p-5 shadow-[0_20px_40px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="text-[13px] uppercase tracking-[0.24em] text-[#7c8ba1]">{label}</div>
      <div className="mt-4 flex items-end gap-3">
        <div className="text-[34px] font-semibold text-[#10243c]">{value}</div>
        <div className="mb-1 h-2 w-16 rounded-full" style={{ backgroundColor: accent }} />
      </div>
    </div>
  );
}
