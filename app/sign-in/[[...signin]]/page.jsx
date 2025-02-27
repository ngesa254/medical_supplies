"use client";

import { SignIn } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignInPage() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect_url") || "/";

  // Redirect to dashboard if already signed in
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push(redirectUrl);
    }
  }, [isLoaded, isSignedIn, router, redirectUrl]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-4xl w-full px-4">
        <div className="flex flex-col md:flex-row bg-gray-800 rounded-2xl overflow-hidden shadow-xl">
          {/* Left side - Branding/Welcome */}
          <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-gradient-to-br from-blue-600 to-purple-600">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-white mb-4">
                Welcome Back!
              </h2>
              <p className="text-gray-200 mb-6">
                Sign in to access your dashboard and continue your journey with
                us.
              </p>
              {/* Logo placeholder */}
              <div className="hidden md:block opacity-80">
                <div className="h-32 w-32 rounded-full bg-white/30 flex items-center justify-center mx-auto md:mx-0">
                  <span className="text-white text-3xl font-bold">AMS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Sign In Component */}
          <div className="w-full md:w-1/2 p-8 bg-gray-700">
            <SignIn
              appearance={{
                elements: {
                  formButtonPrimary:
                    "bg-blue-600 hover:bg-blue-700 text-sm normal-case",
                  card: "bg-transparent shadow-none",
                  headerTitle: "text-white",
                  headerSubtitle: "text-gray-400",
                  socialButtonsBlockButton:
                    "bg-gray-700 hover:bg-gray-600 border-gray-600",
                  socialButtonsBlockButtonText: "text-white",
                  dividerLine: "bg-gray-600",
                  dividerText: "text-gray-400",
                  formFieldLabel: "text-gray-300",
                  formFieldInput: "bg-gray-700 border-gray-600 text-white",
                  footerActionLink: "text-blue-400 hover:text-blue-500",
                  footerActionText: "text-gray-400",
                },
              }}
              redirectUrl={redirectUrl}
              signUpUrl="/sign-up"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
