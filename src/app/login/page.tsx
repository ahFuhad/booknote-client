"use client";

import { useState, FormEvent } from "react";
import { signIn } from "@/lab/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signIn.email(
        {
          email,
          password,
        },
        {
          onSuccess: () => {
            toast.success("Logged in successfully!");
            router.push("/");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "Invalid email or password");
          },
        }
      );
    } catch {
      toast.error("An unexpected error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to BookNook</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="user@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="••••••••"
            />
          </div>

          <div className="text-right">
            <a href="#" className="text-xs text-indigo-600 hover:underline">Forgot password?</a>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4">
          <button 
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 flex items-center justify-center space-x-2"
          >
            <span>Sign in with Google</span>
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account? <Link href="/register" className="text-indigo-600 font-medium hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}