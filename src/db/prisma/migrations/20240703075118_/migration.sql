/*
  Warnings:

  - A unique constraint covering the columns `[userId,itemId]` on the table `Favorites` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Favorites_userId_itemId_key" ON "Favorites"("userId", "itemId");
