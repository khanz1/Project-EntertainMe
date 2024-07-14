//! MANGA TYPES
type LanguageCode =
  | 'en'
  | 'ja'
  | 'pt-br'
  | 'es-la'
  | 'it'
  | 'es'
  | 'zh-ro'
  | 'zh'
  | 'ru'
  | 'uk'
  | 'ko'
  | 'ar'
  | 'el'
  | 'vi'
  | 'tr'
  | 'pl'
  | 'id';

interface Title {
  en: string;

  [key: string]: string;
}

interface Description {
  en: string;

  [key: string]: string;
}

interface Links {
  al?: string;
  ap?: string;
  bw?: string;
  kt?: string;
  mu?: string;
  amz?: string;
  cdj?: string;
  ebj?: string;
  mal?: string;
  raw?: string;
  engtl?: string;
  nu?: string;
}

interface TagAttributes {
  name: Title;
  description: Description;
  group: string;
  version: number;
}

interface Tag {
  id: string;
  type: string;
  attributes: TagAttributes;
  relationships: any[];
}

interface Attributes {
  title: Title;
  altTitles: Title[];
  description: Description;
  isLocked: boolean;
  links: Links;
  originalLanguage: string;
  lastVolume: string;
  lastChapter: string;
  publicationDemographic: string | null;
  status: string;
  year: number;
  contentRating: string;
  tags: Tag[];
  state: string;
  chapterNumbersResetOnNewVolume: boolean;
  createdAt: string;
  updatedAt: string;
  version: number;
  availableTranslatedLanguages: LanguageCode[];
  latestUploadedChapter: string;
}

interface Relationship {
  id: string;
  type: string;
  related?: string;
}

export interface Manga {
  id: string;
  type: string;
  attributes: Attributes;
  relationships: Relationship[];
}

export interface MangaCollection {
  result: string;
  response: string;
  data: Manga[];
  limit: number;
  offset: number;
  total: number;
}

export interface MangaResponse {
  result: string;
  response: string;
  data: Manga;
}

// COVER TYPE
interface CoverAttributes {
  description: string;
  volume: string;
  fileName: string;
  locale: string;
  createdAt: string;
  updatedAt: string;
  version: number;
}

interface CoverRelationship {
  id: string;
  type: string;
}

export interface Cover {
  id: string;
  type: string;
  attributes: CoverAttributes;
  relationships: CoverRelationship[];
}

export interface CoverCollection {
  result: string;
  response: string;
  data: Cover;
}

// MANGA STATISTICS
interface Comments {
  threadId: number;
  repliesCount: number;
}

interface RatingDistribution {
  [key: string]: number;
}

interface Rating {
  average: number;
  bayesian: number;
  distribution: RatingDistribution;
}

interface MangaStatistics {
  comments: Comments;
  rating: Rating;
  follows: number;
}

interface Statistics {
  [mangaId: string]: MangaStatistics;
}

export interface MangaStatisticsResponse {
  result: string;
  statistics: Statistics;
}

// ACTION
export enum MangaFileSize {
  ORIGINAL = 'original',
  LOW = '256',
  MEDIUM = '512',
}

export type GetMangaCoverParams = {
  mangaId: string;
  fileName: string;
};

export enum ContentRating {
  SAFE = 'safe',
  SUGGESTIVE = 'suggestive',
  EROTICA = 'erotica',
  PORNOGRAPHIC = 'pornographic',
}

export type FetchMangaOptions = {
  pageSize: number;
  page: number;
  searchTerm: string;
  selectedTags?: string[];
};
