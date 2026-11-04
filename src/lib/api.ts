export type Book = {
  _id?: string;
  id?: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  addedByName: string;
  addedByEmail: string;
  totalCopies: number;
  availableCopies: number;
  createdAt?: string;
};
export type Borrow = {
  _id: string;
  bookTitle: string;
  bookImage: string;
  borrowDate: string;
  returnDate: string;
};
const API = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/$/, "");
async function token() {
  const r = await fetch("/api/backend-token", { cache: "no-store" });
  const j = await r.json();
  if (!r.ok) throw Error(j.message || "Please log in");
  return j.token;
}
async function req<T>(
  path: string,
  opts: RequestInit = {},
  secure = false,
): Promise<T> {
  const h = new Headers(opts.headers);
  if (opts.body) h.set("Content-Type", "application/json");
  if (secure) h.set("Authorization", `Bearer ${await token()}`);
  const r = await fetch(API + path, { ...opts, headers: h, cache: "no-store" });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw Error(j.message || j.error || "API request failed");
  return j;
}
export async function getBooks() {
  const r = await req<{ data: Book[] }>("/books?limit=100&sort=latest");
  return r.data || [];
}
export async function getBook(id: string) {
  const r = await req<{ data: Book }>(`/books/${id}`);
  return r.data;
}
export async function addBook(b: Partial<Book>) {
  return req("/books", { method: "POST", body: JSON.stringify(b) }, true);
}
export async function updateBook(id: string, b: Partial<Book>) {
  return req(
    `/books/${id}`,
    { method: "PATCH", body: JSON.stringify(b) },
    true,
  );
}
export async function deleteBook(id: string) {
  return req(`/books/${id}`, { method: "DELETE" }, true);
}
export async function myBooks(email: string) {
  return (await getBooks()).filter((b) => b.addedByEmail === email);
}
export async function borrowBook(bookId: string, returnDate: string) {
  return req(
    "/borrows",
    { method: "POST", body: JSON.stringify({ bookId, returnDate }) },
    true,
  );
}
export async function myBorrows() {
  const r = await req<{ data: Borrow[] }>("/borrows", {}, true);
  return r.data || [];
}
export async function returnBook(id: string) {
  return req(`/borrows/${id}`, { method: "DELETE" }, true);
}
export async function uploadImage(file: File) {
  const key = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  if (!key) throw Error("Configure imgbb API key");
  const f = new FormData();
  f.append("image", file);
  const r = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
    method: "POST",
    body: f,
  });
  const j = await r.json();
  if (!r.ok || !j.success) throw Error("Image upload failed");
  return j.data.url as string;
}
