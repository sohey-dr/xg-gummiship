import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GummiShip Game",
  description: "A 3D game built with Next.js and React Three Fiber",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
