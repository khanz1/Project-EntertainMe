"use client";
import { fLowercaseUnderscore } from "@/utils/formatter.helper";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { useDebouncedState, useDebouncedValue } from "@mantine/hooks";
import { FetchProps, Film, FILM_FILTERS, ResData } from "./types/film.type";
import { fetchMovies, fetchTVSeries } from "./film.action";

export type FilmContextProps = {
  filmList: ResData<Film[]>;
  setFilmList: React.Dispatch<React.SetStateAction<ResData<Film[]>>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  filter: FILM_FILTERS;
  setFilter: React.Dispatch<React.SetStateAction<FILM_FILTERS>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  hasMoreFilm: boolean;
};
const FilmContext = createContext<FilmContextProps | undefined>(undefined);

export type FilmProviderProps = {
  children: React.ReactNode;
};

export const filmState: ResData<Film[]> = {
  page: 1,
  results: [],
  total_pages: 1,
  total_results: 1,
};

export const fetchFilmList = async (
  props: FetchProps
): Promise<ResData<Film[]>> => {
  const [movies, tvSeriesList] = await Promise.all([
    fetchMovies(props),
    fetchTVSeries(props),
  ]);

  const results = [...tvSeriesList.results, ...movies.results];
  return {
    page: movies.page,
    results,
    total_pages: Math.max(movies.total_pages, tvSeriesList.total_pages),
    total_results: movies.total_results + tvSeriesList.total_results,
  };
};

export const FilmProvider = ({ children }: Readonly<FilmProviderProps>) => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<FILM_FILTERS>(FILM_FILTERS.POPULAR);
  const [filmList, setFilmList] = useState<ResData<Film[]>>(filmState);
  const [search, setSearch] = useState("");
  const [debounced] = useDebouncedValue(search, 500);

  useEffect(() => {
    (async () => {
      console.log(debounced, "<<d");
      const filterResult = fLowercaseUnderscore(filter) as FILM_FILTERS;
      const data = await fetchFilmList({
        page,
        filter: filterResult,
        search: debounced,
      });

      if (page === 1) {
        setFilmList(data);
      } else {
        setFilmList((prev) => ({
          ...prev,
          results: [...prev.results, ...data.results],
        }));
      }
    })();
  }, [page, filter, debounced]);

  const state = useMemo(() => {
    return {
      filmList,
      page,
      filter,
      search,
      setFilmList,
      setPage,
      setFilter,
      setSearch,
      hasMoreFilm:
        filmList.results.length === 0
          ? true
          : filmList.results.length < filmList.total_results,
    };
  }, [
    filmList,
    setFilmList,
    page,
    setPage,
    filter,
    setFilter,
    search,
    setSearch,
  ]);

  return <FilmContext.Provider value={state}>{children}</FilmContext.Provider>;
};

export const useFilm = () => {
  const context = React.useContext(FilmContext);
  if (context === undefined) {
    throw new Error("useFilm must be used within a MovieProvider");
  }
  return context;
};
