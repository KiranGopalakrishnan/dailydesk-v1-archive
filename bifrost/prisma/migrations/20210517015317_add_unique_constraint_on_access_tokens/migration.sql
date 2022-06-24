/*
  Warnings:

  - A unique constraint covering the columns `[token,status]` on the table `AccessTokens` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "token_status_unique_constraint" ON "AccessTokens"("token", "status");
