import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const HeaderLogo = () => {
  return (
    <Link href="/">
      <div className="items-center hidden lg:flex">
        <Image
          src="/auth.svg"
          alt="logo"
          width={28}
          height={28}
          quality={100}
        />
        <p className="text-white text-2xl font-bold ml-2 cursor-pointer">
          Finance
        </p>
      </div>
    </Link>
  );
};

export { HeaderLogo };
