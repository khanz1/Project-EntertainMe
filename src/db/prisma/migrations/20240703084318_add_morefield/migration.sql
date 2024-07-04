/*
  Warnings:

  - Added the required column `itemImage` to the `Favorites` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemTitle` to the `Favorites` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemUrl` to the `Favorites` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Favorites" ADD COLUMN     "itemImage" TEXT NOT NULL,
ADD COLUMN     "itemRating" DOUBLE PRECISION,
ADD COLUMN     "itemTitle" TEXT NOT NULL,
ADD COLUMN     "itemUrl" TEXT NOT NULL;
