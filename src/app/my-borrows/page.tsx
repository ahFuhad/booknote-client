"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

interface BorrowItem {
  _id: string;
  bookId: string;
  bookTitle: string;
  bookImage: string;
  returnDate: string;
  borrowDate?: string;
}

export default function MyBorrowsPage() {
  const [borrows, setBorrows] = useState<BorrowItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBorrows = async () => {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${apiUrl}/borrows`);
        const data = await res.json();
        setBorrows(data);
      } catch {
        toast.error("Failed to load borrowed books.");
      } finally {
        setLoading(false);
      }
    };

    fetchBorrows();
  }, []);

  const handleReturn = async (borrowId: string, bookId: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiUrl}/borrows/${borrowId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to return book.");
      }

      toast.success("Book returned successfully!");
      setBorrows((prev) => prev.filter((item) => item._id !== borrowId));
    } catch {
      toast.error("An error occurred while returning the book.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">My Borrowed Books</h1>

      {loading ? (
        <div className="text-center py-20 text-gray-500">
          Loading your borrows...
        </div>
      ) : borrows.length === 0 ? (
        <div className="text-center py-20 bg-white border rounded-xl shadow-sm p-8 space-y-4">
          <p className="text-gray-500">
            You haven&apos;t borrowed any books yet.
          </p>
          <Link
            href="/books"
            className="inline-block px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
          >
            Browse Catalog
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {borrows.map((item) => (
            <div
              key={item._id}
              className="bg-white border rounded-lg shadow-sm overflow-hidden flex flex-col"
            >
              {item.bookImage && (
                <div className="h-48 w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.bookImage}
                    alt={item.bookTitle}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div className="p-4 flex flex-col grow justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">
                    {item.bookTitle}
                  </h3>
                  <p className="text-xs text-red-600 font-medium">
                    Return By: {new Date(item.returnDate).toLocaleDateString()}
                  </p>
                </div>

                <button
                  onClick={() => handleReturn(item._id, item.bookId)}
                  className="w-full py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition"
                >
                  Return Book
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
