/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { CheckCircle, ChevronRight, Link2, Link2Off } from "lucide-react";
import Link from "next/link";
export default function ConnectionsPlatform() {
  const [progress, setProgress] = useState(50); // Simulated progress

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Header Section */}
      <h1 className="text-3xl font-bold text-gray-900 text-start">
        Your Connections Platform
      </h1>
      <p className="text-center mt-1 text-sm bg-blue-100 text-blue-600 px-0 py-2 rounded-md inline-block mx-auto">
        Get custom links and a complimentary domain.{" "}
        <a href="#" className="font-semibold underline">
          Upgrade now
        </a>
      </p>
    </div>
  );
}
