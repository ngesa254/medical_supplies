"use client";

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
