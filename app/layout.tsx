// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "@/component/Sidebar";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AMS AI System",
  description: "Medical Supply Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
