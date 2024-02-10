import "./globals.css";

import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import { Header } from "@/components/header";

const font = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "AI Labs",
  description: "AI Labs is a place where you can try multiple AI models as a chatbot and see how they work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
