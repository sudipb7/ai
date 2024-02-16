export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="min-h-full bg-offwhite dark:dark:bg-zinc-950">{children}</div>;
}
