"use client";
import { useEffect, useState } from "react";
import { getBooks, Book } from "@/lib/api";
import { Card } from "@/components/ui";
export default function Books() {
  const [books, S] = useState<Book[]>([]),
    [q, Q] = useState(""),
    [cat, C] = useState("All"),
    [err, E] = useState("");
  useEffect(() => {
    getBooks()
      .then(S)
      .catch((e) => E(e.message));
  }, []);
  const filtered = books.filter(
    (b) =>
      (cat === "All" || b.category === cat) &&
      `${b.title} ${b.author}`.toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <div className="wrap section">
      <small className="kicker">THE COLLECTION</small>
      <h1>
        Explore the <i>shelves.</i>
      </h1>
      <p className="sub">
        Stories, ideas, and new perspectives waiting to be discovered.
      </p>
      <div className="filters">
        <input
          placeholder="Search title or author…"
          value={q}
          onChange={(e) => Q(e.target.value)}
        />
        <select value={cat} onChange={(e) => C(e.target.value)}>
          {["All", "Fiction", "Science", "History", "Kids", "Others"].map(
            (c) => (
              <option key={c}>{c}</option>
            ),
          )}
        </select>
      </div>
      {err ? (
        <p className="notice">{err}</p>
      ) : (
        <div className="grid">
          {filtered.map((b) => (
            <Card key={b._id || b.id} book={b} />
          ))}
        </div>
      )}
      {!filtered.length && !err && (
        <p className="notice">No books match your search.</p>
      )}
    </div>
  );
}
