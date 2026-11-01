import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-indigo-600">
        BookNook 📚
      </Link>
      <div className="flex gap-4 items-center">
        <Link href="/" className="text-slate-600 hover:text-indigo-600 font-medium">
          Home
        </Link>
        <Link href="/login" className="text-slate-600 hover:text-indigo-600 font-medium">
          Login
        </Link>
        <Link href="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
