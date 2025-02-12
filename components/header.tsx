"use client";

import React, { useEffect, useState } from "react";
import LinkShortener from "./ShortBox";
import LinkLogo from "./icons/linklogo";
import { useRouter } from "next/navigation";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleHomeClick = () => {
    if (window.location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" }); // ✅ Scroll smoothly
    } else {
      router.push("/");
    }
  };

  return (
    <header>
      <div
        className={`${
          isScrolled ? "bg-white shadow" : "bg-blue"
        } fixed top-0 left-0 w-full py-3 z-50 transition-all duration-300`}
      >
        <div className="max-w-[1064px] mx-auto flex items-center justify-between">
          <h2
            onClick={handleHomeClick}
            className={`cursor-pointer text-3xl font-bold ${
              isScrolled ? "text-colorDark" : "text-white"
            } flex items-center gap-1`}
          >
            <LinkLogo size={35} /> GoLink
          </h2>

          <div className="flex items-center justify-start gap-2.5">
            <button
              className={`text-lg font-semibold hover:bg-gray-700 px-4 py-1 rounded-lg border-[2px] border-blue ${
                isScrolled ? "text-white bg-blue" : "text-white"
              } `}
            >
              Log in
            </button>
            <button
              className={` text-lg font-semibold text-colorDark bg-white px-4 py-1 rounded-lg hover:bg-sky transition-all ease-in-out duration-300 border-[2px] border-blue`}
            >
              Sign up free
            </button>
          </div>
        </div>
      </div>
      <div className="bg-blue h-[850px] shadow-xl mt-10">
        <h2 className="pt-28 text-center text-5xl font-bold text-white">
          Build stronger digital connections{" "}
        </h2>
        <p className="mt-4 text-center w-[80%] mb-9 mx-auto text-xl text-white">
          Use our URL shortener, QR Codes, and landing pages to engage your
          audience and connect them to the right information. Build, edit, and
          track everything inside the Bitly Connections Platform.
        </p>

        <LinkShortener />
      </div>
    </header>
  );
}

export default Header;
