import { FetchProps, ResData, type ResFailed, WithType } from '@/features/film/types/film.type';
import { TMDB_ACCESS_TOKEN, TMDB_HOST } from '@/constant';
import { Movie } from '@/features/film/types/movie.type';


export const fetchMovies = async (props?: Partial<FetchProps>) => {
  let url = new URL(`${TMDB_HOST}/3/movie/${props?.filter}`);
  if (props?.search) {
    url = new URL(`${TMDB_HOST}/3/search/movie`);
    url.searchParams.append('query', props.search);
  }

  if (props?.page) {
    url.searchParams.append('page', String(props.page));
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
    },
  });

  const movies: ResData<WithType<Movie>[]> | ResFailed = await response.json();
  if ('success' in movies) {
    return {
      page: 0,
      results: [],
      total_pages: 0,
      total_results: 0,
    };
  }

  return movies;
};