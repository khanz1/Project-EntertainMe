/*
  Warnings:

  - The values [Movie,TVSeries,Manga,Anime] on the enum `ItemType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ItemType_new" AS ENUM ('movie', 'tv', 'manga', 'anime');
ALTER TABLE "Favorites" ALTER COLUMN "itemType" TYPE "ItemType_new" USING ("itemType"::text::"ItemType_new");
ALTER TYPE "ItemType" RENAME TO "ItemType_old";
ALTER TYPE "ItemType_new" RENAME TO "ItemType";
DROP TYPE "ItemType_old";
COMMIT;
