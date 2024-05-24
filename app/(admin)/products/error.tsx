'use client'; // Error components must be Client Components

import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className=" flex h-full">
      <div className=" items-center m-auto  text-center flex flex-col gap-5">
        <Typography variant="h3">
          Opps something went wrong, please try again later!
        </Typography>
        <Image
          height={200}
          width={200}
          src={'/image/error.png'}
          alt="error img"
        />
      </div>
    </div>
  );
}
