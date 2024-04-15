import React, { useState } from "react";
import { client, useAPI } from "../trpc/client";
import { Comment } from "../trpc/routes/comments";

export const AddComment = ({ taskRef }: { taskRef: string }) => {
  const [comment, setComment] = useState("");
  const { mutate, error, isLoading } = useAPI(client.comments.create.mutate);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params: Omit<Comment, "commentId"> = {
      taskRef,
      body: comment,
    };
    await mutate(params);
    window.location.reload();
  };

  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-col items-center gap-2">
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          type="textbox"
        />
        {error && <div>{error.message}</div>}
        <button type="submit" className="button" disabled={isLoading}>
          {isLoading ? "Loading" : "Submit"}
        </button>
      </form>
    </>
  );
};
