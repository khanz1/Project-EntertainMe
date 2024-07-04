/*
  Warnings:

  - Added the required column `itemOverview` to the `Favorites` table without a default value. This is not possible if the table is not empty.
  - Made the column `itemRating` on table `Favorites` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Favorites" ADD COLUMN     "itemOverview" TEXT NOT NULL,
ALTER COLUMN "itemRating" SET NOT NULL;
