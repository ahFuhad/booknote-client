"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { getBooks, Book } from "@/lib/api";
import { Card } from "@/components/ui";
const slides = [
  [
    "Find the story that finds you.",
    "A good book can change the way you see the world.",
    "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1800",
  ],
  [
    "Good books are better shared.",
    "Add a favourite to the shelves and let another reader discover it.",
    "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=1800",
  ],
  [
    "Your next chapter starts here.",
    "Discover new perspectives, timeless classics, and fresh ideas.",
    "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=1800",
  ],
];
export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [err, setErr] = useState("");
  useEffect(() => {
    getBooks()
      .then((x) => setBooks(x.slice(0, 6)))
      .catch((e) => setErr(e.message));
  }, []);
  return (
    <>
      <section className="hero">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          loop
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
        >
          {slides.map((s) => (
            <SwiperSlide key={s[0]}>
              <div
                className="slide"
                style={{
                  backgroundImage: `linear-gradient(90deg,#173729e8,#17372955),url(${s[2]})`,
                }}
              >
                <div className="wrap">
                  <small>A LIBRARY FOR CURIOUS MINDS</small>
                  <h1>{s[0]}</h1>
                  <p>{s[1]}</p>
                  <Link className="btn light" href="/books">
                    Browse books ↗
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <section className="wrap section">
        <small className="kicker">FRESH ON THE SHELVES</small>
        <h2>New arrivals</h2>
        <p className="sub">The latest additions to our shared shelves.</p>
        {err ? (
          <p className="notice">
            {err} — the backend connection needs attention.
          </p>
        ) : books.length ? (
          <div className="grid">
            {books.map((b) => (
              <Card key={b._id || b.id} book={b} />
            ))}
          </div>
        ) : (
          <p className="notice">
            No books found. Add the first book to the library.
          </p>
        )}
        <p className="center">
          <Link className="btn outline" href="/books">
            See all books ↗
          </Link>
        </p>
      </section>
      <section className="band">
        <div className="wrap">
          <small>HOW BOOKNOOK WORKS</small>
          <h2>
            Read it. Love it. <i>Pass it on.</i>
          </h2>
          <p>
            Discover a book, borrow it for a little while, then return it for
            the next reader.
          </p>
          <Link className="btn light" href="/books">
            Find a book ↗
          </Link>
        </div>
      </section>
      <section className="wrap section">
        <small className="kicker">THREE SIMPLE STEPS</small>
        <h2>A little give, a little take.</h2>
        <div className="steps">
          <article>
            <b>01</b>
            <h3>Discover</h3>
            <p>Explore the shelves and find a title that speaks to you.</p>
          </article>
          <article>
            <b>02</b>
            <h3>Borrow</h3>
            <p>Borrow an available copy and enjoy your reading time.</p>
          </article>
          <article>
            <b>03</b>
            <h3>Return</h3>
            <p>Return it when you're done so another reader can enjoy it.</p>
          </article>
        </div>
      </section>
    </>
  );
}
