"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
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
  User,
  ChevronUp,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { useClerk, useUser } from "@clerk/nextjs";
import { useTier } from "../context/TierContext";
import { UserTier } from "../types/auth";

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  href: string;
  expanded?: boolean;
  subItems?: { text: string; href: string }[];
  onClick?: () => void;
  requiredTier?: UserTier; // Minimum tier required to access this feature
}

const SidebarItem: React.FC<SidebarItemProps & { tier: UserTier }> = ({
  icon,
  text,
  href,
  expanded = false,
  subItems = [],
  onClick,
  tier,
  requiredTier,
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const [isOpen, setIsOpen] = React.useState(false);

  // Check if this feature is available in the current tier
  const isAvailable = !requiredTier || tier >= requiredTier;

  // Get tier-specific colors
  const getTierColors = () => {
    switch (tier) {
      case UserTier.TIER_1: // Chat Only - Gray theme
        return {
          icon: "text-gray-600",
          activeBackground: "bg-gray-100",
          activeText: "text-gray-800",
          hoverBackground: "hover:bg-gray-50",
        };
      case UserTier.TIER_2: // Inventory Data - Blue theme
        return {
          icon: "text-blue-600",
          activeBackground: "bg-blue-50",
          activeText: "text-blue-800",
          hoverBackground: "hover:bg-blue-50",
        };
      case UserTier.TIER_3: // Full Integration - Purple theme
        return {
          icon: "text-purple-600",
          activeBackground: "bg-purple-50",
          activeText: "text-purple-800",
          hoverBackground: "hover:bg-purple-50",
        };
      default:
        return {
          icon: "text-gray-600",
          activeBackground: "bg-gray-100",
          activeText: "text-gray-800",
          hoverBackground: "hover:bg-gray-50",
        };
    }
  };

  const colors = getTierColors();

  // If there's an onClick handler, use it instead of navigation
  if (onClick) {
    return (
      <div className="relative group">
        <div
          onClick={onClick}
          className={`
            flex items-center space-x-2 p-2 rounded-lg cursor-pointer relative
            ${colors.hoverBackground} text-gray-700
          `}
        >
          <span className={colors.icon}>{icon}</span>
          <span className="flex-1 font-medium">{text}</span>
        </div>
      </div>
    );
  }

  // If feature is locked, show a disabled version
  if (!isAvailable) {
    return (
      <div className="relative group">
        <div className="flex items-center space-x-2 p-2 rounded-lg text-gray-400 opacity-60 cursor-not-allowed">
          <span className="text-gray-400">{icon}</span>
          <span className="flex-1 font-medium">{text}</span>
          {expanded && (
            <div className="p-1 rounded-full text-gray-400">
              <ChevronDown size={16} />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      <Link href={href}>
        <div
          className={`
            flex items-center space-x-2 p-2 rounded-lg cursor-pointer relative
            ${
              isActive
                ? `${colors.activeBackground} ${colors.activeText}`
                : `${colors.hoverBackground} text-gray-700`
            }
          `}
        >
          <span className={colors.icon}>{icon}</span>
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

      {expanded && isOpen && subItems.length > 0 && (
        <div className="ml-6 mt-1 space-y-0.5">
          {subItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <div
                className={`p-2 text-sm text-gray-600 ${colors.hoverBackground} rounded-lg cursor-pointer`}
              >
                {item.text}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

// Tier utility functions
const getTierName = (tier: number): string => {
  switch (tier) {
    case 1:
      return "Basic";
    case 2:
      return "Pro";
    case 3:
      return "Enterprise";
    default:
      return "Basic";
  }
};

const TierFlag: React.FC<{ tier: number }> = ({ tier }) => {
  const getTierColor = () => {
    switch (tier) {
      case 1:
        return "bg-gray-100 border-gray-300 text-gray-800";
      case 2:
        return "bg-blue-100 border-blue-300 text-blue-800";
      case 3:
        return "bg-purple-100 border-purple-300 text-purple-800";
      default:
        return "bg-gray-100 border-gray-300 text-gray-800";
    }
  };

  return (
    <div
      className={`absolute -top-3 right-4 px-3 py-1 rounded-full text-xs font-medium border ${getTierColor()}`}
    >
      {getTierName(tier)}
    </div>
  );
};

const UserProfile: React.FC = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const { currentTier, getTierName } = useTier();

  // Handle logout
  const handleSignOut = async () => {
    await signOut();
    router.push("/sign-in");
  };

  if (!user) {
    return (
      <div className="p-4 border-t border-gray-200 bg-gray-50 animate-pulse">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-300"></div>
          <div className="flex-1">
            <div className="h-3 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-2 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  // Get user info from Clerk
  const name = user.fullName || user.firstName || "User";
  const email = user.primaryEmailAddress?.emailAddress || "";
  const imageUrl = user.imageUrl;
  const role = "Purchasing Manager"; // This would typically come from your app's role management

  return (
    <div className="border-t border-gray-200 bg-gray-50 relative">
      <TierFlag tier={currentTier} />
      <div className="flex items-center space-x-3 p-4">
        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden shadow-sm">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
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

      {/* Logout button */}
      <div className="px-4 pb-4">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center space-x-2 p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default function Sidebar() {
  const { signOut } = useClerk();
  const router = useRouter();
  const { currentTier } = useTier();

  const handleSignOut = async () => {
    await signOut();
    router.push("/sign-in");
  };

  // Get sidebar background color based on tier
  const getSidebarColor = () => {
    switch (currentTier) {
      case UserTier.TIER_1: // Chat Only
        return "bg-white";
      case UserTier.TIER_2: // Inventory Data
        return "bg-blue-50";
      case UserTier.TIER_3: // Full Integration
        return "bg-purple-50";
      default:
        return "bg-white";
    }
  };

  // Get border color based on tier
  const getBorderColor = () => {
    switch (currentTier) {
      case UserTier.TIER_1:
        return "border-gray-200";
      case UserTier.TIER_2:
        return "border-blue-200";
      case UserTier.TIER_3:
        return "border-purple-200";
      default:
        return "border-gray-200";
    }
  };

  // Get logo color based on tier
  const getLogoColor = () => {
    switch (currentTier) {
      case UserTier.TIER_1:
        return "text-gray-700";
      case UserTier.TIER_2:
        return "text-blue-600";
      case UserTier.TIER_3:
        return "text-purple-600";
      default:
        return "text-gray-700";
    }
  };

  // Custom tier description
  const getTierDescription = () => {
    switch (currentTier) {
      case UserTier.TIER_1:
        return "Chat Only";
      case UserTier.TIER_2:
        return "Inventory Data";
      case UserTier.TIER_3:
        return "Full Integration";
      default:
        return "Basic";
    }
  };

  return (
    <div
      className={`w-64 ${getSidebarColor()} h-full flex flex-col border-r ${getBorderColor()} shadow-sm`}
    >
      {/* Logo */}
      <div
        className={`flex items-center justify-between px-4 py-6 border-b ${getBorderColor()}`}
      >
        <span className={`${getLogoColor()} font-bold text-xl`}>AMS AI</span>
        <div
          className="text-xs font-medium px-2 py-1 rounded-md bg-opacity-80"
          style={{ backgroundColor: "rgba(0,0,0,0.05)" }}
        >
          {getTierDescription()}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        <SidebarItem
          icon={<Home size={18} />}
          text="Dashboard"
          href="/"
          tier={currentTier}
        />
        {/* Chat functionality - Available to all tiers */}
        <SidebarItem
          icon={<MessageSquare size={18} />}
          text="AMS AI Chat"
          href="/chat"
          expanded
          tier={currentTier}
          subItems={[
            { text: "New Chat", href: "/chat/new" },
            { text: "History", href: "/chat/history" },
          ]}
        />

        {/* Tier 2 and above features - Inventory based */}
        <div className="pt-2 mt-2 border-t border-gray-200">
          <div className="px-2 py-1 text-xs text-gray-500 font-medium">
            {currentTier >= UserTier.TIER_2
              ? "Inventory Data Features"
              : "Inventory Data Features (Unavailable)"}
          </div>
          <SidebarItem
            icon={<ShoppingCart size={18} />}
            text="Inventory Management"
            href="/inventory"
            tier={currentTier}
            requiredTier={UserTier.TIER_2}
          />
          <SidebarItem
            icon={<BarChart2 size={18} />}
            text="Compare Products"
            href="/compare-products"
            expanded
            tier={currentTier}
            requiredTier={UserTier.TIER_2}
          />
          <SidebarItem
            icon={<ListOrdered size={18} />}
            text="Hot List"
            href="/hot-list"
            tier={currentTier}
            requiredTier={UserTier.TIER_2}
          />
        </div>

        {/* Tier 3 features - Full Integration */}
        <div className="pt-2 mt-2 border-t border-gray-200">
          <div className="px-2 py-1 text-xs text-gray-500 font-medium">
            {currentTier >= UserTier.TIER_3
              ? "Full Integration Features"
              : "Full Integration Features (Unavailable)"}
          </div>
          <SidebarItem
            icon={<Settings size={18} />}
            text="AI Agent"
            href="/ai-agent"
            expanded
            tier={currentTier}
            requiredTier={UserTier.TIER_3}
          />
          <SidebarItem
            icon={<LineChart size={18} />}
            text="Predictive Analytics"
            href="/analytics"
            tier={currentTier}
            requiredTier={UserTier.TIER_3}
          />
          <SidebarItem
            icon={<RefreshCcw size={18} />}
            text="Supply Exchange"
            href="/supply-exchange"
            expanded
            tier={currentTier}
            requiredTier={UserTier.TIER_3}
            subItems={[
              { text: "Exchange list", href: "/supply-exchange/list" },
              { text: "Catalog", href: "/supply-exchange/catalog" },
              { text: "Requests", href: "/supply-exchange/requests" },
            ]}
          />
        </div>

        {/* Common features across all tiers */}
        <div className="pt-2 mt-2 border-t border-gray-200">
          <SidebarItem
            icon={<FileText size={18} />}
            text="Request for Quote"
            href="/request-quote"
            expanded
            tier={currentTier}
          />
          <SidebarItem
            icon={<MessageCircle size={18} />}
            text="Product Feedback"
            href="/product-feedback"
            tier={currentTier}
          />
          <SidebarItem
            icon={<User size={18} />}
            text="Account & Subscription"
            href="/account"
            tier={currentTier}
          />
        </div>
      </nav>

      {/* User Profile with Clerk Integration */}
      <UserProfile />
    </div>
  );
}
