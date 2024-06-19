/*
  Warnings:

  - Added the required column `author` to the `KudosBoard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `KudosBoard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KudosBoard" ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL;
