import { movieUrl, creditsUrl, IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE } from '../config';
// Basic fetch
import { basicFetch } from '../api/fetchFunctions';
// Components
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import MovieInfo from '../components/MovieInfo/MovieInfo';
import Grid from '../components/Grid/Grid';
import Card from '../components/Card/Card';
// Fallback image
import noImage from '../public/no_image.jpg';
// Types
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { Movie, Credits, Crew, Cast } from '../api/types';

type Props = {
  movie: Movie;
  directors: Crew[];
  cast: Cast[];
};

const Product: NextPage<Props> = ({ movie, cast, directors }) => (
  <div className='pt-24'>
    <Breadcrumb title={movie.original_title} />
    <MovieInfo
      thumbUrl={movie.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path : noImage}
      backgroundImgUrl={movie.backdrop_path ? IMAGE_BASE_URL + BACKDROP_SIZE + movie.backdrop_path : noImage}
      title={movie.original_title}
      summary={movie.overview}
      rating={movie.vote_average}
      directors={directors}
      time={movie.runtime}
      budget={movie.budget}
      revenue={movie.revenue}
    />
    <div className='p-4 max-w-7xl m-auto'>
      <Grid title='Actors'>
        {cast.map(actor => (
          <Card
            key={actor.credit_id}
            imgUrl={actor.profile_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}` : noImage}
            title={actor.name}
            subtitle={actor.character}
          />
        ))}
      </Grid>
    </div>
  </div>
);

export default Product;

export const getStaticProps: GetStaticProps = async context => {
  const movieEndpoint: string = movieUrl(context.params?.id as string);
  const creditsEndpoint: string = creditsUrl(context.params?.id as string);

  const movie = await basicFetch<Movie>(movieEndpoint);
  const credits = await basicFetch<Credits>(creditsEndpoint);

  // Get the directors only
  const directors = credits.crew.filter(member => member.job === 'Director');

  return {
    props: {
      movie,
      directors,
      cast: credits.cast
    }
  };
};

// This will server generate static pages when they're visited the first time. Then, a pre-rendered
// static version will be used, if visited again
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  };
};
