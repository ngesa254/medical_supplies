// "use client";

// import React from "react";
// import { useTier } from "@/context/TierContext";
// import { UserTier } from "@/types/auth";
// import { ChevronDown, CreditCard, Shield, Zap, Check } from "lucide-react";

// export default function AccountPage() {
//   const { currentTier, setTier, getTierName } = useTier();

//   const handleTierChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const newTier = parseInt(event.target.value) as UserTier;
//     setTier(newTier);
//   };

//   const getBadgeColor = (tier: UserTier) => {
//     switch (tier) {
//       case UserTier.TIER_1:
//         return "bg-gray-100 text-gray-800";
//       case UserTier.TIER_2:
//         return "bg-blue-100 text-blue-800";
//       case UserTier.TIER_3:
//         return "bg-purple-100 text-purple-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-2xl font-semibold text-gray-900 mb-6">
//           Account & Subscription
//         </h1>

//         {/* Account Overview */}
//         <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
//           <div className="px-6 py-4 border-b border-gray-200">
//             <h2 className="text-lg font-medium text-gray-900">
//               Account Overview
//             </h2>
//           </div>
//           <div className="p-6">
//             <div className="flex items-center space-x-4">
//               <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-medium">
//                 R
//               </div>
//               <div>
//                 <h3 className="text-xl font-medium">Roy Weber</h3>
//                 <p className="text-gray-600">Purchasing Manager</p>
//                 <p className="text-gray-600">procurement@bighospital.com</p>
//               </div>
//             </div>

//             <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <h4 className="text-sm font-medium text-gray-500 mb-1">
//                   Organization
//                 </h4>
//                 <p className="text-gray-900">Big Hospital Health System</p>
//               </div>
//               <div>
//                 <h4 className="text-sm font-medium text-gray-500 mb-1">
//                   Department
//                 </h4>
//                 <p className="text-gray-900">Procurement & Supply Chain</p>
//               </div>
//               <div>
//                 <h4 className="text-sm font-medium text-gray-500 mb-1">
//                   Member Since
//                 </h4>
//                 <p className="text-gray-900">January 15, 2023</p>
//               </div>
//               <div>
//                 <h4 className="text-sm font-medium text-gray-500 mb-1">
//                   Last Login
//                 </h4>
//                 <p className="text-gray-900">Today at 9:42 AM</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Current Subscription */}
//         <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
//           <div className="px-6 py-4 border-b border-gray-200">
//             <div className="flex justify-between items-center">
//               <h2 className="text-lg font-medium text-gray-900">
//                 Current Subscription
//               </h2>
//               <span
//                 className={`${getBadgeColor(
//                   currentTier
//                 )} inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium`}
//               >
//                 {getTierName(currentTier)}
//               </span>
//             </div>
//           </div>
//           <div className="p-6">
//             <div className="flex justify-between items-center mb-6">
//               <div>
//                 <h3 className="text-lg font-medium text-gray-900">
//                   {getTierName(currentTier)} Plan
//                 </h3>
//                 {currentTier === UserTier.TIER_1 && (
//                   <p className="text-gray-600">Basic access with AI chatbot</p>
//                 )}
//                 {currentTier === UserTier.TIER_2 && (
//                   <p className="text-gray-600">
//                     Inventory management with supply uploads
//                   </p>
//                 )}
//                 {currentTier === UserTier.TIER_3 && (
//                   <p className="text-gray-600">
//                     Full integration with historical data analysis
//                   </p>
//                 )}
//               </div>
//               <div className="text-right">
//                 {currentTier === UserTier.TIER_1 && (
//                   <p className="text-xl font-semibold text-gray-900">
//                     $0<span className="text-sm text-gray-500">/month</span>
//                   </p>
//                 )}
//                 {currentTier === UserTier.TIER_2 && (
//                   <p className="text-xl font-semibold text-gray-900">
//                     $299<span className="text-sm text-gray-500">/month</span>
//                   </p>
//                 )}
//                 {currentTier === UserTier.TIER_3 && (
//                   <p className="text-xl font-semibold text-gray-900">
//                     $999<span className="text-sm text-gray-500">/month</span>
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Demo Tier Selector */}
//             <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
//               <h4 className="text-sm font-medium text-gray-800 mb-2">
//                 Demo: Change Subscription Tier
//               </h4>
//               <div className="relative">
//                 <select
//                   value={currentTier}
//                   onChange={handleTierChange}
//                   className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 >
//                   <option value={UserTier.TIER_1}>
//                     Tier 1 - Basic (Chatbot Only)
//                   </option>
//                   <option value={UserTier.TIER_2}>
//                     Tier 2 - Standard (Includes Supply Upload)
//                   </option>
//                   <option value={UserTier.TIER_3}>
//                     Tier 3 - Premium (Full Integration)
//                   </option>
//                 </select>
//                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                   <ChevronDown size={16} />
//                 </div>
//               </div>
//               <p className="text-xs text-gray-500 mt-2">
//                 This is for demonstration purposes only.
//               </p>
//             </div>

//             {currentTier < UserTier.TIER_3 && (
//               <div className="text-center">
//                 <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg">
//                   Upgrade Now
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Subscription Comparison */}
//         <div className="bg-white shadow rounded-lg overflow-hidden">
//           <div className="px-6 py-4 border-b border-gray-200">
//             <h2 className="text-lg font-medium text-gray-900">
//               Subscription Tiers
//             </h2>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Features
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Basic
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Standard
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Premium
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 <tr>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                     AI Chatbot
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-center">
//                     <Check size={18} className="text-green-500 mx-auto" />
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-center">
//                     <Check size={18} className="text-green-500 mx-auto" />
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-center">
//                     <Check size={18} className="text-green-500 mx-auto" />
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                     Supply Stock Upload
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-center">
//                     <span className="text-gray-400">—</span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-center">
//                     <Check size={18} className="text-green-500 mx-auto" />
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-center">
//                     <Check size={18} className="text-green-500 mx-auto" />
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                     Advanced Analytics
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-center">
//                     <span className="text-gray-400">—</span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-center">
//                     <Check size={18} className="text-green-500 mx-auto" />
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-center">
//                     <Check size={18} className="text-green-500 mx-auto" />
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                     Historical Data Analysis
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-center">
//                     <span className="text-gray-400">—</span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-center">
//                     <span className="text-gray-400">—</span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-center">
//                     <Check size={18} className="text-green-500 mx-auto" />
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                     Real-time Integration
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-center">
//                     <span className="text-gray-400">—</span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-center">
//                     <span className="text-gray-400">—</span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-center">
//                     <Check size={18} className="text-green-500 mx-auto" />
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                     Bulk Quote Comparison
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-center">
//                     <span className="text-gray-400">—</span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-center">
//                     <span className="text-gray-400">—</span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-center">
//                     <Check size={18} className="text-green-500 mx-auto" />
//                   </td>
//                 </tr>
//                 <tr className="bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                     Monthly Price
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-center font-medium">
//                     $0
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-center font-medium">
//                     $299
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-center font-medium">
//                     $999
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="px-6 py-4"></td>
//                   <td className="px-6 py-4 text-center">
//                     <button
//                       className={`px-4 py-2 rounded-lg border ${
//                         currentTier === UserTier.TIER_1
//                           ? "bg-gray-100 text-gray-700 border-gray-300"
//                           : "border-gray-300 text-gray-600 hover:bg-gray-50"
//                       }`}
//                     >
//                       {currentTier === UserTier.TIER_1
//                         ? "Current Plan"
//                         : "Select"}
//                     </button>
//                   </td>
//                   <td className="px-6 py-4 text-center">
//                     <button
//                       className={`px-4 py-2 rounded-lg border ${
//                         currentTier === UserTier.TIER_2
//                           ? "bg-blue-100 text-blue-700 border-blue-300"
//                           : "border-blue-300 text-blue-600 hover:bg-blue-50"
//                       }`}
//                     >
//                       {currentTier === UserTier.TIER_2
//                         ? "Current Plan"
//                         : "Select"}
//                     </button>
//                   </td>
//                   <td className="px-6 py-4 text-center">
//                     <button
//                       className={`px-4 py-2 rounded-lg border ${
//                         currentTier === UserTier.TIER_3
//                           ? "bg-purple-100 text-purple-700 border-purple-300"
//                           : "border-purple-300 text-purple-600 hover:bg-purple-50"
//                       }`}
//                     >
//                       {currentTier === UserTier.TIER_3
//                         ? "Current Plan"
//                         : "Select"}
//                     </button>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import React, { useEffect, useState } from "react";
import { useTier } from "@/context/TierContext";
import { UserTier } from "@/types/auth";
import { ChevronDown, CreditCard, Shield, Zap, Check } from "lucide-react";
import { useUser } from "@clerk/nextjs";

export default function AccountPage() {
  const { currentTier, setTier, getTierName } = useTier();
  const { user, isLoaded } = useUser();
  const [joinDate, setJoinDate] = useState("");
  const [lastLogin, setLastLogin] = useState("");

  // Format the user's creation date and last sign in date when user data is loaded
  useEffect(() => {
    if (isLoaded && user) {
      // Format creation date
      if (user.createdAt) {
        const createdAt = new Date(user.createdAt);
        setJoinDate(
          createdAt.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        );
      }

      // Format last sign in date (using current date for demo if not available)
      if (user.lastSignInAt) {
        const lastSignIn = new Date(user.lastSignInAt);
        const today = new Date();

        // If last sign in was today, show time
        if (lastSignIn.toDateString() === today.toDateString()) {
          setLastLogin(
            `Today at ${lastSignIn.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
            })}`
          );
        } else {
          setLastLogin(
            lastSignIn.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
            })
          );
        }
      } else {
        // Fallback if lastSignInAt isn't available
        const now = new Date();
        setLastLogin(
          `Today at ${now.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          })}`
        );
      }
    }
  }, [isLoaded, user]);

  const handleTierChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTier = parseInt(event.target.value) as UserTier;
    setTier(newTier);
  };

  const getBadgeColor = (tier: UserTier) => {
    switch (tier) {
      case UserTier.TIER_1:
        return "bg-gray-100 text-gray-800";
      case UserTier.TIER_2:
        return "bg-blue-100 text-blue-800";
      case UserTier.TIER_3:
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Display loading state while user data is being fetched
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Account & Subscription
          </h1>
          <div className="bg-white shadow rounded-lg overflow-hidden mb-6 p-6">
            <div className="animate-pulse">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gray-300"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-gray-300 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i}>
                    <div className="h-3 bg-gray-300 rounded w-1/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get user info from Clerk
  const firstName = user?.firstName || "";
  const lastName = user?.lastName || "";
  const fullName =
    user?.fullName || `${firstName} ${lastName}`.trim() || "User";
  const email = user?.primaryEmailAddress?.emailAddress || "";
  const imageUrl = user?.imageUrl;
  const firstInitial = fullName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Account & Subscription
        </h1>

        {/* Account Overview */}
        <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Account Overview
            </h2>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-4">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={fullName}
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-medium">
                  {firstInitial}
                </div>
              )}
              <div>
                <h3 className="text-xl font-medium">{fullName}</h3>
                <p className="text-gray-600">Purchasing Manager</p>
                <p className="text-gray-600">{email}</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">
                  Organization
                </h4>
                <p className="text-gray-900">Big Hospital Health System</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">
                  Department
                </h4>
                <p className="text-gray-900">Procurement & Supply Chain</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">
                  Member Since
                </h4>
                <p className="text-gray-900">{joinDate}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">
                  Last Login
                </h4>
                <p className="text-gray-900">{lastLogin}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Current Subscription */}
        <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">
                Current Subscription
              </h2>
              <span
                className={`${getBadgeColor(
                  currentTier
                )} inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium`}
              >
                {getTierName(currentTier)}
              </span>
            </div>
          </div>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {getTierName(currentTier)} Plan
                </h3>
                {currentTier === UserTier.TIER_1 && (
                  <p className="text-gray-600">Basic access with AI chatbot</p>
                )}
                {currentTier === UserTier.TIER_2 && (
                  <p className="text-gray-600">
                    Inventory management with supply uploads
                  </p>
                )}
                {currentTier === UserTier.TIER_3 && (
                  <p className="text-gray-600">
                    Full integration with historical data analysis
                  </p>
                )}
              </div>
              <div className="text-right">
                {currentTier === UserTier.TIER_1 && (
                  <p className="text-xl font-semibold text-gray-900">
                    $0<span className="text-sm text-gray-500">/month</span>
                  </p>
                )}
                {currentTier === UserTier.TIER_2 && (
                  <p className="text-xl font-semibold text-gray-900">
                    $299<span className="text-sm text-gray-500">/month</span>
                  </p>
                )}
                {currentTier === UserTier.TIER_3 && (
                  <p className="text-xl font-semibold text-gray-900">
                    $999<span className="text-sm text-gray-500">/month</span>
                  </p>
                )}
              </div>
            </div>

            {/* Demo Tier Selector */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
              <h4 className="text-sm font-medium text-gray-800 mb-2">
                Demo: Change Subscription Tier
              </h4>
              <div className="relative">
                <select
                  value={currentTier}
                  onChange={handleTierChange}
                  className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value={UserTier.TIER_1}>
                    Tier 1 - Basic (Chatbot Only)
                  </option>
                  <option value={UserTier.TIER_2}>
                    Tier 2 - Standard (Includes Supply Upload)
                  </option>
                  <option value={UserTier.TIER_3}>
                    Tier 3 - Premium (Full Integration)
                  </option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown size={16} />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                This is for demonstration purposes only.
              </p>
            </div>

            {currentTier < UserTier.TIER_3 && (
              <div className="text-center">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg">
                  Upgrade Now
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Subscription Comparison */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Subscription Tiers
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Features
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Basic
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Standard
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Premium
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    AI Chatbot
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Check size={18} className="text-green-500 mx-auto" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Check size={18} className="text-green-500 mx-auto" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Check size={18} className="text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Supply Stock Upload
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-gray-400">—</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Check size={18} className="text-green-500 mx-auto" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Check size={18} className="text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Advanced Analytics
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-gray-400">—</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Check size={18} className="text-green-500 mx-auto" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Check size={18} className="text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Historical Data Analysis
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-gray-400">—</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-gray-400">—</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Check size={18} className="text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Real-time Integration
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-gray-400">—</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-gray-400">—</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Check size={18} className="text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Bulk Quote Comparison
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-gray-400">—</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-gray-400">—</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Check size={18} className="text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Monthly Price
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center font-medium">
                    $0
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center font-medium">
                    $299
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center font-medium">
                    $999
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4 text-center">
                    <button
                      className={`px-4 py-2 rounded-lg border ${
                        currentTier === UserTier.TIER_1
                          ? "bg-gray-100 text-gray-700 border-gray-300"
                          : "border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {currentTier === UserTier.TIER_1
                        ? "Current Plan"
                        : "Select"}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      className={`px-4 py-2 rounded-lg border ${
                        currentTier === UserTier.TIER_2
                          ? "bg-blue-100 text-blue-700 border-blue-300"
                          : "border-blue-300 text-blue-600 hover:bg-blue-50"
                      }`}
                    >
                      {currentTier === UserTier.TIER_2
                        ? "Current Plan"
                        : "Select"}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      className={`px-4 py-2 rounded-lg border ${
                        currentTier === UserTier.TIER_3
                          ? "bg-purple-100 text-purple-700 border-purple-300"
                          : "border-purple-300 text-purple-600 hover:bg-purple-50"
                      }`}
                    >
                      {currentTier === UserTier.TIER_3
                        ? "Current Plan"
                        : "Select"}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
