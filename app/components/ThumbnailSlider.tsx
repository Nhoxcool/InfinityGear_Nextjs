import Image from "next/image";
import { useRef } from "react";
import Slider from "react-slick";

interface Props {
  images: string[];
  currentSlide: number;
  goToSlide: (index: number) => void;
}

export const ThumbnailSlider = ({ images, currentSlide, goToSlide }: Props) => {
  const slider = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: true,
    className: "w-[550px] ",
  };

  return (
    <div className="flex py-2 space-x-2 max-h-24 ml-5">
      <Slider {...settings} ref={slider}>
        {images.map((img, index) => (
          <div
            key={index}
            className={`relative w-20 h-20 flex-non  ${
              index === currentSlide ? "ring ring-blue-500" : ""
            }`}
            onClick={() => goToSlide(index)}
          >
            <Image src={img} alt="testing" layout="fill" objectFit="contain" />
          </div>
        ))}
      </Slider>
    </div>
  );
};
