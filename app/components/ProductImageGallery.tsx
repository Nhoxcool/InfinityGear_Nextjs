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
  arrows: false,
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
        prevArrow: <></>,
        nextArrow: <></>,
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
      },
    },
  ],
};

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
