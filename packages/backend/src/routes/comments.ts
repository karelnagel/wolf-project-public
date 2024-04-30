import { privateProcedure, root } from "../root";
import { db } from "@wolf-project/db";
import { commentsTable, Comment } from "@wolf-project/db/schema";
import { getRandomId } from "@wolf-project/shared/helpers";

export const comments = root.router({
  create: privateProcedure
    .input(Comment.omit({ id: true, createdAt: true, commenterId: true }))
    .output(Comment)
    .mutation(async ({ input: { taskId, body }, ctx: { user } }) => {
      const comments = await db
        .insert(commentsTable)
        .values({ id: getRandomId(), taskId, body, commenterId: user.id, createdAt: new Date() })
        .returning();
      return comments[0]!;
    }),
});
