import { Sidebar } from "@/components/sidebar";
import { getPublicBasePath } from "@/lib/env";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const basePath = getPublicBasePath();

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1480px] flex-col gap-5 px-4 py-5 lg:flex-row lg:px-6 lg:py-6">
      <Sidebar basePath={basePath} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
