"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      setError("An error occurred during login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#DEFF80]">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#2D1B69]">Welcome Back</h2>
            <p className="mt-2 text-[#2D1B69]/70">Sign in to your account</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#2D1B69]"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 text-gray-800 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4A3AFF] focus:border-transparent transition-all"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#2D1B69]"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 text-gray-800 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4A3AFF] focus:border-transparent transition-all"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-[#4A3AFF] text-white py-3 px-4 rounded-lg hover:bg-[#8257FF] transition-all duration-200 font-medium"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="text-center">
            <Link
              href="/auth/register"
              className="text-[#4A3AFF] hover:text-[#8257FF] text-sm font-medium"
            >
              Don&apos;t have an account? Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
