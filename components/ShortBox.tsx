"use client";

import { useEffect, useState } from "react";
import Link from "./icons/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Spinner from "./spinner";
import { IUser } from "@/types/user";
import { signIn } from "next-auth/react";

export default function LinkShortener({ user }: { user: IUser | undefined }) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [shortenCode, setShortenCode] = useState("");
  const [origin, setOrigin] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ✅ Get `window.location.origin` only on the client
  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  // ✅ Restore link data if available (after login)
  useEffect(() => {
    const savedLink = sessionStorage.getItem("pendingLink");
    if (savedLink && user) {
      const { url, title, shortenCode } = JSON.parse(savedLink);
      sessionStorage.removeItem("pendingLink"); // Clear after use
      submitLink(url, title, shortenCode);
    }
  }, [user]); // Runs when session updates (after login)

  // ✅ Function to validate URL
  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  // ✅ Function to submit the URL and generate a short link
  const handleSubmit = async () => {
    if (!url.trim() || !shortenCode.trim()) {
      toast.error("Please fill in both fields.");
      return;
    }

    if (!isValidUrl(url)) {
      toast.error("Invalid URL format. Please enter a valid URL.");
      return;
    }

    // ✅ If user is not logged in, store data and redirect to login
    if (!user && !user) {
      sessionStorage.setItem(
        "pendingLink",
        JSON.stringify({ url, title, shortenCode })
      );
      toast.error("You need to log in to shorten links.");
      await signIn(undefined, { callbackUrl: window.location.href });
      return;
    }

    // ✅ If user is authenticated, submit link
    submitLink(url, title, shortenCode);
  };

  // ✅ Function to create the short link
  const submitLink = async (
    destination: string,
    linkTitle: string,
    code: string
  ) => {
    setLoading(true);

    try {
      const response = await fetch("/api/go", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination,
          createdBy: user?.id,
          title:
            linkTitle.trim() ||
            new URL(destination).hostname.replace("www.", ""),
          shortUrl: code,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error.includes("shortUrl already exists")) {
          toast.error("This short URL is already taken. Try another one.");
        } else {
          toast.error(data.error || "Failed to shorten the link.");
        }
        return;
      }

      toast.success("Short link created successfully! 🎉");

      setTimeout(() => {
        router.push(`/dashboard/links/${data?.newLink?.id}`);
      }, 100);
    } catch (err: unknown) {
      toast.error(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
    } finally {
      setLoading(false);
      setUrl(""); // Clear input after submission
      setShortenCode("");
      setTitle("");
    }
  };

  return (
    <div className="flex flex-col items-center bg-background-blue px-4">
      {/* Tab Selection */}
      <div className="flex bg-white rounded-full p-1 shadow-md">
        <button className="flex items-center gap-2 px-5 py-2 text-lg font-semibold rounded-full transition-all ease-in-out duration-300 bg-blue text-white">
          <Link size={18} />
          Short link
        </button>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-[36px] shadow p-6 mt-8 max-w-3xl w-full">
        <h2 className="text-3xl font-bold text-color-dark">Create your link</h2>

        <div className="mt-6">
          {/* Destination URL Input */}
          <label className="text-sm font-semibold text-color-dark">
            Paste your long link here
          </label>
          <input
            type="text"
            placeholder="https://example.com/my-long-url"
            className="w-full mt-1 px-4 py-3 border rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <div className="mt-4">
            {/* Short key Input */}
            <label className="text-sm font-semibold text-color-dark">
              Shorten text
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                disabled
                value={`${origin}/`}
                className="px-4 py-3 border rounded-lg bg-gray-100 text-gray-400 mt-1"
              />
              <input
                type="text"
                placeholder="some-text"
                className="w-full mt-1 px-4 py-3 border rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue"
                value={shortenCode}
                onChange={(e) => setShortenCode(e.target.value)}
              />
            </div>
          </div>

          {/* Title Input (Optional) */}
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-semibold">
              Title <span className="text-gray-400">(Optional)</span>
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title (optional)"
              className="w-full mt-2 px-4 py-3 border rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue"
            />
          </div>

          {/* Submit Button */}
          <button
            disabled={loading}
            onClick={handleSubmit}
            className="w-full mt-4 bg-blue text-white py-3 rounded-lg text-base font-semibold hover:bg-opacity-90 transition"
          >
            {loading ? <Spinner /> : "Generate Url →"}
          </button>
        </div>
      </div>
    </div>
  );
}
