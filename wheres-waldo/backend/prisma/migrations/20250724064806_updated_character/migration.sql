/*
  Warnings:

  - Added the required column `uuid` to the `timings` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "timings_username_key";

-- AlterTable
ALTER TABLE "timings" ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "uuid" TEXT NOT NULL,
ADD CONSTRAINT "timings_pkey" PRIMARY KEY ("id");
