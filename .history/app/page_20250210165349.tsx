

'use client';

// File: /workspaces/medical_supplies/app/page.tsx
import Sidebar from "../component/Sidebar";
import Welcome from "../component/Welcome";
import Chat from "../component/Chat/Chat";

export default function Home() {
  const handleFileUpload = (files: FileList) => {
    console.log("Received files:", files);
    // Add your file upload logic here
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

          {/* Chat Component */}
          <Chat onFileUpload={handleFileUpload} />
        </div>
      </div>
    </div>
  );
}