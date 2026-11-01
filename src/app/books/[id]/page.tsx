"use client";
import { useEffect, useState } from "react";

// Define a strict TypeScript interface for a book with no 'any' types
interface Book {
  _id?: string;
  title?: string;
  author?: string;
  description?: string;
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
    
    fetch(`${backendUrl}/books`)
      .then((res) => res.json())
      .then((data: Book[]) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch books:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8 text-white">Loading books from server...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">Book Catalog</h1>
      
      {books.length === 0 ? (
        <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
          <p className="text-emerald-400 font-semibold">🎉 Connection is successful!</p>
          <p className="text-gray-400 mt-1">Your backend is talking to MongoDB, but the database collection is currently empty (`[]`).</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {books.map((book, index) => (
            <div key={book._id ?? index} className="p-4 bg-gray-800 rounded-lg border border-gray-700 shadow-md">
              <h2 className="text-xl font-semibold text-emerald-400">{book.title ?? "Untitled Book"}</h2>
              <p className="text-gray-300">By {book.author ?? "Unknown Author"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}