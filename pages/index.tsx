import React from 'react';
import type { NextPage } from 'next';
import { dehydrate, QueryClient } from 'react-query';
// Fetch hooks
import { useFetchMovies } from '../api/fetchHooks';
// Config
import { IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE, POPULAR_BASE_URL } from '../config';
// Fallback image
import noImage from '../public/no_image.jpg';
// Types
import type { Movies } from '../api/types';
// Components
import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import SearchInput from '../components/SearchInput/SearchInput';
import Grid from '../components/Grid/Grid';
import Card from '../components/Card/Card';

const Home: NextPage = () => {
  const [query, setQuery] = React.useState('');

  const { data, fetchNextPage, isFetchingNextPage, error } = useFetchMovies(query);

  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

    if (scrollHeight - scrollTop === clientHeight) {
      fetchNextPage();
    }
  };

  return (
    <>
      <SearchInput query={query} setQuery={setQuery} />
      <div className='relative h-screen overflow-auto mt-28' onScroll={handleScroll}>
        {!query && data && data.pages ? (
          <Hero
            imgUrl={
              data.pages[0].results[0]?.backdrop_path
                ? IMAGE_BASE_URL + BACKDROP_SIZE + data.pages[0].results[0].backdrop_path
                : noImage
            }
            title={data.pages[0].results[0]?.title}
            text={data.pages[0].results[0]?.overview}
          />
        ) : null}
        <div className='p-4'>
          <Grid header={query ? 'Search Result' : 'Popular Movies'}>
            {data &&
              data.pages &&
              data.pages.map(page =>
                page.results.map(movie => (
                  <Card
                    key={movie.id}
                    movieId={movie.id}
                    imgUrl={movie.backdrop_path ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path : noImage}
                    title={movie.original_title}
                    clickable
                  />
                ))
              )}
          </Grid>
          {isFetchingNextPage ? <div>Loading ...</div> : null}
        </div>
      </div>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const queryClient = new QueryClient();

  const endpoint = `${POPULAR_BASE_URL}&page=1`;

  const response = await fetch(endpoint);

  if (!response.ok) throw new Error('Error!');

  const data = (await response.json()) as Movies;

  await queryClient.prefetchInfiniteQuery(['movies', ''], () => data);

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))) // Hack to get prefetchInfiniteQuery work https://github.com/TanStack/query/issues/1458
    }
  };
}
