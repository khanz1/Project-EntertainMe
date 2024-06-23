interface Attributes {
  volume: string;
  chapter: string;
  title: string;
  translatedLanguage: string;
  externalUrl: string | null;
  publishAt: string;
  readableAt: string;
  createdAt: string;
  updatedAt: string;
  pages: number;
  version: number;
}

interface Relationship {
  id: string;
  type: string;
}

export interface Chapter {
  id: string;
  type: string;
  attributes: Attributes;
  relationships: Relationship[];
}

export interface ChapterCollection {
  result: string;
  response: string;
  data: Chapter[];
  limit: number;
  offset: number;
  total: number;
}

export type FetchChapterOptions = {
  pageSize: number,
  page: number,
  mangaId: string
  // volume: number
}

export interface ChapterResponse {
  result: string;
  baseUrl: string;
  chapter: {
    hash: string;
    data: string[];
    dataSaver: string[];
  };
}