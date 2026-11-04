"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signUp, signIn } from "@/lib/auth-client";
import { toast } from "sonner";
export default function Register() {
  const router = useRouter();
  const [busy, B] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget),
      password = String(f.get("password"));
    if (
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      password.length < 6
    )
      return toast.error(
        "Password needs uppercase, lowercase, and at least 6 characters.",
      );
    B(true);
    const r = await signUp.email({
      name: String(f.get("name")),
      email: String(f.get("email")),
      password,
      image: String(f.get("photo")) || undefined,
    });
    B(false);
    if (r.error) return toast.error(r.error.message || "Registration failed");
    toast.success("Account created. Please log in.");
    router.push("/login");
  }
  return (
    <div className="auth">
      <small className="kicker">A NEW CHAPTER</small>
      <h1>
        Create your <i>account.</i>
      </h1>
      <form className="form" onSubmit={submit}>
        <label>
          Name
          <input name="name" required />
        </label>
        <label>
          Email
          <input name="email" type="email" required />
        </label>
        <label>
          Photo URL
          <input name="photo" type="url" />
        </label>
        <label>
          Password
          <input name="password" type="password" minLength={6} required />
        </label>
        <button className="btn" disabled={busy}>
          {busy ? "Creating…" : "Register"}
        </button>
      </form>
      <button
        className="google"
        onClick={() => signIn.social({ provider: "google", callbackURL: "/" })}
      >
        Sign up with Google
      </button>
      <p>
        Already registered? <Link href="/login">Log in</Link>
      </p>
    </div>
  );
}
