import slugify from 'slugify';

/**
 * Generates a slug from the given title and appends the provided id.
 *
 * This function uses the `slugify` library to create a URL-friendly slug from the provided title.
 * It replaces spaces with underscores, removes certain characters, converts the string to lower case,
 * and applies locale-specific rules. The resulting slug is then concatenated with the given id.
 *
 * @param {string} title - The title from which to generate the slug.
 * @param {number} id - The id to append to the slug.
 * @returns {string} The generated slug.
 */
export const fSlug = (title: string, id: number): string => {
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
  return parseInt(parts[parts.length - 1], 10);
};