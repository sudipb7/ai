import { MainHeader } from "@/components/main-header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-zinc-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="fixed z-10 inset-0 overflow-y-scroll overflow-x-hidden">
        <div className="h-full relative">
          <MainHeader />
          {children}
        </div>
      </div>
    </div>
  );
}
