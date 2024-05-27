import React from 'react';

export default function BrandLoading() {
  const dummyProducts = Array(6).fill('');

  return (
    <div className="animate-pulse ">
      <div className="w-full flex flex-row gap-4">
        {dummyProducts.map((_, index) => {
          return (
            <div key={index} className="flex flex-col gap-3">
              <div className=" p-4 flex flex-col gap-2">
                <div className=" w-36 h-28 bg-gray-300 " />
                <div className=" w-36 h-10 bg-gray-300 " />
              </div>
              <div className=" p-4 flex flex-col gap-2">
                <div className=" w-36 h-28 bg-gray-300 " />
                <div className=" w-36 h-10 bg-gray-300 " />
              </div>
              <div className=" p-4 flex flex-col gap-2">
                <div className=" w-36 h-28 bg-gray-300 " />
                <div className=" w-36 h-10 bg-gray-300 " />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
