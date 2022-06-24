/*
  Warnings:

  - A unique constraint covering the columns `[userId,token,status]` on the table `AccessTokens` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "userId_token_status_unique_key" ON "AccessTokens"("userId", "token", "status");
