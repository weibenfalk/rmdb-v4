type Props = {
  title: string;
  children: React.ReactNode;
};

const Grid = ({ title, children }: Props) => (
  <>
    <h2 className="text-xl font-bold pb-4">{title}</h2>
    <div className='grid grid-cols-auto-fill gap-8'>{children}</div>
  </>
);

export default Grid;
