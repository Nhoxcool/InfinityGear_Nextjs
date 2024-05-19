"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ThumbnailSlider } from "./ThumbnailSlider";

interface Props {
  images: string[];
}

const settings: Settings = {
  dots: false,
  lazyLoad: "anticipated",
  infinite: true,
  speed: 100,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  autoplay: true,
  className: "w-[500px]",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
        arrows: false,
        className: "w-[400px]",
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
        className: "w-[280px] ml-6",
        arrows: false,
        className: "w-[280px] ml-6",
      },
    },
  ],
};

// Pixel GIF code adapted from https://stackoverflow.com/a/33919020/266535
const keyStr =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

const triplet = (e1: number, e2: number, e3: number) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63);

const rgbDataURL = (r: number, g: number, b: number) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

export default function ProductImageGallery(props: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { images } = props;
  const slider = useRef<Slider>(null);

  const goToSlide = (index: number) => {
    if (slider.current) {
      slider.current.slickGoTo(index);
      setCurrentSlide(index);
    }
  };

  return (
    <div>
      <Slider
        {...settings}
        afterChange={(currentSlide) => {
          setCurrentSlide(currentSlide);
        }}
        ref={slider}
      >
        {images.map((img, index) => (
          <div
            className="relative w-full aspect-square m-0 overflow-hidden"
            key={index}
          >
            <div className=" mx-auto">
              <Image
                src={img}
                alt="testing"
                layout="fill"
                objectFit="contain"
                className="w-auto h-96 m-auto"
                placeholder="blur"
                blurDataURL={rgbDataURL(7, 176, 238)}
              />
            </div>
          </div>
        ))}
      </Slider>

      {images.length > 4 ? (
        <ThumbnailSlider
          images={images}
          currentSlide={currentSlide}
          goToSlide={goToSlide}
        />
      ) : (
        <div className="flex py-2 space-x-2 max-h-24 ml-9">
          {images.map((img, index) => (
            <div
              key={index}
              className={`relative w-20 h-20 flex-non  ${
                index === currentSlide ? "ring ring-blue-500" : ""
              }`}
              onClick={() => goToSlide(index)}
            >
              <Image
                src={img}
                alt="testing"
                layout="fill"
                objectFit="contain"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
