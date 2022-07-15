import React from 'react';

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
    <input
      className='focus:outline-none focus:border-solid focus:border focus:border-cyan-200 h-10 md:w-96 rounded-full p-4 text-md bg-zinc-700 text-white transition-all pointer-events-auto'
      type='text'
      placeholder='Search Movie'
      value={text}
      onChange={handleInput}
    />
  );
};

export default SearchInput;
