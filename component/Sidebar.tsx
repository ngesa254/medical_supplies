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
  ChevronUp,
  ChevronDown,
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
  const { currentTier, getTierName } = useTier();

  // Check if this feature is available in the current tier
  const isAvailable = !requiredTier || currentTier >= requiredTier;

  return (
    <div className="relative group">
      {isAvailable ? (
        <Link href={href}>
          <div
            className={`
              flex items-center space-x-2 p-2 rounded-lg cursor-pointer relative
              ${
                isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "hover:bg-gray-50 text-gray-700"
              }
            `}
          >
            <span className="text-indigo-500">{icon}</span>
            <span className="flex-1 font-medium">{text}</span>
            {expanded && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(!isOpen);
                }}
                className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            )}
          </div>
        </Link>
      ) : (
        // If feature is locked, show a disabled version with a more modern design
        <div className="relative">
          <div className="flex items-center space-x-2 p-2 rounded-lg text-gray-400 cursor-default group">
            <span className="text-gray-300">{icon}</span>
            <span className="flex-1 font-medium">{text}</span>
            <div className="flex items-center">
              <Lock size={14} className="text-gray-400" />
            </div>
          </div>

          {/* Premium tag indicator */}
          <div className="absolute right-0 top-0 transform translate-x-1 -translate-y-1">
            <div
              className={`
              px-2 py-0.5 rounded-full text-xs font-medium inline-flex items-center text-white
              ${
                requiredTier === UserTier.TIER_2
                  ? "bg-blue-500"
                  : "bg-purple-500"
              }
            `}
            >
              {getTierName(requiredTier || UserTier.TIER_1)}
            </div>
          </div>

          {/* Hover tooltip that appears above the sidebar item */}
          <div className="absolute left-0 transform -translate-y-full -mt-1 w-full z-50 hidden group-hover:block pointer-events-none">
            <div className="ml-10 p-2 bg-gray-800 text-white text-xs rounded-md shadow-lg">
              <div className="relative">
                <div className="absolute bottom-0 left-5 transform translate-y-full">
                  <div className="w-2 h-2 bg-gray-800 transform rotate-45"></div>
                </div>
                Upgrade to {getTierName(requiredTier || UserTier.TIER_1)} to
                unlock
              </div>
            </div>
          </div>
        </div>
      )}

      {expanded && isOpen && subItems.length > 0 && (
        <div className="ml-6 mt-1 space-y-0.5">
          {subItems.map((item, index) => {
            const isSubItemAvailable =
              !item.requiredTier || currentTier >= item.requiredTier;

            return isSubItemAvailable ? (
              <Link key={index} href={item.href}>
                <div className="p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                  {item.text}
                </div>
              </Link>
            ) : (
              <div
                key={index}
                className="p-2 text-sm text-gray-400 rounded-lg cursor-default flex justify-between items-center group relative"
              >
                <span>{item.text}</span>
                <span
                  className={`
                  px-1.5 py-0.5 rounded-full text-xs font-medium inline-flex items-center text-white
                  ${
                    item.requiredTier === UserTier.TIER_2
                      ? "bg-blue-500"
                      : "bg-purple-500"
                  }
                `}
                >
                  {getTierName(item.requiredTier || UserTier.TIER_1)}
                </span>

                {/* Tooltip on hover */}
                <div className="absolute left-0 transform -translate-y-full -mt-1 w-full z-50 hidden group-hover:block pointer-events-none">
                  <div className="p-2 bg-gray-800 text-white text-xs rounded-md shadow-lg">
                    <div className="relative">
                      <div className="absolute bottom-0 left-5 transform translate-y-full">
                        <div className="w-2 h-2 bg-gray-800 transform rotate-45"></div>
                      </div>
                      Upgrade to{" "}
                      {getTierName(item.requiredTier || UserTier.TIER_1)} to
                      unlock
                    </div>
                  </div>
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
        return "bg-gray-100 text-gray-800 border-gray-200";
      case 2:
        return "bg-blue-50 text-blue-700 border-blue-200";
      case 3:
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <span
      className={`${getBadgeColor()} inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border`}
    >
      {getTierName(currentTier)}
    </span>
  );
};

const UserProfile: React.FC<UserProps> = ({ name, role, email, avatar }) => {
  return (
    <div className="flex items-center space-x-3 p-4 border-t border-gray-200 bg-gray-50">
      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden shadow-sm">
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
    <div className="w-64 bg-white h-full flex flex-col border-r border-gray-200 shadow-sm">
      {/* Logo */}
      <div className="flex items-center space-x-2 px-4 py-6 border-b border-gray-100">
        <span className="text-indigo-600 font-bold text-xl">AMS AI</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        <SidebarItem icon={<Home size={18} />} text="Dashboard" href="/" />
        <SidebarItem
          icon={<MessageSquare size={18} />}
          text="AMS AI Chat"
          href="/chat"
          expanded
          subItems={[
            { text: "New Chat", href: "/chat/new" },
            { text: "History", href: "/chat/history" },
          ]}
        />
        <SidebarItem
          icon={<BarChart2 size={18} />}
          text="Compare Products"
          href="/compare-products"
          expanded
          requiredTier={UserTier.TIER_2}
        />
        <SidebarItem
          icon={<FileText size={18} />}
          text="Request for Quote"
          href="/request-quote"
          expanded
        />
        <SidebarItem
          icon={<LineChart size={18} />}
          text="Compare Quotes"
          href="/compare-quotes"
          expanded
          requiredTier={UserTier.TIER_2}
        />
        <SidebarItem
          icon={<Settings size={18} />}
          text="AI Agent"
          href="/ai-agent"
          expanded
          requiredTier={UserTier.TIER_3}
        />

        <div className="pt-4 mt-4 border-t border-gray-100">
          <SidebarItem
            icon={<ShoppingCart size={18} />}
            text="Inventory"
            href="/inventory"
            requiredTier={UserTier.TIER_2}
          />
          <SidebarItem
            icon={<RefreshCcw size={18} />}
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
            icon={<MessageCircle size={18} />}
            text="Product Feedback"
            href="/product-feedback"
          />
          <SidebarItem
            icon={<ListOrdered size={18} />}
            text="Hot List"
            href="/hot-list"
            requiredTier={UserTier.TIER_2}
          />
          <SidebarItem
            icon={<User size={18} />}
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
