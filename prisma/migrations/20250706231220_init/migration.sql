/*
  Warnings:

  - You are about to drop the `categorypost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `posts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_authorId_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_categoryPost_fkey";

-- DropTable
DROP TABLE "categorypost";

-- DropTable
DROP TABLE "posts";
