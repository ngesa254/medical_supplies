import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "@/component/Sidebar";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { TierProvider } from "@/context/TierContext";

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
      <TierProvider>
        <html lang="en">
          <body className={inter.className}>
            <div className="flex h-screen overflow-hidden">
              <Sidebar />
              <main className="flex-1 overflow-y-auto bg-gray-50">
                {children}
              </main>
            </div>
          </body>
        </html>
      </TierProvider>
    </ClerkProvider>
  );
}
