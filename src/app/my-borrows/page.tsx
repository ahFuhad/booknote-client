"use client";
import { useEffect, useState } from "react";
import { myBorrows, returnBook, Borrow } from "@/lib/api";
import { Guard } from "@/components/ui";
import { toast } from "sonner";
export default function MyBorrows() {
  const [items, I] = useState<Borrow[]>([]);
  async function load() {
    try {
      I(await myBorrows());
    } catch (e) {
      toast.error((e as Error).message);
    }
  }
  useEffect(() => {
    load();
  }, []);
  async function back(id: string) {
    try {
      await returnBook(id);
      toast.success("Book returned");
      load();
    } catch (e) {
      toast.error((e as Error).message);
    }
  }
  return (
    <Guard>
      <div className="wrap section">
        <small className="kicker">YOUR READING LIST</small>
        <h1>
          Books you're <i>borrowing.</i>
        </h1>
        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>Book</th>
                <th>Borrow date</th>
                <th>Return date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((x) => (
                <tr key={x._id}>
                  <td>{x.bookTitle}</td>
                  <td>{new Date(x.borrowDate).toLocaleDateString()}</td>
                  <td>{new Date(x.returnDate).toLocaleDateString()}</td>
                  <td>
                    <button className="btn" onClick={() => back(x._id)}>
                      Return
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!items.length && (
          <p className="notice">
            No borrowed books yet. Explore the shelves to get started.
          </p>
        )}
      </div>
    </Guard>
  );
}
