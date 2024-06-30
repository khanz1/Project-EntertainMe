'use client';
import { FILM_FILTERS } from '@/features/film/types/film.type';
import { Container } from '@mantine/core';
import { fetchMovies } from '@/features/film/actions/movie.action';
import { MovieList } from '@/features/film/components/movies/MovieList';
import { useEffect, useMemo, useState } from 'react';
import { Movie } from '@/features/film/types/movie.type';
import { useRouter } from 'next/navigation';

type PageProps = {
  searchParams: {
    search?: string;
    page?: string;
    filter?: string;
  }
}

export default function Page({ searchParams }: PageProps) {
  const router = useRouter();
  const [movies, setMovies] = useState<ResgiData<Movie[]>>({
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  });
  const search = searchParams.search || '';
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const filter = searchParams.filter
    ? searchParams.filter as FILM_FILTERS
    : search
      ? FILM_FILTERS.NONE
      : FILM_FILTERS.POPULAR;


  // const movies = await fetchMovies({
  //   page,
  //   filter,
  //   search,
  // });

  useEffect(() => {
    (async () => {
      if (movies.results.length === 0 && page > 1) {
        const url = new URL(window.location.href);
        url.searchParams.set('page', '1');
        router.push(url.toString());
        return;
      }
      const data = await fetchMovies({
        page,
        filter,
        search,
      });

      if (movies.results.length === 0) {
        setMovies(data);
      } else {
        setMovies((prevMovies) => ({
          ...data,
          results: [...prevMovies.results, ...data.results],
        }));
      }
    })();
  }, [page, filter, search]);

  const hasMoreMovies = useMemo(() => {
    return movies.results.length === 0
      ? true
      : movies.results.length < movies.total_results;
  }, [movies]);
  // const hasMoreMovies = movies.results.length === 0
  //   ? true
  //   : movies.results.length < movies.total_results;

  return (
    <Container size="xl" my={25}>
      <MovieList movies={movies} page={page} hasMoreMovies={hasMoreMovies} filter={filter} />
    </Container>
  );
}