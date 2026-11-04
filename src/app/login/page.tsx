"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";
export default function Login() {
  const router = useRouter(),
    params = useSearchParams();
  const [busy, B] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    B(true);
    const f = new FormData(e.currentTarget);
    const r = await signIn.email({
      email: String(f.get("email")),
      password: String(f.get("password")),
    });
    B(false);
    if (r.error) return toast.error(r.error.message || "Login failed");
    toast.success("Welcome back!");
    router.push(params.get("callbackUrl") || "/");
  }
  return (
    <div className="auth">
      <small className="kicker">WELCOME BACK, READER</small>
      <h1>
        Log in to <i>BookNote.</i>
      </h1>
      <form className="form" onSubmit={submit}>
        <label>
          Email
          <input name="email" type="email" required />
        </label>
        <label>
          Password
          <input name="password" type="password" required />
        </label>
        <p className="hint">
          Forgot password? Contact support. Password reset is not enabled for
          this assignment.
        </p>
        <button className="btn" disabled={busy}>
          {busy ? "Logging in…" : "Log in"}
        </button>
      </form>
      <button
        className="google"
        onClick={() => signIn.social({ provider: "google", callbackURL: "/" })}
      >
        Continue with Google
      </button>
      <p>
        New here? <Link href="/register">Create an account</Link>
      </p>
    </div>
  );
}
