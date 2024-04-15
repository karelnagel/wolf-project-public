import React, { useState } from "react";
import { client, useAPI } from "../trpc/client";
import { Comment } from "../trpc/routes/comments";

interface CommentProps {
  taskRef: string;
  commenterId: string;
}

export const AddComment: React.FC<CommentProps> = ({ taskRef, commenterId }) => {
  const [comment, setComment] = useState("");
  const { mutate, error, isLoading } = useAPI(client.comments.create.mutate);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params: Omit<Comment, "commentId"> = {
      taskRef,
      body: comment,
      commenterId,
    };
    await mutate(params);
    window.location.reload();
  };

  return (
    <>
      <div>
        <form onSubmit={onSubmit} className="flex flex-col items-center gap-2">
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            type="textbox"
          />
          {error && <div>{error.message}</div>}
          <button type="submit" className="button" disabled={isLoading}>
            {isLoading ? "Töötlemas" : "Kommenteeri"}
          </button>
        </form>
      </div>
    </>
  );
};
