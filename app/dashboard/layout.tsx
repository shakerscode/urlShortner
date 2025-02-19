"use client";

import { usePathname, useRouter } from "next/navigation";
import { Home, Link, Menu, X } from "lucide-react";
import LinkLogo from "@/components/icons/linklogo";
import UserDropdown from "@/components/userdropdown";
import { useState, useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isOpen &&
        event.target instanceof HTMLElement &&
        !event.target.closest("#sidebar")
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isOpen]);

  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar (Drawer on Mobile) */}
      <aside
        id="sidebar"
        className={`fixed z-20 top-0 left-0 h-screen w-64 bg-white p-5 shadow-lg transform transition-transform duration-300 ease-in-out
          ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:relative`}
      >
        <div className="flex justify-between items-center">
          <h2
            onClick={() => router.push("/")}
            className="text-3xl cursor-pointer flex items-center gap-1 font-bold text-blue"
          >
            <LinkLogo size={34} />
            GoLink
          </h2>
          <button
            className="md:hidden text-gray-600 hover:text-gray-900"
            onClick={() => setIsOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <button
          onClick={() => router.push("/dashboard/create")}
          className="bg-blue px-4 py-2 text-sm font-semibold hover:bg-gray-800 transition-all ease-in-out duration-300 mt-4 rounded-lg text-white w-full"
        >
          Create Link
        </button>

        <nav className="mt-6 space-y-2">
          <button
            onClick={() => {
              router.push("/dashboard");
              setIsOpen(false);
            }}
            className={`flex items-center font-medium gap-3 w-full px-4 py-2 rounded-lg transition-all ${
              pathname === "/dashboard"
                ? "bg-blue200 text-blue"
                : "hover:bg-blue200"
            }`}
          >
            <Home size={20} /> Home
          </button>
          <button
            onClick={() => {
              router.push("/dashboard/links");
              setIsOpen(false);
            }}
            className={`flex items-center font-medium gap-3 w-full px-4 py-2 rounded-lg transition-all ${
              pathname.includes("/links")
                ? "bg-blue200 text-blue"
                : "hover:bg-blue200"
            }`}
          >
            <Link size={20} /> Links
          </button>
        </nav>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col md:ml-0">
        {/* Fixed Header */}
        <header className="bg-white shadow flex justify-between md:justify-end items-center px-6 py-4 fixed top-0 left-0 md:left-64 right-0 z-0">
          {/* Open Sidebar Button (Mobile) */}
          <button
            className="md:hidden text-gray-600 hover:text-gray-900"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push("/dashboard/create")}
              className="bg-blue px-4 py-2 text-sm font-semibold hover:bg-gray-800 transition-all ease-in-out duration-300 rounded-lg text-white"
            >
              Create Link
            </button>
            <UserDropdown />
          </div>
        </header>

        {/* Main Content (Scrollable) */}
        <main className="flex-1 p-6 mt-16 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
