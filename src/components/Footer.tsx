import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <div>
          <span className="text-xl font-bold text-white tracking-tight">
            Book<span className="text-indigo-400">Nook</span>
          </span>
          <p className="text-xs text-gray-500 mt-1">
            © {new Date().getFullYear()} BookNook Library Management. All rights
            reserved.
          </p>
        </div>

        <div className="flex space-x-6 text-sm">
          <Link href="/" className="hover:text-white transition">
            Home
          </Link>
          <Link href="/books" className="hover:text-white transition">
            All Books
          </Link>
          <Link href="/my-borrows" className="hover:text-white transition">
            My Borrows
          </Link>
        </div>
      </div>
    </footer>
  );
}
