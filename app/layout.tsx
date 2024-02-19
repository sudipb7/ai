import "./globals.css";

import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import { ModalProvider } from "@/components/providers/modal-provider";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/header";
import { metadataConfig } from "@/lib/config/metadata";

const font = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = metadataConfig;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <div className="h-full">
          <div className="background"></div>
          <div className="fixed z-10 inset-0 overflow-y-scroll overflow-x-hidden">
            <div className="h-full relative">
              <Header />
              {children}
              <ModalProvider />
              <Toaster />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
