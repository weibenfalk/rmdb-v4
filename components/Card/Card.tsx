import React from 'react';
import Link from 'next/link';
// Components
import Thumb from '../Thumb/Thumb';
// Types
import type { StaticImageData } from 'next/image';

type Props = {
  movieId: number;
  imgUrl: string | StaticImageData;
  title: string;
  clickable: boolean;
};

const Card = ({ movieId, imgUrl, title, clickable }: Props) => (
  <div className='relative h-72 hover:opacity-80 cursor-pointer duration-300'>
    <Link href={clickable ? `/${movieId}` : ''}>
      <div>
        <Thumb imgUrl={imgUrl} />
        <div className='absolute w-full bottom-0 p-2 rounded-b-md bg-gradient-to-b from-transparent to-black'>
          <h2 className='text-cyan-200 text-center text-sm truncate'>{title}</h2>
        </div>
      </div>
    </Link>
  </div>
);

export default Card;
