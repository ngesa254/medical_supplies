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
  Lock,
  User,
} from "lucide-react";
import { useTier } from "../context/TierContext";
import { UserTier } from "../types/auth";

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  href: string;
  expanded?: boolean;
  subItems?: { text: string; href: string; requiredTier?: UserTier }[];
  requiredTier?: UserTier; // Minimum tier required to access this feature
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
  requiredTier,
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const [isOpen, setIsOpen] = React.useState(false);
  const { currentTier } = useTier();

  // Check if this feature is available in the current tier
  const isAvailable = !requiredTier || currentTier >= requiredTier;

  // Format the display for locked features
  const getLockDisplay = () => {
    if (isAvailable) return null;

    return (
      <div className="flex items-center text-gray-400">
        <Lock size={14} className="mr-1" />
        <span className="text-xs">Tier {requiredTier}</span>
      </div>
    );
  };

  return (
    <div>
      {isAvailable ? (
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
      ) : (
        // If feature is locked, show a disabled version with lock icon
        <div className="flex items-center space-x-2 p-2 rounded-lg text-gray-400 cursor-default group relative">
          {icon}
          <span className="flex-1">{text}</span>
          {getLockDisplay()}

          {/* Tooltip on hover */}
          <div className="absolute left-full ml-2 w-48 bg-gray-800 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
            Upgrade to Tier {requiredTier} to access this feature
          </div>
        </div>
      )}

      {expanded && isOpen && subItems.length > 0 && (
        <div className="ml-6 mt-1 space-y-1">
          {subItems.map((item, index) => {
            const isSubItemAvailable =
              !item.requiredTier || currentTier >= item.requiredTier;

            return isSubItemAvailable ? (
              <Link key={index} href={item.href}>
                <div className="p-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer">
                  {item.text}
                </div>
              </Link>
            ) : (
              <div
                key={index}
                className="p-2 text-sm text-gray-400 rounded-lg cursor-default flex justify-between items-center group relative"
              >
                {item.text}
                <div className="flex items-center">
                  <Lock size={12} className="mr-1" />
                  <span className="text-xs">Tier {item.requiredTier}</span>
                </div>

                {/* Tooltip on hover */}
                <div className="absolute left-full ml-2 w-48 bg-gray-800 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  Upgrade to Tier {item.requiredTier} to access this feature
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const TierBadge: React.FC = () => {
  const { currentTier, getTierName } = useTier();

  const getBadgeColor = () => {
    switch (currentTier) {
      case 1:
        return "bg-gray-100 text-gray-800";
      case 2:
        return "bg-blue-100 text-blue-800";
      case 3:
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span
      className={`${getBadgeColor()} inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium`}
    >
      {getTierName(currentTier)}
    </span>
  );
};

const UserProfile: React.FC<UserProps> = ({ name, role, email, avatar }) => {
  const { currentTier } = useTier();

  return (
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
        <div className="flex items-center space-x-2">
          <p className="text-xs text-gray-500 truncate">{role}</p>
          <TierBadge />
        </div>
        <p className="text-xs text-gray-500 truncate">{email}</p>
      </div>
    </div>
  );
};

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
          requiredTier={UserTier.TIER_2}
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
          requiredTier={UserTier.TIER_2}
        />
        <SidebarItem
          icon={<Settings size={20} />}
          text="AI Agent"
          href="/ai-agent"
          expanded
          requiredTier={UserTier.TIER_3}
        />

        <div className="pt-4">
          <SidebarItem
            icon={<ShoppingCart size={20} />}
            text="Inventory"
            href="/inventory"
            requiredTier={UserTier.TIER_2}
          />
          <SidebarItem
            icon={<RefreshCcw size={20} />}
            text="Supply Exchange"
            href="/supply-exchange"
            expanded
            requiredTier={UserTier.TIER_2}
            subItems={[
              { text: "Exchange list", href: "/supply-exchange/list" },
              { text: "Catalog", href: "/supply-exchange/catalog" },
              {
                text: "Requests",
                href: "/supply-exchange/requests",
                requiredTier: UserTier.TIER_3,
              },
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
            requiredTier={UserTier.TIER_2}
          />
          <SidebarItem
            icon={<User size={20} />}
            text="Account & Subscription"
            href="/account"
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
