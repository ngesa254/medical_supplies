import React, { useState, useEffect } from "react";

function parseDefibrillatorData(text) {
  const lines = text.split("\n");
  const result = {
    items: [],
    disclaimer: "",
  };

  // Find disclaimer - it starts with "It is important"
  const disclaimerIndex = lines.findIndex((line) =>
    line.startsWith("It is important")
  );
  if (disclaimerIndex !== -1) {
    result.disclaimer = lines.slice(disclaimerIndex).join(" ").trim();
  }

  // Look for numbered items
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(/^(\d+)\.\s+\*\*([^*]+)\*\*:\s+(.*)/);

    if (match) {
      const [_, number, name, description] = match;

      // Parse price
      const priceMatch = description.match(/\$[\d,]+/);
      const price = priceMatch ? priceMatch[0] : "Price not specified";

      // Determine type
      const type = description.toLowerCase().includes("fully automatic")
        ? "Fully Automatic"
        : description.toLowerCase().includes("semi-automatic")
        ? "Semi-Automatic"
        : "Type not specified";

      // Extract features
      const features = [];

      // Process full description to extract features
      const descriptionParts = description.split(".");

      // Skip first part (contains price info) and extract keywords from others
      for (let j = 1; j < descriptionParts.length; j++) {
        const part = descriptionParts[j].trim();
        if (part) {
          features.push(part);
        }
      }

      result.items.push({
        number: parseInt(number),
        name: name.trim(),
        price,
        type,
        features:
          features.length > 0 ? features : ["No specific features mentioned"],
      });
    }
  }

  return result;
}

const DefibrillatorComparison = ({ responseText }) => {
  const [parsedData, setParsedData] = useState({ items: [], disclaimer: "" });

  useEffect(() => {
    if (responseText) {
      const data = parseDefibrillatorData(responseText);
      setParsedData(data);
    }
  }, [responseText]);

  // Function to extract key features in a more concise format
  const extractKeyFeatures = (featureText) => {
    if (!featureText) return [];

    const text = featureText.toLowerCase();
    const keyFeatures = [];

    if (text.includes("lightweight")) keyFeatures.push("Lightweight");
    if (text.includes("portable")) keyFeatures.push("Portable");
    if (text.includes("user-friendly")) keyFeatures.push("User-friendly");
    if (text.includes("voice prompts")) keyFeatures.push("Voice prompts");
    if (text.includes("reliability")) keyFeatures.push("Reliable");
    if (text.includes("ease of use")) keyFeatures.push("Easy to use");
    if (text.includes("professional")) keyFeatures.push("Professional grade");

    // If we didn't find any specific keywords, return the original feature
    return keyFeatures.length > 0 ? keyFeatures : [featureText];
  };

  // Check if we have valid defibrillator data to show
  const hasValidData =
    parsedData.items.length > 0 &&
    parsedData.items.some(
      (item) =>
        item.name.includes("defibrillator") ||
        item.name.includes("AED") ||
        item.type.includes("Automatic")
    );

  if (!hasValidData) {
    return null; // Don't render anything if there's no valid defibrillator data
  }

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold text-center mb-4">
        Most Affordable Defibrillators
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {parsedData.items.map((device) => (
          <div
            key={device.number}
            className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            <div className="p-2 bg-blue-600 text-white font-semibold text-center">
              #{device.number} Ranked by Price
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold mb-1">{device.name}</h3>
              <div className="mb-3">
                <span className="text-xl font-bold text-blue-600">
                  {device.price}
                </span>
              </div>
              <div className="mb-2">
                <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  {device.type}
                </span>
              </div>
              <div className="mt-3">
                <h4 className="font-semibold mb-1">Key Features:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {device.features.flatMap((feature) =>
                    extractKeyFeatures(feature).map((keyFeature, idx) => (
                      <li
                        key={`${device.number}-${idx}`}
                        className="text-sm text-gray-600"
                      >
                        {keyFeature}
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {parsedData.disclaimer && (
        <p className="text-sm text-gray-500 mt-4 text-center">
          {parsedData.disclaimer}
        </p>
      )}
    </div>
  );
};

export default DefibrillatorComparison;
