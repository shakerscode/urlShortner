"use client";

import React, { useEffect, useState } from "react";
import LinkShortener from "./ShortBox";
import LinkLogo from "./icons/linklogo";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IUser } from "@/types/user";
import LogoutButton from "./logoutbtn";

function Header({ user }: { user: IUser }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  // UseEffect to handle smooth header transition
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

  // An handler that prevent users not to go any other section, determine to go only home page top part. This is a minor issue that occurs sometime when to try to come home page it navigate use to the middle of the home page.
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
        <div className="max-w-[1064px] mx-auto flex items-center justify-between px-4 md:px-0">
          {/* Logo Section - We can add image here later if we want  */}
          <h2
            onClick={handleHomeClick}
            className={`cursor-pointer text-xl md:text-3xl font-bold ${
              isScrolled ? "text-colorDark" : "text-white"
            } flex items-center gap-1`}
          >
            <LinkLogo size={35} /> GoLink
          </h2>

          {/* Nav action section  */}
          <nav className="flex items-center gap-2">
            {user ? (
              // ✅ Show Dashboard and Logout if user is logged in
              <>
                <Link
                  href="/dashboard"
                  className="bg-blue text-white px-4 py-2 rounded-lg hover:bg-gray-600 text-base font-semibold transition-all ease-in-out duration-300"
                >
                  Dashboard
                </Link>
                <LogoutButton />
              </>
            ) : (
              // ✅ Show Login and Register if user is not logged in
              <>
                <Link
                  href="/auth/login"
                  className="bg-blue text-white px-4 py-2 rounded-lg hover:bg-gray-600 text-base font-semibold transition-all ease-in-out duration-300"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="text-blue bg-white px-4 py-2 rounded-lg hover:bg-blue200 font-semibold text-base transition-all ease-in-out duration-300"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Header hero part - For the background accurately set in header and hero section  */}
      <div className="bg-blue h-[950px] md:h-[900px] shadow-xl mt-6 md:mt-10">
        <h2 className="pt-24 md:pt-28 text-center md:max-w-[70%] w-full px-2.5 mx-auto text-4xl md:text-5xl font-bold text-white">
          The Bottlenecks GoLinks: Build stronger digital connections
        </h2>
        <p className="mt-4 text-center w-[80%] mb-9 mx-auto text-md md:text-xl text-white">
          Use The Bottlenecks URL shortener to connect people to the right
          information
        </p>

        <LinkShortener user={user} />
      </div>
    </header>
  );
}

export default Header;
