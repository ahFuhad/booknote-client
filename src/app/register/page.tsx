"use client";

import { useState, FormEvent } from "react";
import { signUp, signIn } from "@/lab/auth-client"; 
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const isValidLength = password.length >= 6;

    if (!hasUppercase || !hasLowercase || !isValidLength) {
      toast.error("Password must contain at least 1 uppercase letter, 1 lowercase letter, and be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      await signUp.email(
        {
          email,
          password,
          name,
          image: image || "https://i.ibb.co/5GzXkwq/user.png",
        },
        {
          onSuccess: () => {
            toast.success("Registration successful!");
            router.push("/");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "Failed to register account.");
          },
        }
      );
    } catch {
      toast.error("An unexpected error occurred during registration.");
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
    <div className="flex min-h-[85vh] items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create a BookNook Account</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input 
              type="text" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="John Doe"
            />
          </div>

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
            <label className="block text-sm font-medium text-gray-700">Photo URL (Imgbb / Postimage)</label>
            <input 
              type="url" 
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="https://i.ibb.co/... (optional)"
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
              placeholder="At least 6 chars, 1 uppercase, 1 lowercase"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="mt-4">
          <button 
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 flex items-center justify-center space-x-2"
          >
            <span>Sign up with Google</span>
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account? <Link href="/login" className="text-indigo-600 font-medium hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}