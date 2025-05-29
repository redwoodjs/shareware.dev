-- CreateIndex
CREATE UNIQUE INDEX "User_token_key" ON "User"("token");

-- CreateIndex
CREATE INDEX "User_email_token_idx" ON "User"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_token_key" ON "User"("email", "token");
