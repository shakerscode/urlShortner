/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { CheckCircle, ChevronRight } from "lucide-react";
import Image from "next/image";

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

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 max-w-4xl mx-auto">
        <FeatureCard title="Make it short" buttonText="Go to links">
          <Image
            src="/short-link.svg"
            alt="Short Link"
            width={100}
            height={40}
          />
        </FeatureCard>
        <FeatureCard title="Make it scannable" buttonText="Go to Codes">
          <Image src="/qr-code.svg" alt="QR Code" width={100} height={40} />
        </FeatureCard>
        <FeatureCard title="Make a page" buttonText="Go to Pages">
          <Image
            src="/page-builder.svg"
            alt="Page Builder"
            width={100}
            height={40}
          />
        </FeatureCard>
      </div>

      {/* Getting Started Section */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow max-w-3xl mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Getting started with Bitly
          </h2>
          <div className="flex items-center">
            <span className="text-gray-700 text-sm">{progress}%</span>
            <div className="w-6 h-6 ml-2 border-2 border-blue-600 rounded-full flex items-center justify-center">
              <ChevronRight size={14} className="text-blue-600" />
            </div>
          </div>
        </div>
        <ChecklistItem title="Make a Bitly Link or Code." completed>
          <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
            Create a link
          </button>
          <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm ml-2">
            Create a QR Code
          </button>
        </ChecklistItem>
        <ChecklistItem title="Click it, scan it, or share it." completed>
          <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
            View your links
          </button>
          <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm ml-2">
            View your QR Codes
          </button>
        </ChecklistItem>
        <ChecklistItem title="Check out Bitly Analytics.">
          <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm">
            View Analytics
          </button>
        </ChecklistItem>
        <ChecklistItem title="Connect your apps with Bitly.">
          <p className="text-gray-600 text-sm mt-1">
            Find the tools that Bitly integrates with and learn about use cases.
          </p>
        </ChecklistItem>
      </div>
    </div>
  );
}

/* Feature Card Component */
function FeatureCard({
  title,
  buttonText,
  children,
}: {
  title: string;
  buttonText: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white p-4 rounded-lg shadow text-center flex flex-col items-center">
      {children}
      <h3 className="mt-2 text-lg font-semibold text-gray-900">{title}</h3>
      <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded text-sm">
        {buttonText}
      </button>
    </div>
  );
}

/* Checklist Item Component */
function ChecklistItem({
  title,
  completed,
  children,
}: {
  title: string;
  completed?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-start mt-4">
      {completed ? (
        <CheckCircle size={20} className="text-green-500 mt-1" />
      ) : (
        <div className="w-5 h-5 border border-gray-400 rounded-full mt-1"></div>
      )}
      <div className="ml-3">
        <p className={`text-gray-800 ${completed ? "font-semibold" : ""}`}>
          {title}
        </p>
        {children}
      </div>
    </div>
  );
}
