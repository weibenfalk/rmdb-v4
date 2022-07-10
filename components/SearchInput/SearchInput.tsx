import React from 'react';
import Image from 'next/image';
// Images
import searchIcon from '../../public/search-icon.svg';

type Props = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

const SearchInput = ({ query, setQuery }: Props) => (
  <div className='fixed z-20 w-full bg-slate-800 h-auto'>
    <div className='relative'>
      <div className='absolute top-4 left-28'>
        <Image width='25' height='25' src={searchIcon} alt='search-icon' />
      </div>
      <input
        className='block h-14 max-w-7xl m-auto my-4 box-border w-full rounded-full p-4 pl-12 text-xl bg-slate-700 text-white'
        type='text'
        placeholder='Search Movie'
        value={query}
        onChange={e => setQuery(e.currentTarget.value)}
      />
    </div>
  </div>
);

export default SearchInput;
