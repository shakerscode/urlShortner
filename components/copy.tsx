"use client";

import React from "react";
import { Copy } from "lucide-react";
import toast from "react-hot-toast"; // ✅ Import Toast

function CopyBtn({ url }: { url: string }) {
  const handleCopy = () => {
    const textToCopy = `${window.location.origin}/${url}`;
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        toast.success("Link copied to clipboard!"); // ✅ Show success toast
      })
      .catch(() => {
        toast.error("Failed to copy link!"); // ✅ Show error toast if copying fails
      });
  };

  return (
    <button
      onClick={handleCopy}
      className="p-2 rounded bg-gray-200 hover:bg-gray-300"
    >
      <Copy size={14} />
    </button>
  );
}

export default CopyBtn;
