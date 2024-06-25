import { FILM_FILTERS } from '@/features/film/types/film.type';
import { Container } from '@mantine/core';
import { fetchMovies } from '@/features/film/actions/movie.action';
import { MovieList } from '@/features/film/components/movies/MovieList';

type PageProps = {
  searchParams: {
    search?: string;
    page?: string;
    filter?: string;
  }
}

export default async function Page({ searchParams }: PageProps) {
  const search = searchParams.search || '';
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const filter = searchParams.filter
    ? searchParams.filter as FILM_FILTERS
    : search
      ? FILM_FILTERS.NONE
      : FILM_FILTERS.POPULAR;

  const movies = await fetchMovies({
    page,
    filter,
    search,
  });

  const hasMoreMovies =
    movies.results.length === 0
      ? true
      : movies.results.length < movies.total_results;

  return (
    <Container size="xl" my={25}>
      <MovieList movies={movies} page={page} hasMoreMovies={hasMoreMovies} filter={filter} />
    </Container>
  );
}