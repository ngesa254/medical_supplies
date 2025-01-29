"use client";

import Sidebar from "../component/Sidebar";
import Welcome from "../component/Welcome";
import Chat from "../component/Chat/Chat";

export default function Home() {
  // Optional: If you want to handle uploaded files here,
  // define a callback function:
  const handleFileUpload = (files: FileList) => {
    // Example: Just log the files for now
    console.log("Received files:", files);
    // You can add further logic to upload or process them.
  };

  return (
    <div className="grid min-h-screen grid-rows-[1fr] font-[family-name:var(--font-geist-sans)]">
      <div className="flex h-screen bg-gray-900 text-white">
        {/* Sidebar Component */}
        <Sidebar />

        {/* Main content area */}
        <div className="flex-1 flex flex-col">
          {/* Welcome Component */}
          <Welcome />

          {/*  Chat  */}
          <Chat onFileUpload={handleFileUpload} />
        </div>
      </div>
    </div>
  );
}
