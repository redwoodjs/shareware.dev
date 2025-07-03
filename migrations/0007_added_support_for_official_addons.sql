-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AddOn" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatar" TEXT,
    "cover" TEXT,
    "demo" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "repo" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "official" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "statusId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AddOn_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AddOn_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AddOn" ("avatar", "categoryId", "cover", "createdAt", "demo", "description", "email", "featured", "firstName", "id", "lastName", "name", "order", "owner", "repo", "statusId") SELECT "avatar", "categoryId", "cover", "createdAt", "demo", "description", "email", "featured", "firstName", "id", "lastName", "name", "order", "owner", "repo", "statusId" FROM "AddOn";
DROP TABLE "AddOn";
ALTER TABLE "new_AddOn" RENAME TO "AddOn";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
