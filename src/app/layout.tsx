import type { Metadata } from "next";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import "./globals.css"
import "../styles/text-editor.css";
import { Suspense } from "react";
import { Providers } from "./Providers";

export const metadata: Metadata = {
  title: "Lata App",
  description: "Lata App.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
      </head>
      <body>
        <Providers>
          <Suspense>{children}</Suspense>
        </Providers>
      </body>
    </html>
  );
}
