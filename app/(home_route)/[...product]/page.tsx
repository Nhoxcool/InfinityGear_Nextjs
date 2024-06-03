import ProductView from "@/app/components/ProductView";
import Rating from "@/app/components/Rating";
import ReviewsList from "@/app/components/ReviewsList";
import SimilarProductsList from "@/app/components/SimilarProductsList";
import startDb from "@/app/lib/db";
import ProductModel from "@/app/models/ProductModel";
import ReviewModel from "@/app/models/reviewModel";
import categories from "@/app/utils/categories";
import { rating } from "@material-tailwind/react";
import { ObjectId, isValidObjectId } from "mongoose";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  params: {
    product: string[];
  };
}

const fetchProduct = async (productId: string) => {
  if (!isValidObjectId(productId)) return redirect("/404");

  await startDb();
  const product = await ProductModel.findById(productId);
  if (!product) return redirect("/404");

  return JSON.stringify({
    id: product._id.toString(),
    title: product.title,
    description: product.description,
    thumbnail: product.thumbnail.url,
    images: product.images?.map(({ url }) => url),
    bulletPoints: product.bulletPoints,
    price: product.price,
    category: product.category,
    brand: product.brand,
    sale: product.sale,
    rating: product.rating,
    outOfstock: product.quantity <= 0,
  });
};

const fetchProductReviews = async (productId: string) => {
  await startDb();
  const reviews = await ReviewModel.find({ product: productId }).populate<{
    userId: { _id: ObjectId; name: string; avatar?: { url: string } };
  }>({
    path: "userId",
    select: "name avatar.url",
  });

  const result = reviews.map((r) => ({
    id: r._id.toString(),
    rating: r.rating,
    comment: r.comment,
    date: r.createdAt,
    userInfo: {
      id: r.userId._id.toString(),
      name: r.userId.name,
      avatar: r.userId.avatar?.url,
    },
  }));

  return JSON.stringify(result);
};

const fetchSimilarProducts = async (productId: string) => {
  await startDb();

  const currentProduct = await ProductModel.findById(productId);
  if (!currentProduct) {
    throw new Error("Product not found");
  }

  const currentCategories = currentProduct.category as string;

  const similarProducts = await ProductModel.find({
    _id: { $ne: productId },
    category: { $in: currentCategories },
  })
    .sort({ rating: -1 })
    .limit(10);

  return similarProducts.map(({ _id, thumbnail, title, price, sale }) => {
    return {
      id: _id.toString(),
      title,
      thumbnail: thumbnail.url,
      price: {
        base: price.base,
        discounted: price.discounted,
      },
      sale,
    };
  });
};

export default async function Product({ params }: Props) {
  const { product } = params;
  const productId = product[1];
  const productInfo = JSON.parse(await fetchProduct(productId));
  let productImages = [productInfo.thumbnail];
  if (productInfo.images) {
    productImages = productImages.concat(productInfo.images);
  }

  const reviews = await fetchProductReviews(productId);
  const similarProducts = await fetchSimilarProducts(productId);

  return (
    <div className="p-4">
      <ProductView
        title={productInfo.title}
        description={productInfo.description}
        price={productInfo.price}
        sale={productInfo.sale}
        points={productInfo.bulletPoints}
        images={productImages}
        brand={productInfo.brand}
        category={productInfo.category}
        rating={productInfo.rating}
        outOfstock={productInfo.outOfstock}
      />

      {(similarProducts ?? []).length > 0 ? (
        <SimilarProductsList products={similarProducts} />
      ) : (
        ""
      )}

      <div className="py-4 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold mb-2">Reviews</h1>
          <Link href={`/add-review/${productInfo.id}`}>Add Review</Link>
        </div>

        <ReviewsList reviews={JSON.parse(reviews)} />
      </div>
    </div>
  );
}
