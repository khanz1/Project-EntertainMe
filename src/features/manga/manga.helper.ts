import { GetMangaCoverParams, Manga, MangaFileSize } from '@/features/manga/manga.type';
import { APP } from '@/constant';

/**
 * Constructs the URL for a manga cover image from the MangaDex API.
 *
 * This function generates the URL for a manga cover image based on the provided parameters.
 * It supports different image sizes by appending the size to the file name.
 *
 * @param {GetMangaCoverParams} props - The parameters required to construct the cover image URL.
 * @param {MangaFileSize} [size=MangaFileSize.ORIGINAL] - The desired size of the cover image. Defaults to original size.
 * @returns {string} The absolute URL of the manga cover image.
 */
export const getMangaCover = (props: GetMangaCoverParams, size: MangaFileSize = MangaFileSize.ORIGINAL): string => {
  // let ORIGIN = getOrigin();
  // if (size === MangaFileSize.ORIGINAL) {
  //   return `https://uploads.mangadex.org/covers/${props.mangaId}/${props.fileName}`;
  // }
  //
  // return `https://uploads.mangadex.org/covers/${props.mangaId}/${props.fileName}.${size}.jpg`;

  if (!props.fileName) {
    return 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';
  }
  // const h = headers();

  let url: URL;

  if (typeof window === 'undefined') {
    url = new URL(APP.WEB_URL);
  } else {
    url = new URL(window.location.origin);
  }

  if (size === MangaFileSize.ORIGINAL) {
    url.pathname = `/api/manga/covers/${props.mangaId}/${props.fileName}`;
  } else {
    url.pathname = `/api/manga/covers/${props.mangaId}/${props.fileName}.${size}.jpg`;
  }

  return url.toString();
};

export const getMangaTitle = (manga: Manga) => {
  const titleLang = Object.keys(manga.attributes.title)[0];
  return manga.attributes.title.en || manga.attributes.title[titleLang];
};
