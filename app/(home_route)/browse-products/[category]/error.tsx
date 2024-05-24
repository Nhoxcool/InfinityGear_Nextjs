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
    <div>
      <div className=" items-center mx-auto text-center flex flex-col gap-5 mt-10">
        <Typography variant="h3">
          Opps something went wrong, please try again later!
        </Typography>
        <Image
          height={400}
          width={400}
          src={'/image/error.png'}
          alt="error img"
        />
      </div>
    </div>
  );
}
