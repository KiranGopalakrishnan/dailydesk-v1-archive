-- DropForeignKey
ALTER TABLE "AccessTokens" DROP CONSTRAINT "AccessTokens_userId_fkey";

-- AddForeignKey
ALTER TABLE "AccessTokens" ADD CONSTRAINT "AccessTokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "AccessTokens.token_unique" RENAME TO "AccessTokens_token_key";

-- RenameIndex
ALTER INDEX "token_status_unique_constraint" RENAME TO "AccessTokens_token_status_key";

-- RenameIndex
ALTER INDEX "Users.email_unique" RENAME TO "Users_email_key";

-- RenameIndex
ALTER INDEX "Users.password_unique" RENAME TO "Users_password_key";
