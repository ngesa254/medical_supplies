import React from "react";
import { useTier } from "../context/TierContext";
import { UserTierFeatures } from "../types/auth";

interface TierGateProps {
  feature: keyof UserTierFeatures;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const TierGate: React.FC<TierGateProps> = ({
  feature,
  children,
  fallback,
}) => {
  const { canAccess } = useTier();

  if (canAccess(feature)) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return null;
};
