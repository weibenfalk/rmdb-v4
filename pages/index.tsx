import React from 'react';
import type { NextPage } from 'next';
import { dehydrate, QueryClient } from 'react-query';
// Fetch hooks
import { useFetchMovies } from '../api/fetchHooks';
// Fetch queries
import { fetchMovies } from '../api/fetchFunctions';
// Config
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config';
// Fallback image
import noImage from '../public/no_image.jpg';
// Components
import Grid from '../components/Grid/Grid';
import Card from '../components/Card/Card';

const Home: NextPage = () => {
  const [search, setSearch] = React.useState('');
  const { data, isLoading, error } = useFetchMovies(search);

  if (!data?.pages) return null;

  return (
    <div className='p-4'>
      <Grid header={search ? 'Search Result' : 'Popular Movies'}>
        {data?.pages[0].results.map(movie => (
          <Card
            key={movie.id}
            movieId={movie.id}
            imgUrl={movie.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + movie.backdrop_path : noImage}
            title={movie.original_title}
            clickable
          />
        ))}
      </Grid>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['movies', ''], () => fetchMovies());

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
}
