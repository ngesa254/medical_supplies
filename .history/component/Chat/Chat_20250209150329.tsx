// // File: /workspaces/medical_supplies/component/Chat_2.tsx
// 'use client';

// import React, { useState, useRef } from 'react';
// import { Send, Upload, Camera, Link } from 'lucide-react';

// /**
//  * Chat_2 component demonstrating:
//  * 1. A text input for messages
//  * 2. A toggle menu for file uploads / link insertion
//  * 3. A send button icon
//  *
//  * Props:
//  * - onFileUpload (optional): function to handle uploaded files
//  *   (if omitted, uploaded files won't be processed)
//  */
// interface Chat2Props {
//   onFileUpload?: (files: FileList) => void;
// }

// export default function Chat_2({ onFileUpload }: Chat2Props) {
//   // Local state for the message
//   const [message, setMessage] = useState('');

//   // For toggling the upload menu
//   const [isUploadOpen, setIsUploadOpen] = useState(false);

//   // Ref to the hidden file input
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // Send message handler (placeholder for real logic)
//   const handleSend = () => {
//     if (!message.trim()) return;
//     // Implement your sending logic here
//     console.log('Sending message:', message);
//     setMessage('');
//   };

//   // Handle file selection
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       // If the parent component provided a callback:
//       onFileUpload?.(e.target.files);
//       // You can console.log(e.target.files) or process them here
//     }
//     // Close the upload menu
//     setIsUploadOpen(false);
//   };

//   return (
//     <div className="p-4 border-t border-gray-700">
//       <div className="relative">
//         {/* Input Container */}
//         <div className="flex items-center bg-gray-800 rounded-xl px-4 py-3">

//           {/* Upload Button + Hidden File Input */}
//           <div className="relative">
//             <button
//               type="button"
//               onClick={() => setIsUploadOpen(!isUploadOpen)}
//               className="p-2 text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-600 rounded-lg"
//             >
//               <Upload className="w-5 h-5" />
//             </button>

//             {isUploadOpen && (
//               <div className="absolute bottom-full left-0 mb-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
//                 <div className="p-2 space-y-2">
//                   {/* Hidden input to accept files */}
//                   <input
//                     ref={fileInputRef}
//                     type="file"
//                     onChange={handleFileChange}
//                     className="hidden"
//                     multiple
//                     accept="image/*,.pdf,.doc,.docx,.txt"
//                   />

//                   {/* Upload from device */}
//                   <button
//                     type="button"
//                     onClick={() => fileInputRef.current?.click()}
//                     className="flex items-center w-full p-2 text-left text-sm text-gray-300 hover:bg-gray-700 rounded"
//                   >
//                     <Camera className="w-4 h-4 mr-2" />
//                     Upload from device
//                   </button>

//                   {/* Insert link */}
//                   <button
//                     type="button"
//                     className="flex items-center w-full p-2 text-left text-sm text-gray-300 hover:bg-gray-700 rounded"
//                   >
//                     <Link className="w-4 h-4 mr-2" />
//                     Insert link
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Text Input */}
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Ask Medical Supplies..."
//             className="flex-1 mx-2 bg-transparent focus:outline-none placeholder-gray-400"
//           />

//           {/* Send Button */}
//           <button
//             className="ml-2"
//             aria-label="Send message"
//             onClick={handleSend}
//           >
//             <Send className="w-5 h-5 text-gray-400" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // File: /workspaces/medical_supplies/component/Chat_2.tsx
// 'use client';

// import React, { useState, useRef } from 'react';
// import { Send, Upload, Camera } from 'lucide-react';

// interface Chat2Props {
//   onFileUpload?: (files: FileList) => void;
// }

// export default function Chat_2({ onFileUpload }: Chat2Props) {
//   const [message, setMessage] = useState('');
//   const [isUploadOpen, setIsUploadOpen] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // Send the message (placeholder logic)
//   const handleSend = () => {
//     if (!message.trim()) return;
//     console.log('Sending message:', message);
//     setMessage('');
//   };

//   // Handle file selection
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       onFileUpload?.(e.target.files);
//     }
//     setIsUploadOpen(false);
//   };

//   return (
//     <div className="p-4 border-t border-gray-700">
//       <div className="relative">
//         <div className="flex items-center bg-gray-800 rounded-xl px-4 py-3">
//           {/* Text Input on the left */}
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Ask Medical Supplies..."
//             className="flex-1 bg-transparent focus:outline-none placeholder-gray-400"
//           />

//           {/* Upload Button near Send Button */}
//           <div className="relative ml-2">
//             <button
//               type="button"
//               onClick={() => setIsUploadOpen(!isUploadOpen)}
//               className="p-2 text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-600 rounded-lg"
//             >
//               <Upload className="w-5 h-5" />
//             </button>

//             {isUploadOpen && (
//               <div className="absolute bottom-full right-0 mb-2 w-40 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
//                 <div className="p-2 space-y-2">
//                   <input
//                     ref={fileInputRef}
//                     type="file"
//                     onChange={handleFileChange}
//                     className="hidden"
//                     multiple
//                     accept="image/*,.pdf,.doc,.docx,.txt"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => fileInputRef.current?.click()}
//                     className="flex items-center w-full p-2 text-left text-sm text-gray-300 hover:bg-gray-700 rounded"
//                   >
//                     <Camera className="w-4 h-4 mr-2" />
//                     {/* No label text here */}
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Send Button on the far right */}
//           <button
//             className="ml-2"
//             aria-label="Send message"
//             onClick={handleSend}
//           >
//             <Send className="w-5 h-5 text-gray-400" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// File: /workspaces/medical_supplies/component/Chat_2.tsx
"use client";

import React, { useState, useRef } from "react";
import { Send, Upload, Camera } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  text: string;
}

interface Chat2Props {
  onFileUpload?: (files: FileList) => void;
}

export default function Chat_2({ onFileUpload }: Chat2Props) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]); // Store conversation history
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Send the user message and generate a simulated AI response
  const handleSend = () => {
    const trimmed = message.trim();
    if (!trimmed) return;

    // Add user message to the conversation
    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setMessage("");

    // Simulate a brief delay before the AI responds
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: generateAIResponse(trimmed),
        },
      ]);
    }, 600); // adjust delay as desired
  };

  // Very simple local function to generate a placeholder response
  // You can replace this with real logic (like a fetch to your backend).
  const generateAIResponse = (userText: string) => {
    // You can tailor the logic based on userText
    if (userText.toLowerCase() === "hi") {
      return `Hello! How can I help you today?`;
    }
    // Otherwise, a generic echo
    return `Simulated AI says: I heard you say "${userText}".`;
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileUpload?.(e.target.files);
    }
    setIsUploadOpen(false);
  };

  return (
    <div className="p-4 border-t border-gray-700 h-full flex flex-col">
      {/* Conversation Display */}
      <div className="flex-1 overflow-y-auto mb-4 pr-1">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-2">
            {msg.role === "user" ? (
              <div className="text-white">
                <strong>You:</strong> {msg.text}
              </div>
            ) : (
              <div className="text-blue-400">
                <strong>Bot:</strong> {msg.text}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Row */}
      <div className="relative">
        <div className="flex items-center bg-gray-800 rounded-xl px-4 py-3">
          {/* Text Input on the left */}
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask Medical Supplies..."
            className="flex-1 bg-transparent focus:outline-none placeholder-gray-400"
          />

          {/* Upload Button near Send Button */}
          <div className="relative ml-2">
            <button
              type="button"
              onClick={() => setIsUploadOpen(!isUploadOpen)}
              className="p-2 text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-600 rounded-lg"
            >
              <Upload className="w-5 h-5" />
            </button>

            {isUploadOpen && (
              <div className="absolute bottom-full right-0 mb-2 w-40 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
                <div className="p-2 space-y-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    multiple
                    accept="image/*,.pdf,.doc,.docx,.txt"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center w-full p-2 text-left text-sm text-gray-300 hover:bg-gray-700 rounded"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Send Button on the far right */}
          <button
            className="ml-2"
            aria-label="Send message"
            onClick={handleSend}
          >
            <Send className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
