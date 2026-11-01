import Image from "next/image";
import Link from "next/link";

// This is a Server Component, so we can fetch data directly here!
async function getBooks() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}/books`, {
      cache: "no-store", // Ensures we always get fresh data from MongoDB
    });
    if (!res.ok) throw new Error("Failed to fetch books");
    return res.json();
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}

export default async function Home() {
  const books = await getBooks();

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Welcome to BookNook 📚
          </h1>
          <p className="text-lg text-slate-600">
            Explore our collection, borrow your favorite books, and manage your reading journey.
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-slate-800 mb-6">
          Available Books ({books.length})
        </h2>

        {/* If no books are in the database yet */}
        {books.length === 0 && (
          <p className="text-slate-500 text-center py-10">No books found in the database yet.</p>
        )}

        {/* Book Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {books.map((book: { _id: string; title: string; author: string; category: string; image?: string; cover?: string }) => (
            <div
              key={book._id}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-100 hover:shadow-lg transition flex flex-col justify-between"
            >
              <div>
                <div className="relative w-full h-48">
                  <Image
                    src={book.image || book.cover || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400"}
                    alt={book.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                    {book.category}
                  </span>
                  <h3 className="text-xl font-bold text-slate-800 mt-3 mb-1">
                    {book.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">By {book.author}</p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <Link
                  href={`/books/${book._id}`}
                  className="block text-center w-full bg-indigo-50 text-indigo-600 py-2 rounded-lg hover:bg-indigo-600 hover:text-white transition font-medium text-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}