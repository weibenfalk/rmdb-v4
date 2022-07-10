import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
// Images
import RMDBLogo from '../../public/react-movie-logo.svg';

const Header = () => (
  <div className='fixed top-0 w-full bg-gray-900 px-4 py-6 z-50'>
    <div className='flex align-center justify-between max-w-7xl m-auto'>
      <Link href='/'>
        <div className="pt-2">
          <Image width='200' src={RMDBLogo} alt='rmdb-logo' />
        </div>
      </Link>
    </div>
  </div>
);

export default Header;
