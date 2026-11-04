"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { addBook, uploadImage } from "@/lib/api";
import { Guard } from "@/components/ui";
import { toast } from "sonner";
export default function AddBook() {
  const { data } = useSession(),
    router = useRouter();
  const [busy, S] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    S(true);
    const f = new FormData(e.currentTarget);
    try {
      const file = f.get("image") as File;
      const image = await uploadImage(file);
      await addBook({
        title: String(f.get("title")),
        author: String(f.get("author")),
        category: String(f.get("category")),
        description: String(f.get("description")),
        image,
        totalCopies: Number(f.get("copies")),
        addedByName: data?.user.name,
        addedByEmail: data?.user.email,
      });
      toast.success("Book added!");
      router.push("/my-books");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      S(false);
    }
  }
  return (
    <Guard>
      <div className="wrap formwrap">
        <small className="kicker">GROW THE COLLECTION</small>
        <h1>
          Share a <i>good read.</i>
        </h1>
        <form className="form" onSubmit={submit}>
          <label>
            Book title
            <input name="title" required />
          </label>
          <label>
            Author name
            <input name="author" required />
          </label>
          <label>
            Category
            <select name="category">
              {["Fiction", "Science", "History", "Kids", "Others"].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <label>
            Total copies
            <input
              name="copies"
              type="number"
              min="1"
              defaultValue="1"
              required
            />
          </label>
          <label>
            Book cover image
            <input name="image" type="file" accept="image/*" required />
          </label>
          <label>
            Description
            <textarea name="description" required minLength={10} />
          </label>
          <label>
            Your name
            <input value={data?.user.name || ""} readOnly />
          </label>
          <label>
            Your email
            <input value={data?.user.email || ""} readOnly />
          </label>
          <button className="btn" disabled={busy}>
            {busy ? "Uploading…" : "Add book ↗"}
          </button>
        </form>
      </div>
    </Guard>
  );
}
