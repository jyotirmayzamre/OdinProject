/*
  Warnings:

  - A unique constraint covering the columns `[userId,name,parentId]` on the table `entities` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "entities_userId_name_parentId_key" ON "entities"("userId", "name", "parentId");
