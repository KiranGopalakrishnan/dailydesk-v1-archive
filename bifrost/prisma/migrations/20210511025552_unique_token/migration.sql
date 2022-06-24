/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `AccessTokens` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AccessTokens.token_unique" ON "AccessTokens"("token");
