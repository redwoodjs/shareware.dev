import { defineScript } from "rwsdk/worker";
import { db, setupDb } from "@/db";
import { env } from "cloudflare:workers";

export default defineScript(async () => {
  await setupDb(env);

  await db.$executeRawUnsafe(`\
    DELETE FROM AddOn;
    DELETE FROM AddOnTag;
    DELETE FROM Category;
    DELETE FROM Status;
    DELETE FROM Subscriber;
    DELETE FROM Tag;
    DELETE FROM User;
    DELETE FROM sqlite_sequence;
  `);

  await db.category.createMany({
    data: [
      { id: 1, name: "Productivity" },
      { id: 2, name: "Developer Tools" },
      { id: 3, name: "Design" },
      { id: 4, name: "Utilities" },
      { id: 5, name: "Media" },
      { id: 6, name: "Finance" },
      { id: 7, name: "AI" },
      { id: 8, name: "Web Services" },
      { id: 9, name: "Communication" },
      { id: 10, name: "Lifestyle" },
    ],
  });

  await db.status.createMany({
    data: [
      { id: 1, name: "archived" },
      { id: 2, name: "pending" },
      { id: 3, name: "approved" },
    ],
  });

  await db.role.createMany({
    data: [
      { id: 1, name: "admin" },
      { id: 2, name: "user" },
    ],
  });

  console.log("🌱 Finished seeding");
});
