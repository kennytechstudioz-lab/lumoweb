import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'Lumo Group Bank | Premier Digital & Commercial Banking',
    template: '%s | Lumo Group Bank',
  },
  description: 'Lumo Group Bank provides secure multi-currency accounts, international wire transfers, checking vaults, and wealth management services globally.',
  keywords: ['Lumo Group Bank', 'Online Banking', 'Multi-currency Account', 'International Transfers', 'Commercial Banking', 'Digital Vault'],
  authors: [{ name: 'Lumo Group Bank' }],
  openGraph: {
    title: 'Lumo Group Bank | Premier Digital & Commercial Banking',
    description: 'Lumo Group Bank provides secure multi-currency accounts, international wire transfers, checking vaults, and wealth management services globally.',
    siteName: 'Lumo Group Bank',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lumo Group Bank | Premier Digital & Commercial Banking',
    description: 'Lumo Group Bank provides secure multi-currency accounts, international wire transfers, checking vaults, and wealth management services globally.',
  },
};


import { Providers } from "@/components/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background-custom text-foreground-custom">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
