/*
  Warnings:

  - The primary key for the `PointCount` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `PointCount` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PointCount" DROP CONSTRAINT "PointCount_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "PointCount_pkey" PRIMARY KEY ("userId");
