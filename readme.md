# Wolf Project

## Requirements

- NodeJS and NPM installed (if not installed, I recommend using [NVM](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating) to install them).

Uses sst ion, install here: https://ion.sst.dev/

It is using astro:db for database, which should automatically create a local db file, with no setup required.

## Obtaining API Keys from [AWS](https://console.aws.amazon.com)

1. Search for `IAM` and select the option with the description `Manage access to AWS resources`.
2. Click on the Users tab on the left.
3. Click `Create user`.
4. Enter a username and click next.
5. Choose the `Attach policies directly` option and in the `Permissions policies` section, check the `AdministratorAccess` box, then click next.
6. Click `Create user`, which redirects you to the Users page, select the user you created.
7. Under `Access key 1`, click the `Create access key` button.
8. Select the `CLI` option, click next, and then `Create access key`.
9. Copy the `Access key ID` and `Secret access key` values into the .env file under `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`, respectively.

# Running the Project

1. Copy the .env.example file and rename it to .env.
2. Fill in the .env file with the correct values. AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY from the AWS configuration steps above.
3. Run `npm i` to install dependencies.
4. Start the backend with `npm run dev` in the root directory. You will be prompted for your STAGE_NAME. Deployment of your stack will take some time.
5. To start the frontend, open another terminal run `npm run dev-fe`.
   You can test if the project builds with npm run build and test if the types are correct with npm run typecheck.

You can test if the project builds with `npm run build` and test if the types are correct with `npm run typecheck`.

### seed.ts

```ts
import { db, Users } from "astro:db";

export default async function () {
  await db.insert(Users).values({
    userId: "321",
    email: "youremail@gmail.com",
    language: "en",
    name: "name",
    role: "admin",
    job: "tekst",
  });
}
```
