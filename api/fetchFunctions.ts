// Types
import type { Movies } from './types';

const dev = process.env.NODE_ENV !== 'production';
export const server = dev ? 'http://localhost:3000' : 'https://react-movie-db-v4.vercel.app/';

// As we're in a .ts file we can just use <returnType>. But if this was a .tsx file we have to
// use <returnType, >
export const basicFetch = async <returnType>(endpoint: string): Promise<returnType> => {
  const response = await fetch(endpoint);

  if (!response.ok) throw new Error('Error!');

  const data = await response.json();

  return data;
};

// Fetch functions
export const fetchMovies = async (search = '', page = 1): Promise<Movies> => {
  return await (await fetch(`${server}/api/movies?search=${search}&page=${page}`)).json();
};
