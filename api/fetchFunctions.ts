import { SEARCH_BASE_URL, POPULAR_BASE_URL, API_URL, API_KEY } from '../config';
// Types
import type { Movies, Movie, Credits } from './types';

// Fetch functions
export const fetchMovies = async (searchTerm = "", page = 1): Promise<Movies> => {
  const endpoint: string = searchTerm
    ? `${SEARCH_BASE_URL}${searchTerm}&page=${page}`
    : `${POPULAR_BASE_URL}&page=${page}`;

  const response = await fetch(endpoint);

  if (!response.ok) throw new Error("Error in response from server.");

  return await response.json();
};

export const fetchMovie = async (movieId: number): Promise<Movie> => {
  const endpoint: string = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
  return await (await fetch(endpoint)).json();
};

export const fetchCredits = async (movieId: number): Promise<Credits> => {
  const creditsEndpoint: string = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
  return await (await fetch(creditsEndpoint)).json();
};
