"use client";
import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { myBooks, deleteBook, Book } from "@/lib/api";
import { Guard, Card } from "@/components/ui";
import { toast } from "sonner";
export default function MyBooks() {
  const { data } = useSession();
  const [books, B] = useState<Book[]>([]);
  async function load() {
    if (data?.user.email)
      try {
        B(await myBooks(data.user.email));
      } catch (e) {
        toast.error((e as Error).message);
      }
  }
  useEffect(() => {
    load();
  }, [data?.user.email]);
  async function remove(id: string) {
    if (!window.confirm("Delete this book?")) return;
    try {
      await deleteBook(id);
      toast.success("Book deleted");
      load();
    } catch (e) {
      toast.error((e as Error).message);
    }
  }
  return (
    <Guard>
      <div className="wrap section">
        <small className="kicker">YOUR CONTRIBUTION</small>
        <h1>
          Your <i>bookshelf.</i>
        </h1>
        <div className="grid">
          {books.map((b) => (
            <div key={b._id || b.id}>
              <Card book={b} />
              <button
                className="btn delete"
                onClick={() => remove(b._id || b.id || "")}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        {!books.length && (
          <p className="notice">You haven't added any books yet.</p>
        )}
      </div>
    </Guard>
  );
}
