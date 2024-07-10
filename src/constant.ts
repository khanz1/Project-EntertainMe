import { em } from '@mantine/core';

export class APP {
  static readonly NAME = 'Entertain Me';
  static readonly DESCRIPTION =
    'Entertain Me is your ultimate destination for a diverse range of entertainment options designed to keep you engaged and relaxed. Whether you’re in the mood for @movies, TV series, @manga, music, or calming ambient sounds, Entertain Me has got you covered.';
  static readonly NO_IMAGE =
    'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg';
  static readonly WEB_URL = 'https://entertainme.khanz1.dev';
  static readonly LOGO_IMAGE_UHD = `${this.WEB_URL}/images/FantasyCat.png`;
  static readonly MANGADEX_API_URL = 'https://api.mangadex.org';
  static readonly TMDB_HOST = process.env.TMDB_HOST!;
  static readonly TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN!;
  static readonly MOBILE_BREAKPOINT = `(max-width: ${em(750)})`;
}

export enum ImageSize {
  SMALL = 'w185',
  MEDIUM = 'w342',
  LARGE = 'w500',
  ORIGINAL = 'original',
}
