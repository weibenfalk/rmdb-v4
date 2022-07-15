import Image, { StaticImageData } from 'next/image';
// Types
type Props = {
  imgUrl: string | StaticImageData;
};

const Thumb = ({ imgUrl }: Props) => (
  <Image
    priority
    placeholder='blur'
    blurDataURL='/placeholder.jpg'
    className='rounded-lg'
    layout='fill'
    objectFit='cover'
    src={imgUrl}
    alt='thumb'
  />
);

export default Thumb;
