"use client"; // ✅ Make this a Client Component

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import Spinner from "@/components/spinner";

export default function LoginPage() {
  return (
    <Suspense fallback={<Spinner />}> 
      <LoginContent />
    </Suspense>
  );
}

// ✅ Move the main logic inside a separate component wrapped in Suspense
function LoginContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Get callback URL or default to dashboard
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const result = await signIn("google", { callbackUrl });

    if (result?.error) {
      toast.error(result.error);
      setLoading(false);
    }
  };

  const handleEmailSignIn = async () => {
    setLoading(true);
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      toast.error(result.error);
      setLoading(false);
    } else {
      toast.success("Signed in successfully!");
      router.push(callbackUrl);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-center">Welcome back</h1>

        {/* Social Sign-In */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="flex-1 border py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100"
            disabled={loading}
          >
            <Image src="/search.png" alt="Google" className="h-5 w-5" width={5} height={5} unoptimized />
            Log in with Google
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t"></div>
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="flex-1 border-t"></div>
        </div>

        {/* Email & Password Login */}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border px-4 py-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue outline-none "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="block text-sm font-medium mt-3">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full border px-4 py-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue outline-none "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex justify-between items-center mt-2">
            <label className="flex items-center text-sm">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <Link href="/auth/forgot-password" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            onClick={handleEmailSignIn}
            className="w-full mt-4 bg-blue text-white py-2 rounded-lg text-md font-semibold hover:bg-blue transition"
            disabled={loading}
          >
            {loading ? <Spinner/> : "Login"}
          </button>

          {/* Register Link */}
          <p className="text-sm text-center mt-4">
            Don’t have an account yet?{" "}
            <Link href="/auth/register" className="text-blue-500 font-semibold hover:underline">
              Registration here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
