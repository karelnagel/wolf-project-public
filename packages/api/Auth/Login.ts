import { db, Users, like } from "astro:db";
import jwt from "jsonwebtoken";

export const Login = async (email: string ) => {
    const user = await db.select().from(Users).where(like(Users.email, email));

    if (user != null) {
    try {                                                  /*not actually process.env.*/
            const token = jwt.sign({ userId: Users.userId }, process.env.JWT_SECRET!, {
                expiresIn: "1h",
            });
            console.log(token);
        } catch (e) {
            return "Error logging in. Please try again";
        }
    }
    return "Check your email to finish logging in!";
};