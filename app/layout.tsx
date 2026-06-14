import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jesna Beegum S — Python & Full Stack Developer",
  description:
    "Portfolio of Jesna Beegum S — aspiring Python and full stack developer building modern web and mobile apps.",
  authors: [{ name: "Jesna Beegum S" }],
  openGraph: {
    title: "Jesna Beegum S — Python & Full Stack Developer",
    description: "Portfolio showcasing projects, skills, and experience.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Jesna Beegum S — Python & Full Stack Developer",
    description: "Aspiring Python & Full Stack Developer.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
