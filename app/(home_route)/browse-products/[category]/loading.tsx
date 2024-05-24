import React from 'react';

export default function BrandLoading() {
  const dummyProducts = Array(10).fill('');

  return (
    <div className=" mx-auto items-center animate-pulse">
      <div className="w-full justify-around flex flex-row gap-4">
        <div className=" flex flex-row gap-3">
          {dummyProducts.map((_, index) => {
            return (
              <div key={index} className=" flex flex-col gap-3">
                <div className=" p-4  flex flex-col gap-5">
                  <div className=" w-36 h-28 bg-gray-300 " />
                  <div className=" w-36 h-13 bg-gray-300 " />
                </div>
                <div className=" p-4  flex flex-col gap-3">
                  <div className=" w-36 h-28 bg-gray-300 " />
                  <div className=" w-36 h-13 bg-gray-300 " />
                </div>
                <div className=" p-4  flex flex-col gap-3">
                  <div className=" w-36 h-28 bg-gray-300 " />
                  <div className=" w-36 h-13 bg-gray-300 " />
                </div>
                <div className=" p-4  flex flex-col gap-3">
                  <div className=" w-36 h-28 bg-gray-300 " />
                  <div className=" w-36 h-13 bg-gray-300 " />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
