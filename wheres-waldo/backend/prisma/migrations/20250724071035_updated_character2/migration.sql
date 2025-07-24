/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `timings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "timings_uuid_key" ON "timings"("uuid");
