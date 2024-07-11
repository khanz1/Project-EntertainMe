import '@mantine/carousel/styles.css';
import { fetchMovies } from '@/features/film/actions/movie.action';
import { FILM_FILTERS } from '@/features/film/types/film.type';
import { Hero, TopRatedMovies } from '@/features/app/landing/Hero';
import { Discover } from '@/features/app/landing/Discover';

export default async function Page() {
  const popularMovies = await fetchMovies({ page: 1, filter: FILM_FILTERS.POPULAR });
  const topRatedMovies = await fetchMovies({ page: 1, filter: FILM_FILTERS.TOP_RATED });

  return (
    <>
      <Hero movies={popularMovies} />
      <TopRatedMovies movies={topRatedMovies} />
      <Discover />
    </>
  );
}
