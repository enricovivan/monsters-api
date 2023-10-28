/*
  Warnings:

  - Added the required column `imgURL` to the `Monsters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Monsters" ADD COLUMN     "imgURL" TEXT NOT NULL;
