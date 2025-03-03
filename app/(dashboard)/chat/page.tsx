"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Bell,
  ShoppingCart,
  Menu,
  Copy,
  Send,
  ThumbsUp,
  ThumbsDown,
  RefreshCcw,
  Info,
} from "lucide-react";

interface Product {
  name: string;
  price: string;
  type?: string;
  features?: string[];
}

interface Message {
  type: string;
  content: string;
  timestamp: string;
  sources?: string[];
  products?: Product[];
}

export default function EnhancedChatPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentTime, setCurrentTime] = useState<string>("");

  // Set the initial time after component mounts (client-side only)
  useEffect(() => {
    setCurrentTime(new Date().toLocaleString());
  }, []);

  const parseProductComparison = (content: string): Product[] => {
    // Base case: if no content, return empty array
    if (!content) return [];

    const products: Product[] = [];

    // Pattern 1: Look for asterisk-marked products with prices: ***Product Name**: $Price
    const asteriskPricePattern = /\*\*\*(.*?)(?:\*\*|\*):\s*\$([0-9,.]+)/g;
    let match;
    let hasAsteriskPriceMatches = false;

    while ((match = asteriskPricePattern.exec(content)) !== null) {
      hasAsteriskPriceMatches = true;
      const name = match[1].trim();
      const price = `$${match[2]}`;

      // Determine product type from name
      let type = "Standard";
      if (name.toLowerCase().includes("refurbished")) {
        type = "Refurbished";
      } else if (
        name.toLowerCase().includes("automatic") &&
        !name.toLowerCase().includes("semi")
      ) {
        type = "Automatic";
      } else if (name.toLowerCase().includes("semi-automatic")) {
        type = "Semi-Automatic";
      }

      // Extract features based on content
      const features: string[] = [];

      // Check for known technologies or features in the name
      const techPatterns = [
        { pattern: /powerheart/i, feature: "Powerheart Technology" },
        { pattern: /heartstart/i, feature: "HeartStart Technology" },
        { pattern: /paddles/i, feature: "Includes Contact Paddles" },
        { pattern: /zoll/i, feature: "Zoll Technology" },
        { pattern: /philips/i, feature: "Philips Technology" },
        { pattern: /aed plus/i, feature: "AED Plus Features" },
        { pattern: /g3/i, feature: "G3 Model" },
        { pattern: /g5/i, feature: "G5 Model" },
        { pattern: /xl/i, feature: "XL Model" },
      ];

      techPatterns.forEach((tech) => {
        if (tech.pattern.test(name)) {
          features.push(tech.feature);
        }
      });

      products.push({ name, price, type, features });
    }

    if (hasAsteriskPriceMatches) {
      return products;
    }

    // Pattern 2: Look for numbered list with "for $" pattern
    const numberedListPattern = /\d+\.\s+(.*?)\s+for\s+\$([0-9,.]+)/g;
    let hasNumberedListMatches = false;

    while ((match = numberedListPattern.exec(content)) !== null) {
      hasNumberedListMatches = true;
      const name = match[1].trim();
      const price = `$${match[2]}`;

      // Determine type based on name
      let type = "Standard";
      if (name.toLowerCase().includes("refurbished")) {
        type = "Refurbished";
      } else if (
        name.toLowerCase().includes("automatic") &&
        !name.toLowerCase().includes("semi")
      ) {
        type = "Automatic";
      } else if (name.toLowerCase().includes("semi-automatic")) {
        type = "Semi-Automatic";
      }

      // Extract features based on patterns
      const features: string[] = [];

      // Check for known technologies in the name
      const techPatterns = [
        { pattern: /powerheart/i, feature: "Powerheart Technology" },
        { pattern: /heartstart/i, feature: "HeartStart Technology" },
        { pattern: /paddles/i, feature: "Includes Contact Paddles" },
        { pattern: /zoll/i, feature: "Zoll Technology" },
        { pattern: /philips/i, feature: "Philips Technology" },
        { pattern: /aed plus/i, feature: "AED Plus Features" },
      ];

      techPatterns.forEach((tech) => {
        if (tech.pattern.test(name)) {
          features.push(tech.feature);
        }
      });

      products.push({ name, price, type, features });
    }

    if (hasNumberedListMatches) {
      return products;
    }

    // Pattern 3: Look for educational content with highlighted product models
    if (
      content.includes("***") &&
      (content.includes("factors") || content.includes("consider"))
    ) {
      // Extract model mentions
      const modelMentionPattern = /\*\*\*(.*?):\*\* (.*?)(?=\*\*\*|$)/g;
      const modelDescriptions: { [key: string]: string } = {};

      while ((match = modelMentionPattern.exec(content)) !== null) {
        const key = match[1].trim();
        const description = match[2].trim();

        // If the key looks like a product name
        if (
          key.includes("AED") ||
          key.includes("Defibrillator") ||
          key.includes("Powerheart") ||
          key.includes("HeartStart") ||
          key.includes("Zoll") ||
          key.includes("Philips") ||
          key.includes("Cardiac") ||
          key.includes("Defibtech")
        ) {
          const name = key;

          // Determine type from description
          let type = "Standard";
          const desc = description.toLowerCase();
          if (desc.includes("automatic") && !desc.includes("semi")) {
            type = "Automatic";
          } else if (desc.includes("semi-automatic")) {
            type = "Semi-Automatic";
          }

          // Extract features from description
          const features: string[] = [];
          if (desc.includes("cpr coaching") || desc.includes("cpr feedback")) {
            features.push("CPR Coaching");
          }
          if (desc.includes("smartphone") || desc.includes("app")) {
            features.push("Smartphone Connectivity");
          }
          if (desc.includes("easy to use") || desc.includes("user-friendly")) {
            features.push("User Friendly");
          }

          // Add technology features based on name
          if (name.includes("Powerheart"))
            features.push("Powerheart Technology");
          if (name.includes("HeartStart"))
            features.push("HeartStart Technology");
          if (name.includes("Zoll")) features.push("Zoll Technology");
          if (name.includes("Philips")) features.push("Philips Technology");

          // Determine price category
          let price = "Contact for pricing";
          if (desc.includes("budget") || desc.includes("affordable")) {
            price = "Budget-friendly";
          } else if (desc.includes("premium") || desc.includes("high-end")) {
            price = "Premium";
          }

          products.push({ name, price, type, features });
        }
      }

      return products;
    }

    return products;
  };

  // Helper function to determine the display type based on content format
  const determineDisplayType = (
    content?: string,
    products?: Product[]
  ): "price-list" | "cards" | "educational" => {
    if (!content) return "cards";

    // Check for price list indicators
    const isPriceList =
      // Look for asterisk format indicators
      (content.includes("***") &&
        content.includes("$") &&
        products &&
        products.length > 0) ||
      // Look for numbered list indicators
      /\d+\.\s+.*?\s+for\s+\$[0-9,.]+/.test(content) ||
      // Look for "cheapest" or "price" indicators with multiple products
      ((content.toLowerCase().includes("cheapest") ||
        content.toLowerCase().includes("price") ||
        content.toLowerCase().includes("cost") ||
        content.toLowerCase().includes("affordable")) &&
        products &&
        products.length > 1);

    if (isPriceList) return "price-list";

    // Check for educational content indicators
    const isEducational =
      (content.includes("factors") || content.includes("consider")) &&
      content.includes("***");

    if (isEducational) return "educational";

    // Default to cards for other formats
    return "cards";
  };

  const ProductComparison = ({
    products,
    content,
  }: {
    products: Product[];
    content?: string;
  }) => {
    if (!products || products.length === 0) return null;

    // Analyze message format to determine display style
    const displayType = determineDisplayType(content, products);

    return (
      <div className="mt-4 mb-2">
        {/* Educational content with factors to consider */}
        {displayType === "educational" && (
          <div className="mb-6">
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4">
              <h3 className="text-blue-800 font-medium mb-3 flex items-center">
                <Info className="h-5 w-5 mr-2" />
                Factors to Consider When Choosing a Defibrillator
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {/* Type Factor */}
                <div className="bg-white rounded-md p-3 border border-gray-100">
                  <h4 className="font-medium text-gray-800 mb-2">Type</h4>
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">Automatic:</span> Easier to
                    use but more expensive
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    <span className="font-medium">Semi-automatic:</span>{" "}
                    Requires pushing a button to deliver shock, more affordable
                  </p>
                </div>

                {/* Features Factor */}
                <div className="bg-white rounded-md p-3 border border-gray-100">
                  <h4 className="font-medium text-gray-800 mb-2">Features</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• CPR coaching</li>
                    <li>• Smartphone connectivity</li>
                    <li>• Voice instructions</li>
                    <li>• Visual indicators</li>
                  </ul>
                </div>

                {/* Price Factor */}
                <div className="bg-white rounded-md p-3 border border-gray-100">
                  <h4 className="font-medium text-gray-800 mb-2">
                    Price Range
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Defibrillators typically range from $1,000 to $3,000
                    depending on features and type.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-gray-800 font-medium mb-3">
              Top Recommended Defibrillators
            </h3>
          </div>
        )}

        {/* Price list format display */}
        {displayType === "price-list" && (
          <div className="mb-4">
            <h3 className="text-gray-800 font-medium mb-3 flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2 text-blue-600" />
              {content && content.toLowerCase().includes("cheapest")
                ? "Most Affordable Options"
                : content && content.toLowerCase().includes("top")
                ? "Top-Rated Options"
                : "Product Comparison"}
            </h3>

            {/* Price list view */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-3 px-4 text-left text-gray-600 font-medium">
                      #
                    </th>
                    <th className="py-3 px-4 text-left text-gray-600 font-medium">
                      Product
                    </th>
                    <th className="py-3 px-4 text-left text-gray-600 font-medium">
                      Type
                    </th>
                    <th className="py-3 px-4 text-left text-gray-600 font-medium">
                      Price
                    </th>
                    <th className="py-3 px-4 text-right text-gray-600 font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, idx) => {
                    // Determine badge color based on type
                    let badgeColor = "bg-blue-100 text-blue-800";
                    if (product.type === "Automatic") {
                      badgeColor = "bg-indigo-100 text-indigo-800";
                    } else if (product.type === "Semi-Automatic") {
                      badgeColor = "bg-teal-100 text-teal-800";
                    } else if (product.type === "Refurbished") {
                      badgeColor = "bg-amber-100 text-amber-800";
                    }

                    return (
                      <tr
                        key={idx}
                        className="border-t border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4 text-gray-800 font-medium">
                          {idx + 1}
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium text-gray-800">
                              {product.name}
                            </div>
                            {product.features &&
                              product.features.length > 0 && (
                                <div className="mt-1 flex flex-wrap gap-1">
                                  {product.features.map((feature, i) => (
                                    <span
                                      key={i}
                                      className="inline-block text-xs text-gray-500"
                                    >
                                      • {feature}
                                    </span>
                                  ))}
                                </div>
                              )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block px-2 py-1 rounded text-xs ${badgeColor}`}
                          >
                            {product.type}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-bold text-blue-700">
                          {product.price}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded text-sm transition-colors mr-2">
                            Quote
                          </button>
                          <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-3 rounded text-sm transition-colors">
                            Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Card view display */}
        {displayType === "cards" && (
          <div className="overflow-x-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.map((product, idx) => {
                // Determine card style based on type
                let headerBgColor = "bg-blue-50";
                let headerTextColor = "text-blue-800";
                let badgeColor = "bg-blue-600";

                if (product.type === "Automatic") {
                  headerBgColor = "bg-indigo-50";
                  headerTextColor = "text-indigo-800";
                  badgeColor = "bg-indigo-600";
                } else if (product.type === "Semi-Automatic") {
                  headerBgColor = "bg-teal-50";
                  headerTextColor = "text-teal-800";
                  badgeColor = "bg-teal-600";
                } else if (product.type === "Refurbished") {
                  headerBgColor = "bg-amber-50";
                  headerTextColor = "text-amber-800";
                  badgeColor = "bg-amber-600";
                }

                return (
                  <div
                    key={idx}
                    className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className={`${headerBgColor} p-3 border-b`}>
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`inline-block ${badgeColor} text-white text-xs px-2 py-1 rounded-full`}
                        >
                          {displayType === "cards"
                            ? "Top Pick"
                            : `#${idx + 1}`}
                        </span>
                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                          {product.type}
                        </span>
                      </div>
                      <h3 className={`font-medium ${headerTextColor}`}>
                        {product.name}
                      </h3>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-gray-600">Price:</span>
                        <span className="text-lg font-bold text-blue-700">
                          {product.price}
                        </span>
                      </div>

                      {product.features && product.features.length > 0 && (
                        <div className="mt-3">
                          <p className="text-gray-600 text-sm mb-1">
                            Key Features:
                          </p>
                          <ul className="list-disc pl-5 text-sm text-gray-700">
                            {product.features.map((feature, i) => (
                              <li key={i}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="flex mt-4 space-x-2">
                        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm transition-colors">
                          Request Quote
                        </button>
                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-3 rounded-lg text-sm transition-colors">
                          Learn More
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {displayType === "educational" && (
          <div className="mt-6 bg-gray-50 border border-gray-100 rounded-lg p-4">
            <p className="text-gray-700 text-sm italic">
              Ultimately, the best way to choose a defibrillator is to talk to
              your doctor or a healthcare professional. They can help you choose
              a defibrillator that is right for your specific needs.
            </p>
          </div>
        )}
      </div>
    );
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    const userMessage = {
      type: "user",
      content: inputText,
      timestamp: new Date().toLocaleString(),
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      // POST to the local /api route
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: inputText,
        }),
      });

      const data = await response.json();

      const responseContent = data?.response?.response ?? "";
      const productsFound = parseProductComparison(responseContent);

      const aiMessage = {
        type: "ai",
        content: responseContent,
        timestamp: new Date().toLocaleString(),
        sources: data?.response?.sources ?? [],
        products: productsFound,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        type: "error",
        content: "Sorry, there was an error processing your request.",
        timestamp: new Date().toLocaleString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setIsLoading(false);
    setInputText("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopyText = (text: string): void => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="h-16 border-b border-gray-200 flex items-center justify-between px-4">
          <div className="flex items-center">
            <button
              className="mr-4 md:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">
              Request for Quote
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="h-5 w-5 text-gray-600" />
              </button>
              <div className="relative">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <ShoppingCart className="h-5 w-5 text-gray-600" />
                </button>
                <span className="absolute -top-1 -right-1 bg-gray-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  2
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 p-4 md:p-6 overflow-y-auto">
          {/* If no messages yet, show an initial AI prompt */}
          {messages.length === 0 && currentTime && (
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">AI</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center flex-wrap gap-2">
                  <span className="font-medium">AMS AI</span>
                  <span className="text-gray-400 text-sm">{currentTime}</span>
                </div>
                <p className="mt-2 text-gray-700">
                  For which products would you like to obtain quotes?
                </p>
                <p className="mt-2 text-gray-600">
                  Select product via search or type in product name
                </p>
              </div>
            </div>
          )}

          {/* Render conversation messages */}
          {messages.map((message, index) => (
            <div key={index} className="flex items-start space-x-4 mb-6">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 
                  ${message.type === "ai" ? "bg-blue-600" : "bg-gray-600"}`}
              >
                <span className="text-white text-sm">
                  {message.type === "ai" ? "AI" : "U"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center flex-wrap gap-2">
                  <span className="font-medium">
                    {message.type === "ai" ? "AMS AI" : "You"}
                  </span>
                  <span className="text-gray-400 text-sm">
                    {message.timestamp}
                  </span>
                </div>
                <p
                  className={`mt-2 ${
                    message.type === "error" ? "text-red-500" : "text-gray-700"
                  }`}
                >
                  {message.content}
                </p>

                {/* Product comparison cards (if products are detected) */}
                {message.type === "ai" &&
                  message.products &&
                  message.products.length > 0 && (
                    <ProductComparison
                      products={message.products}
                      content={message.content}
                    />
                  )}

                {message.type === "ai" && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      onClick={() => handleCopyText(message.content)}
                    >
                      <Copy className="h-5 w-5 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <ThumbsUp className="h-5 w-5 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <ThumbsDown className="h-5 w-5 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <RefreshCcw className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Loading dots */}
          {isLoading && (
            <div className="flex items-center justify-center space-x-2">
              <div
                className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <div
                className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="border-t border-gray-200 p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Ask anything"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full p-4 pr-32 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              {/* Copy button for user input (optional) */}
              <button
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => handleCopyText(inputText)}
              >
                <Copy className="h-5 w-5 text-gray-600" />
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
                onClick={handleSendMessage}
                disabled={isLoading}
              >
                <span className="hidden sm:inline">Send</span>
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
