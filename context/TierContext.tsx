"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserTier, tierFeatures, UserTierFeatures } from "../types/auth";

// For Clerk's useUser hook
interface ClerkUser {
  user: {
    id: string;
    publicMetadata?: Record<string, any>;
    update?: (data: { publicMetadata: any }) => Promise<any>;
  } | null;
}

// Mock useUser hook if not using Clerk
const useUser = (): ClerkUser => {
  // Return a mock user object that matches the shape we need
  return {
    user: null,
  };
};

interface TierContextType {
  currentTier: UserTier;
  features: UserTierFeatures;
  setTier: (tier: UserTier) => void;
  canAccess: (feature: keyof UserTierFeatures) => boolean;
  getTierName: (tier: UserTier) => string;
  upgradeTier: () => void;
}

const TierContext = createContext<TierContextType | null>(null);

export const TierProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();
  const [currentTier, setCurrentTier] = useState<UserTier>(UserTier.TIER_1);

  useEffect(() => {
    if (user) {
      // In a real app, you would fetch the user's tier from your database
      // For now, we'll use public metadata from Clerk if it exists
      const userTier = user.publicMetadata?.tier as UserTier;
      if (userTier) {
        setCurrentTier(userTier);
      }
    }
  }, [user]);

  const setTier = async (tier: UserTier) => {
    setCurrentTier(tier);

    // In a real application, you would update this in your database
    // For Clerk, you can update public metadata
    if (user && user.update) {
      try {
        await user.update({
          publicMetadata: { tier },
        });
      } catch (error) {
        console.error("Failed to update user tier", error);
      }
    }
  };

  const canAccess = (feature: keyof UserTierFeatures): boolean => {
    return tierFeatures[currentTier][feature];
  };

  const upgradeTier = () => {
    if (currentTier < UserTier.TIER_3) {
      setTier((currentTier + 1) as UserTier);
    }
  };

  const getTierName = (tier: UserTier): string => {
    switch (tier) {
      case UserTier.TIER_1:
        return "Basic";
      case UserTier.TIER_2:
        return "Standard";
      case UserTier.TIER_3:
        return "Premium";
      default:
        return "Unknown";
    }
  };

  return (
    <TierContext.Provider
      value={{
        currentTier,
        features: tierFeatures[currentTier],
        setTier,
        canAccess,
        getTierName,
        upgradeTier,
      }}
    >
      {children}
    </TierContext.Provider>
  );
};

export const useTier = () => {
  const context = useContext(TierContext);
  if (!context) {
    throw new Error("useTier must be used within a TierProvider");
  }
  return context;
};
