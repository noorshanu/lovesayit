import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CursorGlow from "@/components/CursorGlow";
import AudioPlayer from "@/components/AudioPlayer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "For Divya ❤️",
  description: "A little something I made for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative selection:bg-pink-300 selection:text-pink-900">
        <CursorGlow />
        <AudioPlayer />
        {children}
      </body>
    </html>
  );
}
