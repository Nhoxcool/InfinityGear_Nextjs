"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
};

export default function ProductImageGallery(props: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { images } = props;
  const slider = useRef<Slider>(null);

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
          <div className="flex py-2 space-x-2 max-h-fit" key={index}>
            <div style={{ width: "500px", height: "430px" }}>
              <Image
                src={img}
                alt="testing"
                width={400}
                height={400}
                objectFit="cover"
                className="w-full h-full"
              />
            </div>
          </div>
        ))}
      </Slider>
      <div className="flex py-2 space-x-2 max-h-24">
        {images.map((img, index) => {
          return (
            <Image
              onClick={() => slider.current?.slickGoTo(index)}
              className={index === currentSlide ? "ring ring-blue-500" : ""}
              key={index}
              src={img}
              alt="testing"
              width={80}
              height={80}
            />
          );
        })}
      </div>
    </div>
  );
}
