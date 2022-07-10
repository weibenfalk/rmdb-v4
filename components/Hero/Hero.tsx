import React from 'react';
import Image, { StaticImageData } from 'next/image';
// Types
type Props = {
  imgUrl: StaticImageData | string;
  title: string;
  text: string;
};

const Hero = ({ imgUrl, title, text }: Props) => (
  <div className='relative w-full p-4 h-128 mt-28'>
    <div className='flex flex-col-reverse relative h-full max-w-7xl m-auto z-10 pb-12 text-center md:text-left'>
      <div className="text-white max-w-xl">
        <h2 className="text-4xl pb-8">{title}</h2>
        <p>{text}</p>
      </div>
    </div>
    <Image priority objectFit='cover' objectPosition='center' layout='fill' src={imgUrl} alt='thumb' />
  </div>
);

export default Hero;
