import ProductView from "@/app/components/ProductView";
import Rating from "@/app/components/Rating";
import RecentProductLists from "@/app/components/RecentProductLists";
import ReviewsList from "@/app/components/ReviewsList";
import SimilarProductsList from "@/app/components/SimilarProductsList";
import startDb from "@/app/lib/db";
import ProductModel from "@/app/models/ProductModel";
import HistoryModel, { updateOrCreateHistory } from "@/app/models/historyModel";
import ReviewModel from "@/app/models/reviewModel";
import WishlistModel from "@/app/models/wishlistModel";
import categories from "@/app/utils/categories";
import { auth } from "@/auth";
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

  let isWishlist = false;

  const session = await auth();
  if (session?.user) {
    await updateOrCreateHistory(session.user.id, product._id.toString());
    const wishlist = await WishlistModel.findOne({
      user: session.user.id,
      products: product._id,
    });
    isWishlist = wishlist ? true : false;
  }

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
    isWishlist,
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

  return similarProducts.map(
    ({ _id, thumbnail, title, price, sale, rating }) => {
      return {
        id: _id.toString(),
        title,
        thumbnail: thumbnail.url,
        price: {
          base: price.base,
          discounted: price.discounted,
        },
        sale,
        rating,
      };
    }
  );
};

const fetchRecentProduct = async (
  userId: string
): Promise<
  {
    id: string;
    title: string;
    thumbnail: string;
    price: {
      base: number;
      discounted: number;
    };
    sale: number;
    rating: number;
  }[]
> => {
  await startDb();

  const histories = await HistoryModel.find({
    owner: userId,
  }).populate("items.product");

  if (!histories || histories.length === 0) {
    throw new Error("History not found");
  }

  const allItems = histories.flatMap((history) => history.items);
  allItems.sort((a, b) => b.date.getTime() - a.date.getTime());

  if (allItems.length === 0) {
    throw new Error("No history items found");
  }

  const filteredItems = allItems.slice(1, 11);

  const recentProducts = await Promise.all(
    filteredItems.map(async (a) => {
      const recentProduct = await ProductModel.findById(a.product);
      if (!recentProduct) {
        throw new Error("Recent product not found");
      }
      return {
        id: recentProduct._id.toString(),
        title: recentProduct.title || "",
        thumbnail: recentProduct.thumbnail?.url || "",
        price: {
          base: recentProduct.price.base || 0,
          discounted: recentProduct.price.discounted || 0,
        },
        sale: recentProduct.sale || 0,
        rating: recentProduct.rating || 0,
      };
    })
  );

  return recentProducts;
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

  const session = await auth();
  let recentProducts;

  if (session) {
    recentProducts = await fetchRecentProduct(session.user.id);
  } else {
    null;
  }

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
        isWishlist={productInfo.isWishlist}
      />

      {(similarProducts ?? []).length > 0 ? (
        <SimilarProductsList products={similarProducts} />
      ) : (
        ""
      )}

      {(recentProducts ?? []).length > 0 ? (
        <RecentProductLists products={recentProducts} />
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
