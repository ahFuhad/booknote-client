"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AddBookPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "Fiction",
    image: "",
    description: "",
    totalCopies: 1,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "totalCopies" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiUrl}/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add book.");
      }

      toast.success("Book added successfully!");
      router.push("/books");
    } catch {
      toast.error("An error occurred while adding the book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white border rounded-xl shadow-sm p-6 md:p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Add a New Book
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Book Title
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              placeholder="e.g. To Kill a Mockingbird"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Author Name
              </label>
              <input
                type="text"
                name="author"
                required
                value={formData.author}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                placeholder="e.g. Harper Lee"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white"
              >
                <option value="Fiction">Fiction</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
                <option value="Kids">Kids</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL (Cover Photo)
              </label>
              <input
                type="url"
                name="image"
                required
                value={formData.image}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                placeholder="https://i.ibb.co/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Copies / Quantity
              </label>
              <input
                type="number"
                name="totalCopies"
                min="1"
                required
                value={formData.totalCopies}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              placeholder="Write a brief summary of the book..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Adding Book..." : "Add Book"}
          </button>
        </form>
      </div>
    </div>
  );
}
