import { getRandomId } from "@wolf-project/shared/helpers";
import { db } from ".";
import { usersTable } from "./schema";

const addUser = async (email: string, name: string) => {
  const res = await db
    .insert(usersTable)
    .values({
      id: getRandomId(),
      email,
      name,
      language: "et",
      role: "admin",
      job: "Construction worker",
    })
    .returning()
    .onConflictDoNothing();
  console.log(res);
};

const email = process.argv[2];
const name = process.argv[3];
if (!email || !name) {
  console.log("Email and name are required");
  process.exit(1);
}
addUser(email, name);
