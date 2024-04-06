import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";
import Navbar from "@/components/app/Navbar/Navbar";
import Protected from "@/components/app/Protected/Protected";
import { validateRequest } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const publicRoutes = ['/auth/signIn', '/auth/signUp'];
    const { user } = await validateRequest();
    if (!user && !publicRoutes.includes(headers().get('x-url')!)) return redirect('/auth/signIn');
  else return (
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
