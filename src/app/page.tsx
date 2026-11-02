"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  totalCopies: number;
}

export default function HomePage() {
  const [newArrivals, setNewArrivals] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${apiUrl}/books`);
        const data = await res.json();
        setNewArrivals(data.slice(0, 6));
      } catch {
        console.error("Failed to fetch new arrivals");
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  return (
    <div className="space-y-12 pb-16">
      {/* 1. Swiper.js Banner Slider */}
      <section className="w-full">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          className="h-112.5 w-full"
        >
          <SwiperSlide className="bg-indigo-900 text-white flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to BookNook</h1>
            <p className="text-lg max-w-xl mb-6 text-indigo-200">
              Discover your next favorite book, borrow effortlessly, and expand your library horizons.
            </p>
            <Link href="/books" className="px-6 py-3 bg-white text-indigo-900 font-semibold rounded-md shadow hover:bg-indigo-50 transition">
              Browse Books
            </Link>
          </SwiperSlide>

          <SwiperSlide className="bg-blue-900 text-white flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Read. Borrow. Return.</h1>
            <p className="text-lg max-w-xl mb-6 text-blue-200">
              Manage your personal reading journey and track your borrowed books with complete ease.
            </p>
            <Link href="/books" className="px-6 py-3 bg-white text-blue-900 font-semibold rounded-md shadow hover:bg-blue-50 transition">
              Browse Books
            </Link>
          </SwiperSlide>

          <SwiperSlide className="bg-purple-900 text-white flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Community Reader Circle</h1>
            <p className="text-lg max-w-xl mb-6 text-purple-200">
              Add books to share with others or explore curated categories across science, fiction, and history.
            </p>
            <Link href="/books" className="px-6 py-3 bg-white text-purple-900 font-semibold rounded-md shadow hover:bg-purple-50 transition">
              Browse Books
            </Link>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* 2. New Arrivals (Dynamic Section) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">New Arrivals</h2>
          <Link href="/books" className="text-indigo-600 font-medium hover:underline">
            See All Books &rarr;
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading new books...</div>
        ) : newArrivals.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No books available yet. Be the first to add one!</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {newArrivals.map((book) => (
              <div key={book._id} className="bg-white border rounded-lg shadow-sm overflow-hidden flex flex-col">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={book.image} alt={book.title} className="h-48 w-full object-cover" />
                <div className="p-4 flex flex-col grow">
                  <span className="text-xs font-semibold text-indigo-600 uppercase mb-1">{book.category}</span>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{book.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">By {book.author}</p>
                  <div className="mt-auto">
                    <Link 
                      href={`/books/${book._id}`} 
                      className="block w-full text-center py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-700 transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Extra Section 1: How Borrowing Works */}
      <section className="bg-indigo-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">How Borrowing Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-indigo-600 mb-2">1</div>
              <h3 className="font-bold text-lg mb-2">Explore & Select</h3>
              <p className="text-sm text-gray-600">Browse through our extensive catalog of fiction, science, history, and kids&apos; books.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-indigo-600 mb-2">2</div>
              <h3 className="font-bold text-lg mb-2">Request Borrow</h3>
              <p className="text-sm text-gray-600">Click on any book, choose your return date, and instantly borrow available copies.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-indigo-600 mb-2">3</div>
              <h3 className="font-bold text-lg mb-2">Read & Return</h3>
              <p className="text-sm text-gray-600">Enjoy reading your book and return it from your dashboard when finished.</p>
            </div>
          </div>
        </div>
      </section>

{/* Extra Section 2: Top Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Explore Top Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {['Fiction', 'Science', 'History', 'Kids', 'Others'].map((cat) => (
            <Link 
              key={cat} 
              href={`/books?category=${cat}`}
              className="bg-white border rounded-lg p-6 text-center shadow-sm hover:border-indigo-600 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-gray-800">{cat}</h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}