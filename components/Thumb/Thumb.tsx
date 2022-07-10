import React from 'react';
import Image, { StaticImageData } from 'next/image';
// Types
type Props = {
  imgUrl: string | StaticImageData;
};

const Thumb = ({ imgUrl }: Props) => (
  <Image className='rounded-md' layout='fill' objectFit='cover' src={imgUrl} alt='thumb' />
);

export default Thumb;
