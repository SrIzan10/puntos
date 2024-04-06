import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/app/Navbar/Navbar";
import Protected from "@/components/app/Protected/Protected";

const satoshi = localFont({ src: './fonts/Satoshi-Medium.woff2' })

export const metadata: Metadata = {
  title: "Puntos app",
  description: "haha yes points go brrr",
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://puntos.srizan.dev',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="es">
        <body className={`${satoshi.className}`}>
          <Navbar />
          <Protected>
            <div className="p-2">
              {children}
            </div>
          </Protected>
        </body>
      </html>
  );
}
