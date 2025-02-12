/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import Link from "./icons/link";
import QRCode from "./icons/qrcode";
import Tick from "./icons/tick";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LinkShortener() {
  const [activeTab, setActiveTab] = useState<"short" | "qr">("short");
  const [url, setUrl] = useState("");
  const router = useRouter();

  const [shortLink, setShortLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ Function to submit the URL and generate a short link
  const handleSubmit = async () => {
    if (!url.trim()) {
      toast.error("Please enter a valid URL.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/go", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destination: url, createdBy: "guest" }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to shorten the link.");
      }

      setShortLink(`${window.location.origin}/go/${data.shortUrl}`);
      setUrl("");

      toast.success("Short link created successfully! 🎉");

      //Waiting some time to go next page
      setTimeout(() => {
        router.push("/dashboard/links");
      }, 1000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center bg-background-blue min-h-screen py-5s md:py-10 px-4">
      {/* Tab Selection */}
      <div className="flex bg-white rounded-full p-1 shadow-md">
        <button
          className={`flex items-center gap-2 px-5 py-2 text-lg font-semibold rounded-full transition-all ease-in-out duration-300 ${
            activeTab === "short" ? "bg-blue text-white" : "text-gray-700"
          }`}
          onClick={() => setActiveTab("short")}
        >
          <Link size={18} />
          Short link
        </button>
        <button
          className={`flex items-center gap-2 px-5 py-2 text-lg font-semibold rounded-full transition-all ease-in-out duration-300 ${
            activeTab === "qr" ? "bg-blue text-white" : "text-gray-700"
          }`}
          onClick={() => setActiveTab("qr")}
        >
          <QRCode size={18} />
          QR Code
        </button>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-[36px] shadow p-6 mt-8 max-w-3xl w-full">
        <h2 className="text-3xl font-bold text-color-dark">
          Shorten a long link
        </h2>
        <p className="text-gray-500 mt-2">No credit card required.</p>

        <div className="mt-6">
          <label className="text-lg font-semibold text-color-dark">
            Paste your long link here
          </label>
          <input
            type="text"
            placeholder="https://example.com/my-long-url"
            className="w-full mt-2 px-4 py-3 border rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          {activeTab === "qr" && (
            <p className="text-sm font-normal mt-4 text-red-500">
              {"QR code is not available right now!"}
            </p>
          )}
          <button
            disabled={activeTab === "qr" || loading}
            onClick={handleSubmit}
            className="w-full mt-4 bg-blue text-white py-3 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition"
          >
            {loading ? "Generating..." : "Get your link for free →"}
          </button>
        </div>
      </div>

      {/* Subscription Section */}
      <div className="mt-10 text-white text-center">
        <p className="text-lg font-semibold">
          Sign up for free. Your free plan includes:
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-6 mt-3 text-sm ">
          <span className="flex items-center gap-2">
            {" "}
            <Tick size={16} /> 5 short links/month
          </span>
          <span className="flex items-center gap-2">
            {" "}
            <Tick size={16} /> 3 custom back-halves/month
          </span>
          <span className="flex items-center gap-2">
            {" "}
            <Tick size={16} /> Unlimited link clicks
          </span>
        </div>
      </div>
    </div>
  );
}
