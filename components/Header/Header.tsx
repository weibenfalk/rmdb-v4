import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
// Images
import RMDBLogo from '../../public/react-movie-logo.svg';
import TMDBLogo from '../../public/tmdb_logo.svg';

const Header = () => (
  <div className='fixed w-full z-10 bg-slate-600 p-4'>
    <div className='flex align-center justify-between max-w-7xl m-auto'>
      <Link href='/'>
        <Image width="200" height="40" src={RMDBLogo} alt='rmdb-logo' />
      </Link>
      <Image width="100" height="50" src={TMDBLogo} alt='tmdb-logo' />
    </div>
  </div>
);

export default Header;
