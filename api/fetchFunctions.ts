// Types
import type { Movies } from './types';

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
  return await (await fetch(`/api/movies?search=${search}&page=${page}`)).json();
};
