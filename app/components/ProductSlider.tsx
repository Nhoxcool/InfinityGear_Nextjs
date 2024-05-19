"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "./ProductCard";

import { LatestProduct } from "../(home_route)/page";

interface Props {
  products: LatestProduct[];
}

const ProductSlider = ({ products }: Props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
          prevArrow: <></>,
          nextArrow: <></>,
        },
      },
      {
        breakpoint: 600,
        settings: {
          infinite: true,
          dots: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          prevArrow: <></>,
          nextArrow: <></>,
        },
      },
    ],
  };

  return products.length >= 5 ? (
    <Slider {...settings}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Slider>
  ) : null;
};

export default ProductSlider;
