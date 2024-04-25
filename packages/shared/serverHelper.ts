import jwt from "jsonwebtoken";
import { env } from "@wolf-project/shared/env";


export const verifyToken = (token: string | undefined) => {
    if (!token) return null;

    try {
        const result = jwt.verify(token, env.JWT_SECRET) as { userId: string };
        return result.userId;
    } catch (error) {
        return null;
    }
}