/*
  Warnings:

  - Added the required column `startTime` to the `Lecture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lecture" ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;
