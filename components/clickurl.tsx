"use client";

import React, { useEffect, useState } from "react";

export default function ClickUrl({ url }: { url: string }) {
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin); // ✅ Get only the base domain
    }
  }, []);

  return (
    <a href={`${baseUrl}/go/${url}`} target="_blank" className="text-blue-500 hover:underline">
      {baseUrl}/go/{url}
    </a>
  );
}

 
