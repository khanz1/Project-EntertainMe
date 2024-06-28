export interface Keyword {
  id: number;
  name: string;
}

export interface KeywordCollection {
  id: number;
  keywords: Keyword[];
}
