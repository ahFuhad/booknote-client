"use client";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import { Toaster, toast } from "sonner";
import { BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster richColors position="top-right" />
    </>
  );
}

export function Nav() {
  const { data } = useSession();
  const user = data?.user;
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="nav">
      <Link href="/" className="logo" onClick={closeMenu}>
        <BookOpen /> booknote<span>.</span>
      </Link>

      <button 
        type="button"
        className="hamburger-btn" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <nav className={isOpen ? "open" : ""}>
        <Link href="/" onClick={closeMenu}>Home</Link>
        <Link href="/books" onClick={closeMenu}>All Books</Link>
        {user && (
          <>
            <Link href="/add-book" onClick={closeMenu}>Add Book</Link>
            <Link href="/my-books" onClick={closeMenu}>My Books</Link>
            <Link href="/my-borrows" onClick={closeMenu}>My Borrows</Link>
          </>
        )}

        <div className="mobile-auth-section">
          {user ? (
            <button
              onClick={async () => {
                await signOut();
                location.href = "/";
              }}
            >
              Log out
            </button>
          ) : (
            <>
              <Link href="/login" onClick={closeMenu}>Log in</Link>
              <Link className="btn" href="/register" onClick={closeMenu}>
                Register
              </Link>
            </>
          )}
        </div>
      </nav>

      <div className="desktop-auth-section">
        {user ? (
          <button
            onClick={async () => {
              await signOut();
              location.href = "/";
            }}
          >
            Log out
          </button>
        ) : (
          <>
            <Link href="/login">Log in</Link>{" "}
            <Link className="btn" href="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export function Foot() {
  return (
    <footer>
      <b>booknote.</b>
      <p>
        A shared shelf for curious minds. Discover, borrow, and pass good
        stories along.
      </p>
      <p>Dhaka, Bangladesh · hello@booknote.library</p>
      <small>© {new Date().getFullYear()} BookNote Library</small>
    </footer>
  );
}

export function Guard({ children }: { children: React.ReactNode }) {
  const { data, isPending } = useSession();
  if (isPending) return <p className="loading">Loading your library…</p>;
  if (!data?.user) {
    if (typeof window !== "undefined")
      location.href =
        "/login?callbackUrl=" + encodeURIComponent(location.pathname);
    return null;
  }
  return <>{children}</>;
}

export function Card({ book }: { book: any }) {
  return (
    <article className="card">
      <img src={book.image} alt={book.title} />
      <small>{book.category}</small>
      <h3>{book.title}</h3>
      <p>by {book.author}</p>
      <Link className="textlink" href={`/books/${book._id || book.id}`}>
        View details 
      </Link>
    </article>
  );
}

export function ErrorToast({ message }: { message: string }) {
  toast.error(message);
  return null;
}