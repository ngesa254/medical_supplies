// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//           <li className="mb-2">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
//               app/page.tsx
//             </code>
//             .
//           </li>
//           <li>Save and see your changes instantly.</li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }



// 'use client';

// import { useState } from 'react';
// import { Menu, Send, Settings, Clock, Heart, HelpCircle } from 'lucide-react';

// export default function Home() {
//   const [message, setMessage] = useState('');
//   const [userName, setUserName] = useState('Ngesa');

//   return (
//     <div className="grid min-h-screen grid-rows-[1fr] font-[family-name:var(--font-geist-sans)]">
//       <div className="flex h-screen bg-gray-900 text-white">
//         {/* Sidebar */}
//         <div className="w-16 bg-gray-800 flex flex-col items-center py-4 border-r border-gray-700">
//           <button className="p-2 hover:bg-gray-700 rounded-lg mb-8">
//             <Menu className="w-6 h-6" />
//           </button>
//           <button className="p-2 hover:bg-gray-700 rounded-lg mb-4">
//             <span className="text-2xl">+</span>
//           </button>
//           <div className="mt-auto flex flex-col gap-4">
//             <button className="p-2 hover:bg-gray-700 rounded-lg">
//               <Heart className="w-6 h-6" />
//             </button>
//             <button className="p-2 hover:bg-gray-700 rounded-lg">
//               <HelpCircle className="w-6 h-6" />
//             </button>
//             <button className="p-2 hover:bg-gray-700 rounded-lg">
//               <Clock className="w-6 h-6" />
//             </button>
//             <button className="p-2 hover:bg-gray-700 rounded-lg">
//               <Settings className="w-6 h-6" />
//             </button>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 flex flex-col">
//           {/* Header */}
//           <header className="flex items-center justify-between p-4 border-b border-gray-700">
//             <div className="flex items-center space-x-2">
//               <h1 className="text-xl font-semibold">model</h1>
//               <span className="text-sm text-gray-400">techx 1.0</span>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
//             </div>
//           </header>

//           {/* Chat Area */}
//           <div className="flex-1 overflow-y-auto p-4">
//             <div className="flex flex-col items-center justify-center h-full">
//               <h2 className="text-4xl mb-4">
//                 <span className="text-blue-400">Hello</span>
//                 <span className="text-pink-400">, {userName}</span>
//               </h2>
//             </div>
//           </div>

//           {/* Input Area */}
//           <div className="p-4">
//             <div className="relative">
//               <div className="flex items-center bg-gray-800 rounded-xl px-4 py-3">
//                 <input
//                   type="text"
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   placeholder="Ask Medial Supplies..."
//                   className="flex-1 bg-transparent focus:outline-none"
//                 />
//                 <button className="ml-2">
//                   <Send className="w-5 h-5 text-gray-400" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// 'use client';

// import { useState } from 'react';
// import { Menu, Send, Settings, Clock, Heart, HelpCircle } from 'lucide-react';

// export default function Home() {
//   const [message, setMessage] = useState('');
//   // Remove setUserName since it's not being used
//   const userName = 'Ngesa';

//   return (
//     <div className="grid min-h-screen grid-rows-[1fr] font-[family-name:var(--font-geist-sans)]">
//       <div className="flex h-screen bg-gray-900 text-white">
//         {/* Sidebar */}
//         <div className="w-16 bg-gray-800 flex flex-col items-center py-4 border-r border-gray-700">
//           <button 
//             className="p-2 hover:bg-gray-700 rounded-lg mb-8"
//             aria-label="Menu"
//           >
//             <Menu className="w-6 h-6" />
//           </button>
//           <button 
//             className="p-2 hover:bg-gray-700 rounded-lg mb-4"
//             aria-label="New chat"
//           >
//             <span className="text-2xl">+</span>
//           </button>
//           <div className="mt-auto flex flex-col gap-4">
//             <button 
//               className="p-2 hover:bg-gray-700 rounded-lg"
//               aria-label="Favorites"
//             >
//               <Heart className="w-6 h-6" />
//             </button>
//             <button 
//               className="p-2 hover:bg-gray-700 rounded-lg"
//               aria-label="Help"
//             >
//               <HelpCircle className="w-6 h-6" />
//             </button>
//             <button 
//               className="p-2 hover:bg-gray-700 rounded-lg"
//               aria-label="History"
//             >
//               <Clock className="w-6 h-6" />
//             </button>
//             <button 
//               className="p-2 hover:bg-gray-700 rounded-lg"
//               aria-label="Settings"
//             >
//               <Settings className="w-6 h-6" />
//             </button>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 flex flex-col">
//           {/* Header */}
//           <header className="flex items-center justify-between p-4 border-b border-gray-700">
//             <div className="flex items-center space-x-2">
//               <h1 className="text-xl font-semibold">model</h1>
//               <span className="text-sm text-gray-400">techx 1.0</span>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
//             </div>
//           </header>

//           {/* Chat Area */}
//           <div className="flex-1 overflow-y-auto p-4">
//             <div className="flex flex-col items-center justify-center h-full">
//               <h2 className="text-4xl mb-4">
//                 <span className="text-blue-400">Hello</span>
//                 <span className="text-pink-400">, {userName}</span>
//               </h2>
//             </div>
//           </div>

//           {/* Input Area */}
//           <div className="p-4">
//             <div className="relative">
//               <div className="flex items-center bg-gray-800 rounded-xl px-4 py-3">
//                 <input
//                   type="text"
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   placeholder="Ask Medical Supplies..."
//                   className="flex-1 bg-transparent focus:outline-none"
//                 />
//                 <button 
//                   className="ml-2"
//                   aria-label="Send message"
//                 >
//                   <Send className="w-5 h-5 text-gray-400" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// 'use client';

// // Main page where we combine Sidebar, Welcome, and Chat components
// import Sidebar from "../component/Sidebar";
// import Welcome from "../component/Welcome";
// import Chat from "../component/Chat";

// export default function Home() {
//   return (
//     <div className="grid min-h-screen grid-rows-[1fr] font-[family-name:var(--font-geist-sans)]">
//       <div className="flex h-screen bg-gray-900 text-white">
//         {/* Sidebar Component */}
//         <Sidebar />

//         {/* Main content area */}
//         <div className="flex-1 flex flex-col">
//           {/* Welcome Component */}
//           <Welcome />

//           {/* Chat Component */}
//           <Chat />
//         </div>
//       </div>
//     </div>
//   );
// }


// // File: app/page.tsx
// 'use client';

// // Main page where we combine Sidebar, Welcome, and Chat components
// import Sidebar from "../component/Sidebar";
// import Welcome from "../component/Welcome";
// import Chat from "../component/Chat";

// export default function Home() {
//   return (
//     <div className="grid min-h-screen grid-rows-[1fr] font-[family-name:var(--font-geist-sans)]">
//       <div className="flex h-screen bg-gray-900 text-white">
//         {/* Sidebar Component */}
//         <Sidebar />

//         {/* Main content area */}
//         <div className="flex-1 flex flex-col">
//           {/* Welcome Component */}
//           <Welcome />

//           {/* Chat Component */}
//           <Chat />
//         </div>
//       </div>
//     </div>
//   );
// }


// // File: /workspaces/medical_supplies/app/page.tsx
// 'use client';

// import Sidebar from "../component/Sidebar";
// import Welcome from "../component/Welcome";
// import Chat from "../component/Chat/Chat";

// export default function Home() {
//   // Optional: If you want to handle uploaded files here,
//   // define a callback function:
//   const handleFileUpload = (files: FileList) => {
//     // Example: Just log the files for now
//     console.log("Received files:", files);
//     // You can add further logic to upload or process them.
//   };

//   return (
//     <div className="grid min-h-screen grid-rows-[1fr] font-[family-name:var(--font-geist-sans)]">
//       <div className="flex h-screen bg-gray-900 text-white">

//         {/* Sidebar Component */}
//         <Sidebar />

//         {/* Main content area */}
//         <div className="flex-1 flex flex-col">
//           {/* Welcome Component */}
//           <Welcome />

//           {/*  Chat  */}
//           <Chat onFileUpload={handleFileUpload} />
//         </div>
//       </div>
//     </div>
//   );
// }




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