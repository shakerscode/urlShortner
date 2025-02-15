"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import Spinner from "@/components/spinner";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ✅ Validate Email Format
  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // ✅ Handle Google Signup
  const handleGoogleSignUp = async () => {
    setLoading(true);
    const result = await signIn("google", { callbackUrl: "/" });

    if (result?.error) {
      toast.error(result.error);
      setLoading(false);
    }
  };

  // ✅ Handle Manual Registration
  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      toast.error("All fields are required!");
      return;
    }
  
    if (!isValidEmail(email)) {
      toast.error("Invalid email format. Please enter a valid email.");
      return;
    }
  
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Registration failed.");
      }
  
      // ✅ Automatically log in the user after registration
      const signInResult = await signIn("credentials", {
        email,
        password,
        redirect: false, // Prevent automatic redirect by NextAuth
      });
  
      if (signInResult?.error) {
        throw new Error(signInResult.error);
      }
  
      toast.success("Account created successfully!");
      router.push("/"); // ✅ Redirect to Dashboard
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-center">Create an account</h1>

        {/* Google Sign Up */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={handleGoogleSignUp}
            className="flex-1 border py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100"
            disabled={loading}
          >
            <Image
              src="/search.png"
              alt="Google"
              className="h-5 w-5"
              unoptimized
              width={20}
              height={20}
            />
            Sign up with Google
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t"></div>
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="flex-1 border-t"></div>
        </div>

        {/* Manual Signup */}
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full border px-4 py-2 rounded mt-1  text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue outline-none "
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="block text-sm font-medium mt-3">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border px-4 py-2 rounded mt-1  text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue outline-none "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {!isValidEmail(email) && email.length > 0 && (
            <p className="text-red-500 text-sm mt-1">Please enter a valid email.</p>
          )}

          <label className="block text-sm font-medium mt-3">Password</label>
          <input
            type="password"
            placeholder="Create a password"
            className="w-full border px-4 py-2 rounded mt-1  text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue outline-none "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label className="block text-sm font-medium mt-3">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            className="w-full border px-4 py-2 rounded mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue outline-none "
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {password !== confirmPassword && confirmPassword.length > 0 && (
            <p className="text-red-500 text-sm mt-1">Passwords do not match.</p>
          )}

          <button
            onClick={handleRegister}
            className="w-full mt-4 bg-blue text-white py-2 rounded-lg text-md font-semibold hover:bg-blue transition"
            disabled={loading}
          >
            {loading ? <Spinner /> : "Register"}
          </button>

          {/* Redirect to Login */}
          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-blue-500 font-semibold hover:underline"
            >
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
