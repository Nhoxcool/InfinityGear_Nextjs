"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "./ProductCard";
import {
  CalculatorIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import { LatestProduct } from "../(home_route)/page";

interface Props {
  latestProducts: LatestProduct[];
}

const ProductSlider: React.FC<Props> = ({ latestProducts }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    prevArrow: (
      <button className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full w-12 h-12 items-center justify-center">
        <ChevronDoubleLeftIcon className="w-8 h-8 text-blue-600" />
      </button>
    ),
    nextArrow: (
      <button className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full w-12 h-12 items-center justify-center">
        <ChevronDoubleLeftIcon className="w-8 h-8 text-blue-600 transform rotate-180" />
      </button>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
          prevArrow: <></>,
          nextArrow: <></>,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          prevArrow: <></>,
          nextArrow: <></>,
        },
      },
    ],
  };

  return latestProducts.length >= 5 ? (
    <Slider {...settings}>
      {latestProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Slider>
  ) : null;
};

export default ProductSlider;
