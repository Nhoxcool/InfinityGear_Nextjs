"use client";
import { Radio } from "@material-tailwind/react";
import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { StarIcon } from "@heroicons/react/24/solid";

export default function SearchFilter() {
  const [rating, setRating] = useState([0, 5]);
  return (
    <div className="md:flex py-4 space-y-4">
      <div className="md:border-r md:border-b-0 border-b border-gray-700 p-4 md:space-y-4 md:block flex space-x-8 md:space-x-0">
        <div>
          <p className="font-semibold">Price</p>
          <div>
            <div>
              <Radio
                name="type"
                label="Low to heigh"
                defaultChecked
                color="blue-gray"
                className="text-sm"
              />
            </div>
            <div>
              <Radio name="type" label="Heigh to low" color="blue-gray" />
            </div>
          </div>
        </div>

        <div className="flex-1">
          <p className="font-semibold">
            Rating {rating[0]}-{rating[1]}
          </p>

          <Slider
            range
            allowCross={false}
            min={0}
            max={5}
            marks={{
              0: (
                <span className="flex items-center">
                  0<StarIcon className="w-3 h-3 text-yellow-700" />
                </span>
              ),
              5: (
                <span className="flex items-center">
                  5<StarIcon className="w-3 h-3 text-yellow-700" />
                </span>
              ),
            }}
            onChange={(value) => {
              setRating(value as number[]);
            }}
          />
        </div>

        <div>
          <button className="text-blue-gray-600 text-center w-full p-1 border rounded mt-6">
            Apply Filter
          </button>
        </div>
      </div>

      <div className="p-4 flex-1"></div>
    </div>
  );
}
