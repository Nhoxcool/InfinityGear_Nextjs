import ReviewForm from "@/app/components/ReviewForm";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

export default function Review({ params }: Props) {
  const productId = params.id;
  return (
    <div className="p-4">
      <ReviewForm productId={productId} />
    </div>
  );
}
