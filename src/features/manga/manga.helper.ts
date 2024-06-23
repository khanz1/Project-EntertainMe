import { GetMangaCoverParams, MangaFileSize } from '@/features/manga/manga.type';

/**
 * Constructs the URL for a manga cover image from the MangaDex API.
 *
 * This function generates the URL for a manga cover image based on the provided parameters.
 * It supports different image sizes by appending the size to the file name.
 *
 * @param {GetMangaCoverParams} props - The parameters required to construct the cover image URL.
 * @param {MangaFileSize} [size=MangaFileSize.ORIGINAL] - The desired size of the cover image. Defaults to original size.
 * @returns {string} The URL of the manga cover image.
 */
export const getMangaCover = (props: GetMangaCoverParams, size: MangaFileSize = MangaFileSize.ORIGINAL): string => {
  if (size === MangaFileSize.ORIGINAL) {
    return `https://uploads.mangadex.org/covers/${props.mangaId}/${props.fileName}`;
  }

  return `https://uploads.mangadex.org/covers/${props.mangaId}/${props.fileName}.${size}.jpg`;
};

