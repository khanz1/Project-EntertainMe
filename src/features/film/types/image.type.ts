export interface Image {
  aspect_ratio: number;
  height: number;
  iso_639_1: string | null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface ImageCollection {
  backdrops: Image[];
  id: number;
  logos: Image[];
  posters: Image[];
}