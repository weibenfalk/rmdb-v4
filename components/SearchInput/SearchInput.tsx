import React from 'react';
// Types
type Props = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

const SearchInput = ({ query, setQuery }: Props) => (
  <div className='fixed z-20 w-full bg-slate-800 h-auto'>
    <input
      className='block h-14 max-w-7xl m-auto my-4 box-border w-full rounded-full p-4 text-xl bg-slate-700 text-white'
      type='text'
      placeholder='Search Movie'
      value={query}
      onChange={e => setQuery(e.currentTarget.value)}
    />
  </div>
);

export default SearchInput;
