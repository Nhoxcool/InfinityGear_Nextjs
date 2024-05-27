import React from 'react';

export default function BrandLoading() {
  const dummyProducts = Array(10).fill('');

  return (
    <div className=" mx-auto items-center animate-pulse">
      <div className="w-full justify-around flex flex-col gap-4">
        <div className=" flex flex-col gap-3">
          {dummyProducts.map((_, index) => {
            return (
              <div
                key={index}
                className=" flex flex-row justify-between min-w-full gap-3"
              >
                <div className=" mx-auto p-4 min-w-full grid grid-cols-4 gap-3">
                  <div className="w-36 h-28 bg-gray-300 justify-self-end" />
                  <div className=" col-span-2 w-full flex flex-col gap-3">
                    <div className=" w-full h-10 bg-gray-300 " />
                    <div className=" w-full h-3 bg-gray-300 " />
                    <div className=" w-full h-3 bg-gray-300 " />
                    <div className=" w-full h-3 bg-gray-300 " />
                  </div>
                  <div className=" w-5 h-5 bg-gray-300 " />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
