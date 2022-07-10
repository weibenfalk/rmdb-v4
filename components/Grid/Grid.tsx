import React from 'react';

type Props = {
  header: string;
  children: React.ReactNode;
};

const Grid = ({ header, children }: Props) => (
  <div className="max-w-7xl m-auto">
    <h2 className="text-xl font-bold py-4">{header}</h2>
    <div className='grid grid-cols-auto-fill gap-8'>{children}</div>
  </div>
);

export default Grid;
