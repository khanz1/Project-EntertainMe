// Base structure for API response
interface ApiResponse {
  result: string;
  response: string;
  data: DataItem[];
  limit: number;
  offset: number;
  total: number;
}

// Represents each item in the "data" array
interface DataItem {
  id: string;
  type: string;
  attributes: Attributes;
  relationships: Relationship[];
}

// Attributes associated with each DataItem
interface Attributes {
  title: Record<string, string>;
  altTitles: Record<string, string>[];
  description: Record<string, string>;
  isLocked: boolean;
  links: Record<string, string>;
  originalLanguage: string;
  lastVolume: string;
  lastChapter: string;
  publicationDemographic: string;
  status: string;
  year: number;
  contentRating: string;
  chapterNumbersResetOnNewVolume: boolean;
  availableTranslatedLanguages: string[];
  latestUploadedChapter: string;
  tags: Tag[];
  state: string;
  version: number;
  createdAt: string;
  updatedAt: string;
}

// Tag structure within Attributes
interface Tag {
  id: string;
  type: string;
  attributes: TagAttributes;
  relationships: Relationship[];
}

// Attributes for tags
interface TagAttributes {
  name: Record<string, string>;
  description: Record<string, string>;
  group: string;
  version: number;
}

// Relationships associated with DataItem and Tag
interface Relationship {
  id: string;
  type: string;
  related: string;
  attributes: Record<string, unknown>; // Use unknown type if attributes are unspecified or can vary
}
