import Link from 'next/link';
import Image from 'next/image';
// Images
import RMDBLogo from '../../public/rmdb-logo.svg';
import RMDBLogoSmall from '../../public/rmdb-logo-small.svg';

const Header = () => (
  <div className='fixed flex top-0 z-50 w-full bg-zinc-900 h-24 pointer-events-none'>
    <div className='flex w-full h-full max-w-7xl m-auto px-4'>
      <Link href='/'>
        <div className="cursor-pointer flex items-center">
          <div className='flex invisible md:visible pointer-events-auto'>
            <Image width='150' src={RMDBLogo} alt='rmdb-logo' />
          </div>
          <div className='absolute md:invisible pt-2'>
            <Image width='42' src={RMDBLogoSmall} alt='rmdb-logo' />
          </div>
        </div>
      </Link>
    </div>
  </div>
);

export default Header;
