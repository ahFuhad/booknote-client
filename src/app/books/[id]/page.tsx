"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getBook, borrowBook, Book } from "@/lib/api";
import { Guard } from "@/components/ui";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
export default function Detail() {
  const { id } = useParams<{ id: string }>(),
    router = useRouter(),
    { data } = useSession();
  const [b, B] = useState<Book | null>(null),
    [date, D] = useState("");
  useEffect(() => {
    getBook(id)
      .then(B)
      .catch((e) => toast.error(e.message));
  }, [id]);
  async function borrow() {
    try {
      await borrowBook(id, date);
      toast.success("Book borrowed. Happy reading!");
      router.push("/my-borrows");
    } catch (e) {
      toast.error((e as Error).message);
    }
  }
  if (!b) return <p className="loading">Loading book…</p>;
  return (
    <Guard>
      <div className="wrap detail">
        <img src={b.image} alt={b.title} />
        <div>
          <small className="kicker">{b.category}</small>
          <h1>{b.title}</h1>
          <p>by {b.author}</p>
          <p>{b.description}</p>
          <p>
            {b.availableCopies} of {b.totalCopies} copies available
          </p>
          <p>Added by {b.addedByName}</p>
          <label>Return date</label>
          <input
            type="date"
            value={date}
            min={new Date().toISOString().slice(0, 10)}
            onChange={(e) => D(e.target.value)}
          />
          <button
            className="btn"
            disabled={!b.availableCopies || !date}
            onClick={borrow}
          >
            Borrow this book
          </button>
        </div>
      </div>
    </Guard>
  );
}
