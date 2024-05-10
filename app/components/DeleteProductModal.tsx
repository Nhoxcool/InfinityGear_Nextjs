import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, IconButton } from "@material-tailwind/react";
import React, { useState, useTransition } from "react";
import { deleteProduct } from "../(admin)/products/action";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface Props {
  productId: string;
}

export default function DeleteProductModal({ productId }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    setOpen(false);
    await deleteProduct(productId);
    router.refresh();
    toast.success("Delete Product Successfully!");
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* Delete Product Button */}
      <IconButton
        variant="text"
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
        onClick={() => setOpen(true)}
      >
        <XMarkIcon className="h-3 w-3"></XMarkIcon>
      </IconButton>

      {/* Modal */}
      {open && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-gray-900 opacity-75"></div>
            <div className="relative bg-white w-96 rounded shadow-lg">
              <div className="absolute top-0 right-0 m-4">
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">
                  Confirm Product Deletion
                </h2>
                <p className="text-gray-600">
                  Are you sure you want to delete this product?
                </p>
                <div className="flex justify-end mt-4">
                  <Button
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Confirm
                  </Button>
                  <Button
                    onClick={handleClose}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
