export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-[calc(100dvh-4rem)] flex items-center justify-center">{children}</main>
  );
}
