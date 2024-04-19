import { db, Users, like } from "astro:db";
import jwt from "jsonwebtoken";
import { env } from "@wolf-project/shared/env";

export const login = async (email: string) => {
  const user = await db.select().from(Users).where(like(Users.email, email));

  if (user != null) {
    try {
      const token = jwt.sign({ userId: Users.userId }, env.JWT_SECRET, {
        expiresIn: "1h",
      });
      console.log(token);
    } catch (e) {
      return "Error logging in. Please try again";
    }
  }
  return "Check your email to finish logging in!";
};

export const verifyLoginSignature = (data: string) => {
  return jwt.verify(data, env.JWT_SECRET);
};
