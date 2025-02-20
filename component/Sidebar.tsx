// components/Sidebar.tsx
"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  MessageSquare,
  BarChart2,
  FileText,
  Settings,
  ShoppingCart,
  RefreshCcw,
  MessageCircle,
  LineChart,
  ListOrdered,
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  href: string;
  expanded?: boolean;
  subItems?: { text: string; href: string }[];
}

interface UserProps {
  name: string;
  role: string;
  email: string;
  avatar?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  text,
  href,
  expanded = false,
  subItems = [],
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <Link href={href}>
        <div
          className={`
            flex items-center space-x-2 p-2 rounded-lg cursor-pointer
            ${
              isActive
                ? "bg-indigo-50 text-indigo-600"
                : "hover:bg-gray-100 text-gray-600"
            }
          `}
        >
          {icon}
          <span className="flex-1">{text}</span>
          {expanded && (
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(!isOpen);
              }}
              className="p-1 hover:bg-gray-200 rounded-full"
            >
              <svg
                className={`w-4 h-4 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          )}
        </div>
      </Link>
      {expanded && isOpen && subItems.length > 0 && (
        <div className="ml-6 mt-1 space-y-1">
          {subItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <div className="p-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer">
                {item.text}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const UserProfile: React.FC<UserProps> = ({ name, role, email, avatar }) => (
  <div className="flex items-center space-x-3 p-4 border-t border-gray-200">
    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
      {avatar ? (
        <img src={avatar} alt={name} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-indigo-600 text-white">
          {name.charAt(0)}
        </div>
      )}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
      <p className="text-xs text-gray-500 truncate">{role}</p>
      <p className="text-xs text-gray-500 truncate">{email}</p>
    </div>
  </div>
);

export default function Sidebar() {
  return (
    <div className="w-64 bg-white h-full flex flex-col border-r border-gray-200">
      {/* Logo */}
      <div className="flex items-center space-x-2 px-4 py-6">
        <span className="text-blue-600 font-bold text-xl">AMS AI</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        <SidebarItem icon={<Home size={20} />} text="Dashboard" href="/" />
        <SidebarItem
          icon={<MessageSquare size={20} />}
          text="AMS AI Chat"
          href="/chat"
          expanded
          subItems={[
            { text: "New Chat", href: "/chat/new" },
            { text: "History", href: "/chat/history" },
          ]}
        />
        <SidebarItem
          icon={<BarChart2 size={20} />}
          text="Compare Products"
          href="/compare-products"
          expanded
        />
        <SidebarItem
          icon={<FileText size={20} />}
          text="Request for Quote"
          href="/request-quote"
          expanded
        />
        <SidebarItem
          icon={<LineChart size={20} />}
          text="Compare Quotes"
          href="/compare-quotes"
          expanded
        />
        <SidebarItem
          icon={<Settings size={20} />}
          text="AI Agent"
          href="/ai-agent"
          expanded
        />

        <div className="pt-4">
          <SidebarItem
            icon={<ShoppingCart size={20} />}
            text="Inventory"
            href="/inventory"
          />
          <SidebarItem
            icon={<RefreshCcw size={20} />}
            text="Supply Exchange"
            href="/supply-exchange"
            expanded
            subItems={[
              { text: "Exchange list", href: "/supply-exchange/list" },
              { text: "Catalog", href: "/supply-exchange/catalog" },
              { text: "Requests", href: "/supply-exchange/requests" },
            ]}
          />
          <SidebarItem
            icon={<MessageCircle size={20} />}
            text="Product Feedback"
            href="/product-feedback"
          />
          <SidebarItem
            icon={<ListOrdered size={20} />}
            text="Hot List"
            href="/hot-list"
          />
        </div>
      </nav>

      {/* User Profile */}
      <UserProfile
        name="Roy Weber"
        role="Purchasing Manager"
        email="procurement@bighospital.com"
      />
    </div>
  );
}
