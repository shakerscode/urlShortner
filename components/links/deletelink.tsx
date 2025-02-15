"use client";

import { useState } from "react";
import { Trash } from "lucide-react";
import toast from "react-hot-toast"; 
import { useRouter } from "next/navigation";
import Spinner from "../spinner";

export default function DeleteLink({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/go/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete link.");
      }

      toast.success("Link deleted successfully!");
      router.refresh(); // Refresh page to update UI
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsDeleting(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Delete Button */}
      <button
        className="p-2 rounded bg-red-500 text-white hover:bg-red-600"
        onClick={() => setIsOpen(true)}
      >
        <Trash size={14} />
      </button>

      {/* Confirmation Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <h2 className="text-xl font-semibold">Delete link?</h2>
            <p className="text-gray-600 mt-2">
              Deleting this link will remove it permanently.
              <br />
              This action <span className="text-red-500 font-bold">cannot</span> be undone.
            </p>

            <div className="mt-4 flex justify-end items-center gap-2">
              <button
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ?  <Spinner/> : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
