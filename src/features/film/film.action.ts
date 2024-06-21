"use server";

import { TMDB_ACCESS_TOKEN, TMDB_HOST } from "@/constant";
import {
  FetchProps,
  FILM_TYPE,
  Genre,
  ResData,
  type ResFailed,
  Review,
  WithType,
} from "./types/film.type";
import { Movie, MovieDetail, Season } from "./types/movie.type";
import { TVSeries, TVSeriesDetail } from "./types/series.type";

export const fetchMoviesByGenre = async (genreId: string) => {
  let url = new URL(`${TMDB_HOST}/3/discover/movie`);
  url.searchParams.append("with_genres", genreId);

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
    },
  });
  const data: ResData<Movie[]> = await response.json();
  return data;
};

export const fetchMovies = async (props?: Partial<FetchProps>) => {
  let url = new URL(`${TMDB_HOST}/3/movie/${props?.filter}`);
  if (props?.search) {
    url = new URL(`${TMDB_HOST}/3/search/movie`);
    url.searchParams.append("query", props.search);
  }

  if (props?.page) {
    url.searchParams.append("page", String(props.page));
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
    },
  });

  const movies: ResData<WithType<Movie>[]> | ResFailed = await response.json();
  if ("success" in movies) {
    return {
      page: 0,
      results: [],
      total_pages: 0,
      total_results: 0,
    };
  }
  console.log(movies, "<>>><MOVIES");
  const mappedMovies = movies.results.map((movie) => {
    movie.type = FILM_TYPE.MOVIE;
    return movie;
  });

  return {
    ...movies,
    results: mappedMovies,
  };
};

export const fetchMovieById = async (id: number): Promise<MovieDetail> => {
  const url = new URL(`${TMDB_HOST}/3/movie/${id}`);

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
    },
  });

  return await response.json();
};

export const fetchTVSeries = async (props?: Partial<FetchProps>) => {
  let url = new URL(`${TMDB_HOST}/3/tv/${props?.filter}`);

  if (props?.search) {
    url = new URL(`${TMDB_HOST}/3/search/tv`);
    url.searchParams.append("query", props.search);
  }

  if (props?.page) {
    url.searchParams.append("page", String(props.page));
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
    },
  });

  const tvSeriesList: ResData<WithType<TVSeries>[]> | ResFailed =
    await response.json();
  if ("success" in tvSeriesList) {
    return {
      page: 0,
      results: [],
      total_pages: 0,
      total_results: 0,
    };
  }
  const mappedTvSeriesList = tvSeriesList.results.map((tvSeries) => {
    tvSeries.type = FILM_TYPE.TV_SERIES;
    return tvSeries;
  });

  return {
    ...tvSeriesList,
    results: mappedTvSeriesList,
  };
};

export const fetchSeriesById = async (id: number): Promise<TVSeriesDetail> => {
  const url = new URL(`${TMDB_HOST}/3/tv/${id}`);

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
    },
  });

  return await response.json();
};

export const fetchGenres = async (filmType: FILM_TYPE) => {
  const url = new URL(`${TMDB_HOST}/3/genre/${filmType}/list`);

  url.searchParams.append("language", "en");

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
    },
  });

  const data = await response.json();

  return data.genres as Genre[];
};

export const fetchReviews = async (
  movieId: number,
  filmType: FILM_TYPE
): Promise<ResData<Review[]>> => {
  const url = new URL(`${TMDB_HOST}/3/${filmType}/${movieId}/reviews`);

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
    },
  });

  return await response.json();
};

export const fetchSeasonByTvId = async (
  tvId: number,
  seasonNumber: number
): Promise<Season> => {
  const url = new URL(`${TMDB_HOST}/3/tv/${tvId}/season/${seasonNumber}`);

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
    },
  });

  return await response.json();
};
