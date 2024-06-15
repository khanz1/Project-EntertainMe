"use server";

import { TMDB_ACCESS_TOKEN, TMDB_HOST } from "@/constant";
import {
  FetchProps,
  FILM_TYPE,
  Genre,
  ResData,
  Review,
  WithType,
} from "./types/film.type";
import { Movie, MovieDetail, Season } from "./types/movie.type";
import { TVSeries, TVSeriesDetail } from "./types/series.type";

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

  const movies: ResData<WithType<Movie>[]> = await response.json();
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

  const tvSeriesList: ResData<WithType<TVSeries>[]> = await response.json();
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


export const fetchSeasonByTvId = async (tvId: number, seasonNumber: number): Promise<Season> => {
  const url = new URL(`${TMDB_HOST}/3/tv/${tvId}/season/${seasonNumber}`);
  console.log(url, '<<url')

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
    },
  });

  return await response.json();
}