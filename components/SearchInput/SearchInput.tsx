import React from 'react';
import Image from 'next/image';
// Images
import searchIcon from '../../public/search-icon.svg';

type Props = {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

const SearchInput = ({ setQuery }: Props) => {
  const [text, setText] = React.useState('');
  const timer = React.useRef<NodeJS.Timeout>();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    clearTimeout(timer.current);

    setText(value);

    timer.current = setTimeout(() => {
      setQuery(value);
    }, 300);
  };

  return (
    <div className='fixed z-20 w-full bg-slate-800 h-auto'>
      <div className='relative'>
        <div className='absolute top-4 left-28'>
          <Image width='25' height='25' src={searchIcon} alt='search-icon' />
        </div>
        <input
          className='block h-14 max-w-7xl m-auto my-4 box-border w-full rounded-full p-4 pl-12 text-xl bg-slate-700 text-white'
          type='text'
          placeholder='Search Movie'
          value={text}
          onChange={handleInput}
        />
      </div>
    </div>
  );
};

export default SearchInput;
