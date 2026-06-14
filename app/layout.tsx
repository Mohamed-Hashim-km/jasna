import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";
import { Preloader } from "@/components/Preloader";
import DotField from "@/components/DotField";
import { LightRays } from "@/components/LightRays";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
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
    <html lang="en" className={`${inter.variable} ${outfit.variable} font-sans`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <div className="noise-bg" />
        <div className="fixed inset-0 -z-10 pointer-events-none w-screen h-screen opacity-65">
          <DotField
            dotRadius={1.2}
            dotSpacing={16}
            bulgeStrength={55}
            glowRadius={160}
            sparkle={false}
            waveAmplitude={0}
            gradientFrom="rgba(14, 165, 233, 0.45)"
            gradientTo="rgba(59, 130, 246, 0.3)"
            glowColor="#090d16"
          />
        </div>
        <div className="fixed inset-0 -z-20 pointer-events-none w-screen h-screen opacity-45">
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={0.6}
            lightSpread={0.6}
            rayLength={3.0}
            followMouse={true}
            mouseInfluence={0.08}
            noiseAmount={0.01}
            distortion={0.08}
            pulsating={false}
            fadeDistance={1.0}
            saturation={1.0}
          />
        </div>
        <Preloader />
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

