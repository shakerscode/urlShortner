"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { ChevronDown, ChevronUp, LogOut } from "lucide-react";
import Image from "next/image";

export default function UserDropdown() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  if (!session?.user) return null;

  return (
    <div className="relative">
      {/* Avatar Button */}
      <button
        className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-white border shadow-sm hover:bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Avatar image={session.user.image} name={session.user.name} /> 
       {isOpen?<ChevronUp className="w-5 h-5 text-gray-500"/> : <ChevronDown className="w-5 h-5 text-gray-500" />}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-50">
          <div className="p-4 border-b">
            <p className="font-semibold text-gray-900">{session.user.name}</p>
            <p className="text-sm text-gray-600">{session.user.email}</p>
          </div>
          <div className="p-4">
            <button
              className="w-full flex items-center gap-2 text-red-600 hover:text-red-800 font-medium"
              onClick={() => signOut()}
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* Custom Avatar Component */
function Avatar({
  image,
  name,
}: {
  image?: string | null;
  name?: string | null;
}) {
  const initials = name ? name.charAt(0).toUpperCase() : "U";

  return image ? (
    <Image
      src={image}
      alt={name || "User"}
      className="w-8 h-8 rounded-full object-cover"
      width={8}
      height={8}
      unoptimized
    />
  ) : (
    <div className="w-8 h-8 flex items-center justify-center bg-gray-300 text-gray-700 font-semibold rounded-full">
      {initials}
    </div>
  );
}
