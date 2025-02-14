"use client";

import { usePathname, useRouter } from "next/navigation";
import { Home, Link } from "lucide-react";
import LinkLogo from "@/components/icons/linklogo";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname(); // ✅ Automatically updates when navigating

  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white flex flex-col p-5 fixed left-0 top-0 h-screen shadow-lg">
        <h2
          onClick={() => router.push("/")}
          className="text-3xl cursor-pointer flex items-center justify-center gap-1 font-bold text-blue text-center"
        >
          <LinkLogo size={34} />
          GoLink
        </h2>
        <button
          onClick={() => router.push("/dashboard/create")}
          className="bg-blue px-4 py-2 font-semibold hover:bg-gray-800 transition-all ease-in-out duration-300 mt-4 rounded-lg text-white"
        >
          Create Link
        </button>
        <nav className="mt-6 space-y-2">
          <button
            onClick={() => router.push("/dashboard")}
            className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition-all ${
              pathname === "/dashboard"
                ? "bg-blue200 text-blue"
                : "hover:bg-blue200"
            }`}
          >
            <Home size={20} /> Home
          </button>
          <button
            onClick={() => router.push("/dashboard/links")}
            className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition-all ${
              pathname.includes("/links")
                ? "bg-blue200 text-blue"
                : "hover:bg-blue200"
            }`}
          >
            <Link size={20} /> Links
          </button>
        </nav>
      </aside>

      {/* Main Content Wrapper (Adjust for Sidebar) */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Fixed Header */}
        <header className="bg-white shadow flex justify-between items-center px-6 py-4 fixed top-0 left-64 right-0 z-10">
          <div></div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center font-semibold">
              S
            </div>
          </div>
        </header>

        {/* Main Content (Scrollable) */}
        <main className="flex-1 p-6 mt-16 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
