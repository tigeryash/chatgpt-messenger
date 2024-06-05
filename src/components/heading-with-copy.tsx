import React, { useState } from "react";

const HeadingWithCopy = ({ children }: { children: React.ReactNode }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  };

  return (
    <div className="flex justify-between items-center bg-gray-200 p-2 rounded">
      <h1 className="text-lg font-bold">{children}</h1>
      <button
        onClick={handleCopy}
        className="px-2 py-1 bg-blue-500 text-white rounded"
        aria-label="Copy heading text"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
};

export default HeadingWithCopy;
