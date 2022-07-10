import { API_URL, API_KEY } from '../config';
// Types
import type { Movies, Movie, Credits } from './types';

const dev = process.env.NODE_ENV !== 'production';
export const server = dev ? 'http://localhost:3000' : 'https://your_deployment.server.com';

// Fetch functions
export const fetchMovies = async (search = "", page = 1): Promise<Movies> => {
  return await (await fetch(`${server}/api/movies?search=${search}&page=${page}`)).json();
};

export const fetchMovie = async (movieId: number): Promise<Movie> => {
  const endpoint: string = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
  return await (await fetch(endpoint)).json();
};

export const fetchCredits = async (movieId: number): Promise<Credits> => {
  const creditsEndpoint: string = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
  return await (await fetch(creditsEndpoint)).json();
};
