// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

interface RootLayoutProps {
  children: React.ReactNode;
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Medical Supplies Assistant",
  description: "Your AI assistant for medical supplies",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 min-h-screen`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

// app/page.tsx
("use client");

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <SignedOut>
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center space-y-6 p-8">
            <h1 className="text-4xl font-bold text-white mb-8">
              Medical Supplies Assistant
            </h1>
            <SignInButton mode="modal">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Sign In to Continue
              </button>
            </SignInButton>
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        <AuthenticatedApp />
      </SignedIn>
    </main>
  );
}

// Components for the authenticated view
function AuthenticatedApp() {
  const [message, setMessage] = useState("");

  return (
    <div className="grid min-h-screen grid-rows-[1fr]">
      <div className="flex h-screen text-white">
        {/* Sidebar */}
        <div className="w-16 bg-gray-800 flex flex-col items-center py-4 border-r border-gray-700">
          <button
            className="p-2 hover:bg-gray-700 rounded-lg mb-8"
            aria-label="Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <button
            className="p-2 hover:bg-gray-700 rounded-lg mb-4"
            aria-label="New chat"
          >
            <span className="text-2xl">+</span>
          </button>
          <div className="mt-auto flex flex-col gap-4">
            <button
              className="p-2 hover:bg-gray-700 rounded-lg"
              aria-label="Favorites"
            >
              <Heart className="w-6 h-6" />
            </button>
            <button
              className="p-2 hover:bg-gray-700 rounded-lg"
              aria-label="Help"
            >
              <HelpCircle className="w-6 h-6" />
            </button>
            <button
              className="p-2 hover:bg-gray-700 rounded-lg"
              aria-label="History"
            >
              <Clock className="w-6 h-6" />
            </button>
            <button
              className="p-2 hover:bg-gray-700 rounded-lg"
              aria-label="Settings"
            >
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="flex items-center justify-between p-4 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-semibold">
                Medical Supplies Assistant
              </h1>
              <span className="text-sm text-gray-400">v1.0</span>
            </div>
            <div className="flex items-center space-x-4">
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-8 h-8",
                  },
                }}
              />
            </div>
          </header>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex flex-col items-center justify-center h-full">
              <h2 className="text-4xl mb-4">
                <span className="text-blue-400">Welcome to</span>
                <span className="text-pink-400">
                  {" "}
                  Medical Supplies Assistant
                </span>
              </h2>
              <p className="text-gray-400">
                Start a conversation to get assistance with medical supplies
              </p>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4">
            <div className="relative">
              <div className="flex items-center bg-gray-800 rounded-xl px-4 py-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask Medical Supplies..."
                  className="flex-1 bg-transparent focus:outline-none"
                />
                <button className="ml-2" aria-label="Send message">
                  <Send className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
