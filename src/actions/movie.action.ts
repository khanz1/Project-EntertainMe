"use server";

import { TMDB_ACCESS_TOKEN, TMDB_HOST } from "@/constant";
import { BriefMovie, Movie, ResData } from "@/types/movie.type";

export type FetchMoviesProps = {
  page: {
    number: number;
    size: number;
  };
  search: string;
};

export const fetchMovies = async (): Promise<ResData> => {
  const url = new URL(`${TMDB_HOST}/3/movie/popular`);

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
    },
  });

  return await response.json();
};

export const fetchMovieById = async (id: number): Promise<Movie> => { 
  const url = new URL(`${TMDB_HOST}/3/movie/${id}`);

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
    },
  });

  return await response.json();
}