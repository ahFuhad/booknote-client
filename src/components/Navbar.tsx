"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Books", href: "/books" },
    { name: "Add Book", href: "/add-book" },
    { name: "My Borrows", href: "/my-borrows" },
  ];

  return (
    <nav className="bg-white border-b sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-indigo-600 tracking-tight">
          Book<span className="text-gray-800">Nook</span>
        </Link>

        {/* Links */}
        <div className="flex items-center space-x-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition ${
                  isActive ? "text-indigo-600 font-semibold" : "text-gray-600 hover:text-indigo-600"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-3">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}
