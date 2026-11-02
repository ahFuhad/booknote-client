"use client";

import { useEffect, useState, FormEvent, use } from "react";
import { toast } from "sonner";
import Link from "next/link";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  totalCopies: number;
  quantity?: number;
}

export default function BookDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [returnDate, setReturnDate] = useState<string>("");
  const [borrowing, setBorrowing] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;

    const fetchBookDetails = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${apiUrl}/books/${id}`);
        const data = await res.json();
        setBook(data);
      } catch {
        toast.error("Failed to load book details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleBorrowSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!returnDate) {
      toast.error("Please select a return date.");
      return;
    }

    setBorrowing(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiUrl}/borrows`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId: book?._id,
          bookTitle: book?.title,
          bookImage: book?.image,
          returnDate,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to borrow book.");
      }

      toast.success("Book borrowed successfully!");
      setIsModalOpen(false);
      setBook((prev) => prev ? { ...prev, totalCopies: prev.totalCopies - 1 } : null);
    } catch {
      toast.error("An error occurred while borrowing.");
    } finally {
      setBorrowing(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading book details...</div>;
  }

  if (!book) {
    return <div className="text-center py-20 text-gray-500">Book not found.</div>;
  }

  const copiesAvailable = book.totalCopies ?? book.quantity ?? 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/books" className="text-indigo-600 font-medium hover:underline mb-6 inline-block">
        &larr; Back to All Books
      </Link>

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
        <div className="h-100 w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={book.image} alt={book.title} className="h-full w-full object-cover rounded-lg" />
        </div>

        <div className="flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">{book.category}</span>
            <h1 className="text-3xl font-bold text-gray-900 mt-1 mb-2">{book.title}</h1>
            <p className="text-lg text-gray-600 mb-4">By <span className="font-medium text-gray-800">{book.author}</span></p>
            <p className="text-sm text-gray-700 leading-relaxed mb-6">{book.description || "No description provided for this book."}</p>
          </div>

          <div className="space-y-4 border-t pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Available Copies:</span>
              <span className={`font-bold text-lg ${copiesAvailable > 0 ? "text-green-600" : "text-red-600"}`}>
                {copiesAvailable}
              </span>
            </div>

            <button 
              onClick={() => setIsModalOpen(true)}
              disabled={copiesAvailable <= 0}
              className="w-full py-3 px-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {copiesAvailable > 0 ? "Borrow Book" : "Out of Stock"}
            </button>
          </div>
        </div>
      </div>

      {/* Borrow Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Borrow: {book.title}</h3>
            
            <form onSubmit={handleBorrowSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
                <input 
                  type="date"
                  required
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={borrowing}
                  className="px-4 py-2 bg-indigo-600 text-sm font-medium text-white rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
                >
                  {borrowing ? "Processing..." : "Confirm Borrow"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}