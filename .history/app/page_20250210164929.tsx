"use client";

import { useEffect } from "react";
import { useAuth, RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Sidebar from "../component/Sidebar";
import Welcome from "../component/Welcome";
import Chat from "../component/Chat/Chat";

// Protected component that contains the app's main content
const ProtectedContent = () => {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();

  // Optional: Handle file upload
  const handleFileUpload = (files: FileList) => {
    console.log("Received files:", files);
    // Add your file handling logic here
  };

  // Optional: You can add additional auth checks here
  useEffect(() => {
    if (isLoaded && !userId) {
      router.push("/sign-in");
    }
  }, [isLoaded, userId, router]);

  if (!isLoaded || !userId) {
    return null; // Or a loading spinner
  }

  return (
    <div className="grid min-h-screen grid-rows-[1fr] font-[family-name:var(--font-geist-sans)]">
      <div className="flex h-screen bg-gray-900 text-white">
        {/* Sidebar Component */}
        <Sidebar />

        {/* Main content area */}
        <div className="flex-1 flex flex-col">
          {/* Welcome Component */}
          <Welcome />

          {/* Chat */}
          <Chat onFileUpload={handleFileUpload} />
        </div>
      </div>
    </div>
  );
};

// Main Home component with auth flow
export default function Home() {
  return (
   <div className="grid min-h-screen grid-rows-[1fr] font-[family-name:var(--font-geist-sans)]">
      <div className="flex h-screen bg-gray-900 text-white">
        {/* Sidebar Component */}
        <Sidebar />

          {/* Welcome Component */}
          <Welcome />

          {/*  Chat  */}
          {/* Chat Component */}
          <Chat onFileUpload={()=>console.log("casdcsad")} />
        </div>
      </div>
 );
}
