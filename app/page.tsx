import Image from 'next/image';
import React from 'react';

export default function Home() {
  return (
    <div>
      Home
      <Image
        width={500}
        height={500}
        src='/image/logo_no_bg.png'
        alt='logo image'
      />
    </div>
  );
}
