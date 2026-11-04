"use client";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import { Toaster, toast } from "sonner";
import { BookOpen } from "lucide-react";
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
  return (
    <header className="nav">
      <Link href="/" className="logo">
        <BookOpen /> booknote<span>.</span>
      </Link>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/books">All Books</Link>
        {user && (
          <>
            <Link href="/add-book">Add Book</Link>
            <Link href="/my-books">My Books</Link>
            <Link href="/my-borrows">My Borrows</Link>
          </>
        )}
      </nav>
      <div>
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
        View details ↗
      </Link>
    </article>
  );
}
export function ErrorToast({ message }: { message: string }) {
  toast.error(message);
  return null;
}
