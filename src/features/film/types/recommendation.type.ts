export interface RecommendationBase {
  backdrop_path: string;
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieRecommendation extends RecommendationBase {
  title: string;
}

export interface TVRecommendation extends RecommendationBase {
  name: string;
}