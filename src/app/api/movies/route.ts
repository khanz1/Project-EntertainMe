import { TMDB_ACCESS_TOKEN, TMDB_HOST } from "@/constant";
import { NextResponse } from "next/server";

export const GET = async () => {
  const url = new URL(`${TMDB_HOST}/3/movie/popular`);

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
    },
  });

  const movies = await response.json();
  return NextResponse.json(movies);
};
