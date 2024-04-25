import { Users, db } from "astro:db";
import { getRandomId } from "@wolf-project/shared/helpers";

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Users).values([
    { userId: getRandomId()  ,name: 'Mari Arukask', email: 'mari@veebihunt.ee', role: 'client', language: 'en', job: 'admin' },
    { userId: getRandomId()  ,name: 'Ayrton Mägipõld', email: 'ayrton@veebihunt.ee', role: 'limited', language: 'en', job: 'admin' },
    { userId: getRandomId()  ,name: 'Ayrton Mägipõld', email: 'ayrton.magipold@voco.ee', role: 'admin', language: 'en', job: 'admin' }
  ])
}
