import { z } from "zod";
import { publicProcedure, root } from "../root";
import { Comments, db } from "astro:db";
import { getRandomId } from "@wolf-project/shared/helpers";

const CommentZod = z.object({
  commentId: z.string(),
  taskRef: z.string(),
  body: z.string(),
  commenterId: z.string(),
  commentedAt: z.date(),
});
export type Comment = z.infer<typeof CommentZod>;
export const comments = root.router({
  create: publicProcedure
    .input(CommentZod.omit({ commentId: true, commentedAt: true }))
    .output(CommentZod)
    .mutation(async ({ input: { taskRef, body, commenterId } }) => {
      const comments = await db
        .insert(Comments)
        .values({ commentId: getRandomId(), taskRef, body, commenterId, commentedAt: new Date() })
        .returning();
      return comments[0]!;
    }),
});
