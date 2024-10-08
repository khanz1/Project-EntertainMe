import slugify from 'slugify';

/**
 * Generates a slug from the given title and appends the provided id.
 *
 * This function uses the `slugify` library to create a URL-friendly slug from the provided title.
 * It replaces spaces with underscores, removes certain characters, converts the string to lower case,
 * and applies locale-specific rules. The resulting slug is then concatenated with the given id.
 *
 * @param {string} title - The title from which to generate the slug.
 * @param {number|string} id - The id to append to the slug.
 * @returns {string} The generated slug.
 */
export const fSlug = (title: string, id: number | string): string => {
  const slug = slugify(title, {
    replacement: '-', // Replace spaces with underscores
    remove: /[*+~.()'"!:@]/g, // Remove these characters
    lower: true, // Convert to lower case
    strict: true, // Strip special characters except replacement
    locale: 'en', // Apply specific locale rules
  });
  return `${slug}-${id}`;
};

/**
 * Extracts the id from a given slug.
 *
 * This function takes a slug string in the format "slug-id" and returns the id part as a number.
 *
 * @param {string} slug - The slug from which to extract the id.
 * @returns {number} The extracted id.
 */
export const parseIdFromSlug = (slug: string): number => {
  const parts = slug.split('-');
  if (parts.length === 1) {
    // If the slug does not contain an id, then the name is the id
    // because the link doesn't provide the movie/@tv name
    if (isNaN(Number(parts[0]))) {
      // TODO: next we have to handle the error correctly
      throw new Error('Invalid slug format');
    } else {
      return Number(parts[0]);
    }
  }

  return parseInt(parts[parts.length - 1], 10);
};

export const parseTitleAndIdFromSlug = (slug: string): { title: string; id: number } => {
  const parts = slug.split('-');
  let id = 0;
  if (parts.length === 1) {
    // If the slug does not contain an id, then the name is the id
    // because the link doesn't provide the movie/@tv name
    if (isNaN(Number(parts[0]))) {
      // TODO: next we have to handle the error correctly
      throw new Error('Invalid slug format');
    } else {
      id = Number(parts[0]);
    }
  }

  id = parseInt(parts[parts.length - 1], 10);

  const title = parts.slice(0, parts.length - 1).join(' ');
  return { title, id };
};

/**
 * Extracts the Manga ID (UUID) from a given URL slug.
 *
 * This function uses a regular expression to search for a UUIDv4 pattern in the provided URL.
 * If a match is found, it returns the UUID. Otherwise, it returns null.
 *
 * @param {string} url - The URL slug from which to extract the Manga ID.
 * @returns {string | null} The extracted Manga ID if found, otherwise null.
 */
export const parseMangaIdFromSlug = (url: string): string | null => {
  // Create a regular expression to match the UUIDv4 pattern
  const uuidV4Pattern = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/;

  // Use the match method to find the UUID in the URL
  const match = url.match(uuidV4Pattern);

  // If a match is found, return the UUID, otherwise return null
  return match ? match[0] : null;
};
