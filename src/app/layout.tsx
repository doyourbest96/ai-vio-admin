import type { Metadata } from "next";
import localFont from "next/font/local";
import { ToastContainer } from "react-toastify";

import Header from "@/sections/Header";
import Sidebar from "@/sections/Sidebar";
import Footer from "@/sections/Footer";
import Metabar from "@/sections/Metabar";

import MainProvider from "@/contexts";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AI-VIO | Admin",
  description: "AI-VIO | Admin",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MainProvider>
          <div className="relative w-full h-full flex flex-1 flex-row overflow-hidden">
            <Sidebar />
            <div className="w-full h-full flex flex-1 flex-col overflow-auto">
              <Header />
              <div className="p-4 flex-1 overflow-auto">{children}</div>
              <Footer />
            </div>
            <Metabar />
          </div>
        </MainProvider>

        <ToastContainer
          autoClose={2000}
          closeOnClick
          draggable
          pauseOnFocusLoss={false}
        />
      </body>
    </html>
  );
}
