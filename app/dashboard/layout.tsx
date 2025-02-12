"use client";

import {
  Home,
  Link,
  QrCode,
  BarChart,
  Settings,
  Globe,
  Layers,
} from "lucide-react";
import LinkLogo from "@/components/icons/linklogo";
import { usePathname, useRouter } from "next/navigation";
export const experimental_ppr = true;


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
 

  const menuItems = [
    { name: "Home", icon: <Home size={20} />, to: "/dashboard" },
    { name: "Links", icon: <Link size={20} />, to: "/dashboard/links" },
    { name: "QR Codes", icon: <QrCode size={20} />, to: "/dashboard/" },
    { name: "Analytics", icon: <BarChart size={20} />, to: "/dashboard/" },
    { name: "Campaigns", icon: <Layers size={20} />, to: "/dashboard/" },
    { name: "Custom domains", icon: <Globe size={20} />, to: "/dashboard/" },
    { name: "Settings", icon: <Settings size={20} />, to: "/dashboard/" },
  ];

  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white flex flex-col p-5 fixed left-0 top-0 h-screen shadow-lg">
        <h2  onClick={() => router.push("/")} className="text-3xl cursor-pointer flex items-center justify-center gap-1 font-bold text-blue text-center">
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
          {menuItems.map((item, i) => (
            <button
              key={i}
              onClick={() => router.push(item.to)}
              className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition-all ${
                pathname === item.to ? "bg-blue200" : "hover:bg-blue200"
              }`}
            >
              {item.icon} {item.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Wrapper (Adjust for Sidebar) */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Fixed Header */}
        <header className="bg-white shadow flex justify-between items-center px-6 py-4 fixed top-0 left-64 right-0 z-10">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded-lg px-4 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue"
          />
          <div className="flex items-center gap-4">
            <button className="bg-teal-500 text-white px-4 py-2 rounded-lg">
              Upgrade
            </button>
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center font-semibold">
              S
            </div>
          </div>
        </header>

        {/* Main Content (Scrollable) */}
        <main className="flex-1 p-6 mt-16 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
