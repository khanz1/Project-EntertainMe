export interface Keyword {
  id: number;
  name: string;
}

export interface MovieKeywordCollection {
  id: number;
  keywords: Keyword[];
}

export interface TVKeywordCollection {
  id: number;
  results: Keyword[];
}

export type KeywordCollection = MovieKeywordCollection | TVKeywordCollection;