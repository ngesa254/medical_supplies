'use client';

/**
 * Welcome component displaying the main header, user greeting,
 * and any additional main content.
 */
export default function Welcome() {
  // Hardcoded userName for demonstration
  const userName = 'Ngesa';

  return (
    <>
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-semibold">model</h1>
          <span className="text-sm text-gray-400">techx 1.0</span>
        </div>
        <div className="flex items-center space-x-4">
          {/* Placeholder for user avatar or profile picture */}
          <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-4xl mb-4">
            <span className="text-blue-400">Hello</span>
            <span className="text-pink-400">, {userName}</span>
          </h2>
          {/* Additional welcome text or components can go here */}
        </div>
      </div>
    </>
  );
}
