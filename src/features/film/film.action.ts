'use server';

import { FetchProps, Film, FILM_FILTERS, ResData, ResFailed, WithType } from './types/film.type';
import { Movie, Season } from './types/movie.type';
import { TVSeries } from './types/series.type';
import { ItemType } from '@prisma/client';
import { APP } from '@/constant';

export type FetchFilmList = (
  props: Partial<FetchProps>,
) => Promise<ResData<Film[]>>;


export const fetchFilmList: FetchFilmList = async (props) => {
  const [movies, tvSeriesList] = await Promise.all([
    fetchMovies(props),
    fetchTVSeries(props),
  ]);

  let results = [...tvSeriesList.results, ...movies.results];
  if (props?.filter === FILM_FILTERS.POPULAR) {
    results = results.toSorted((a, b) => b.popularity - a.popularity);
  } else if (props?.filter === FILM_FILTERS.TOP_RATED) {
    results = results.toSorted((a, b) => b.vote_average - a.vote_average);
  }
  return {
    page: movies.page,
    results,
    total_pages: Math.max(movies.total_pages, tvSeriesList.total_pages),
    total_results: movies.total_results + tvSeriesList.total_results,
  };
};

export const fetchMovies = async (props?: Partial<FetchProps>) => {
  let url = new URL(`${APP.TMDB_HOST}/3/movie/${props?.filter}`);
  if (props?.search) {
    url = new URL(`${APP.TMDB_HOST}/3/search/movie`);
    url.searchParams.append('query', props.search);
  }

  if (props?.page) {
    url.searchParams.append('page', String(props.page));
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${APP.TMDB_ACCESS_TOKEN}`,
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
  const mappedMovies = movies.results.map((movie) => {
    movie.type = ItemType.movie;
    return movie;
  });

  return {
    ...movies,
    results: mappedMovies,
  };
};


export const fetchTVSeries = async (props?: Partial<FetchProps>) => {
  let url = new URL(`${APP.TMDB_HOST}/3/tv/${props?.filter}`);

  if (props?.search) {
    url = new URL(`${APP.TMDB_HOST}/3/search/tv`);
    url.searchParams.append('query', props.search);
  }

  if (props?.page) {
    url.searchParams.append('page', String(props.page));
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${APP.TMDB_ACCESS_TOKEN}`,
    },
  });

  const tvSeriesList: ResData<WithType<TVSeries>[]> | ResFailed =
    await response.json();
  if ('success' in tvSeriesList) {
    return {
      page: 0,
      results: [],
      total_pages: 0,
      total_results: 0,
    };
  }
  const mappedTvSeriesList = tvSeriesList.results.map((tvSeries) => {
    tvSeries.type = ItemType.tv;
    return tvSeries;
  });

  return {
    ...tvSeriesList,
    results: mappedTvSeriesList,
  };
};

export const fetchSeasonByTvId = async (
  tvId: number,
  seasonNumber: number,
): Promise<Season> => {
  const url = new URL(`${APP.TMDB_HOST}/3/tv/${tvId}/season/${seasonNumber}`);

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${APP.TMDB_ACCESS_TOKEN}`,
    },
  });

  return await response.json();
};
