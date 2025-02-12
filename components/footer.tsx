import React from "react";
import Facebook from "./icons/facebook";
import Instagram from "./icons/instagram";
import Linkedin from "./icons/linkedin";
// Icons for social media

export default function Footer() {
  return (
    <footer className="bg-background-blue text-white py-6 mt-10">
      <div className="max-w-[1064px] mx-auto flex flex-col items-center text-center">
        {/* Divider Line */}
        <div className="w-full border-t border-gray-600 mb-4"></div>

        {/* Logo & Copyright Text */}
        <div className="flex flex-col items-center">
          <h2 className="text-4xl font-bold text-orange-500">GoLink</h2>
          <p className="mt-2 text-sm text-gray-400">
            © {new Date().getFullYear()} GoLink | Handmade in New York City,
            Denver, Berlin, and all over the world.
          </p>
        </div>

        {/* Social Media Icons */}
        <div className="flex gap-4 mt-4">
          <a
            href="#"
            className="p-2  text-white rounded-full bg-gray-800 hover:bg-gray-700 transition"
          >
            <Facebook size={20} />
          </a>
          <a
            href="#"
            className="p-2 text-white rounded-full bg-gray-800 hover:bg-gray-700 transition"
          >
            <Instagram size={20} />
          </a>
          <a
            href="#"
            className="p-2 text-white rounded-full bg-gray-800 hover:bg-gray-700 transition"
          >
            <Linkedin size={20}  />
          </a>
        </div>
      </div>
    </footer>
  );
}
