import { getFilmList } from "@/features/film/film.action";
import getFilteredFilms from "@/features/film/film.repository";
import { FILM_FILTERS } from "@/features/film/types/film.type";
export const GET = async () => {
  const filmList = await getFilteredFilms(FILM_FILTERS.POPULAR);

  return Response.json(filmList);
}