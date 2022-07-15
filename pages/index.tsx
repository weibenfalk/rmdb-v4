import React from 'react';
import Link from 'next/link';
import { dehydrate, QueryClient } from 'react-query';
// Fetch hooks
import { useFetchMovies } from '../api/fetchHooks';
// Basic fetch
import { basicFetch } from '../api/fetchFunctions';
// Config
import { IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE, POPULAR_BASE_URL } from '../config';
// Fallback image
import noImage from '../public/no_image.jpg';
// Components
import Hero from '../components/Hero/Hero';
import SearchInput from '../components/SearchInput/SearchInput';
import Grid from '../components/Grid/Grid';
import Card from '../components/Card/Card';
import Spinner from '../components/Spinner/Spinner';
// Types
import type { Movies } from '../api/types';
import type { NextPage, GetServerSideProps } from 'next';

const Home: NextPage = () => {
  const [query, setQuery] = React.useState('');

  const { data, fetchNextPage, isFetching, error } = useFetchMovies(query);

  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

    if (scrollHeight - scrollTop === clientHeight) {
      fetchNextPage();
    }
  };

  return (
    <div className='relative'>
      <div className='absolute w-full top-0 z-50 m-0 h-24 p-4 pointer-events-none'>
        <div className='relative max-w-7xl w-full h-full m-auto flex justify-end items-center'>
          <SearchInput setQuery={setQuery} />
        </div>
      </div>
      <div className='h-screen overflow-auto' onScroll={handleScroll}>
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
        <div className={`p-4 ${query ? 'pt-28' : ''} max-w-7xl m-auto`}>
          <Grid title={query ? `Search Result: ${data?.pages[0].total_results ?? ''}` : 'Popular Movies'}>
            {data && data.pages
              ? data.pages.map(page =>
                  page.results.map(movie => (
                    <Link key={movie.id} href={`/${movie.id}`}>
                      <div className='cursor-pointer hover:opacity-80 duration-300'>
                        <Card
                          imgUrl={movie.backdrop_path ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path : noImage}
                          title={movie.original_title}
                        />
                      </div>
                    </Link>
                  ))
                )
              : null}
          </Grid>
          {isFetching ? <Spinner /> : null}
        </div>
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  const endpoint = `${POPULAR_BASE_URL}&page=1`;

  const data = basicFetch<Movies>(endpoint);

  await queryClient.prefetchInfiniteQuery(['movies', ''], () => data);

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))) // Hack to get prefetchInfiniteQuery work https://github.com/TanStack/query/issues/1458
    }
  };
};
