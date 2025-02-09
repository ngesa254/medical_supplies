'use client';
import { useState } from 'react';
import { 
  Menu, 
  Heart, 
  HelpCircle, 
  Clock, 
  Settings 
} from 'lucide-react';

/**
 * Sidebar component that can toggle open/closed when the Menu icon is clicked.
 * Displays various icons for navigation and actions.
 */
export default function Sidebar() {
  // State to track sidebar open/close state
  const [isOpen, setIsOpen] = useState(false);

  // Toggles the sidebar width
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`
        bg-gray-800 flex flex-col items-center py-4 border-r border-gray-700
        transition-all duration-300
        ${isOpen ? 'w-48' : 'w-16'}
      `}
    >
      {/* Menu Button to toggle sidebar */}
      <button
        onClick={toggleSidebar}
        className="p-2 hover:bg-gray-700 rounded-lg mb-8"
        aria-label="Menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* New chat button */}
      <button className="p-2 hover:bg-gray-700 rounded-lg mb-4" aria-label="New chat">
        <span className="text-2xl">+</span>
      </button>

      {/* Sidebar navigation icons */}
      <div className="mt-auto flex flex-col gap-4 pb-4">
        <button className="p-2 hover:bg-gray-700 rounded-lg" aria-label="Favorites">
          <Heart className="w-6 h-6" />
        </button>
        <button className="p-2 hover:bg-gray-700 rounded-lg" aria-label="Help">
          <HelpCircle className="w-6 h-6" />
        </button>
        <button className="p-2 hover:bg-gray-700 rounded-lg" aria-label="History">
          <Clock className="w-6 h-6" />
        </button>
        <button className="p-2 hover:bg-gray-700 rounded-lg" aria-label="Settings">
          <Settings className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
