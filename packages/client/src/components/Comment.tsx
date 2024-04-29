import React, { useState } from "react";

import { client, useAPI } from "@wolf-project/backend/src/client";
import type { Comment as CommentType } from "@wolf-project/backend/src/routes/comments";
import { Paperclip } from "lucide-react";

interface CommentProps {
  taskRef: string;
  commenterId: string;
  comments: {
    commenter: string;
    date: string;
    time: string;
    text: string;
  }[];
}

export const Comment: React.FC<CommentProps> = ({ taskRef, commenterId, comments }) => {
  const [comment, setComment] = useState("");
  const { mutate, error, isLoading } = useAPI(client.comments.create.mutate);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params: Omit<CommentType, "commentId" | "commentedAt"> = {
      taskRef,
      body: comment,
      commenterId,
    };
    await mutate(params);
    window.location.reload();
  };

  return (
    <div className="border-primary2 mt-16 flex flex-col justify-center rounded-2xl border border-solid p-8 max-md:mt-10 max-md:max-w-full max-md:px-5">
      <div className="text-center text-xl font-extrabold text-white max-md:max-w-full">
        Kommentaarid
      </div>
      <div className="mt-9 flex max-w-full flex-col text-center text-white">
        {comments.map((comment, index) => (
          <div key={index} className="flex w-full max-w-full flex-col py-5 text-left">
            <div className=" font-extrabold">{comment.commenter}</div>
            <div className="mt-1.5 flex gap-5 text-base">
              <div>{comment.date}</div>
              <div>{comment.time}</div>
            </div>
            <div className="flextext-base mt-4 font-bold">{comment.text}</div>
          </div>
        ))}
      </div>
      <form
        onSubmit={onSubmit}
        className="mt-9 flex justify-between gap-5 whitespace-nowrap px-0.5 font-bold max-md:flex-wrap"
      >
        <input
          className="w-full justify-center rounded-2xl bg-[#ABABAB] px-5 py-2.5 text-xl text-black max-md:max-w-full max-md:px-5"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          placeholder="Kommentaar"
          type="text"
        />
        {error && <div>{error.message}</div>}
        <button>
          <Paperclip className="my-auto w-10" />
        </button>
        <button
          type="submit"
          className="border-primary2 bg-primary2 justify-center rounded-2xl px-6 py-2.5 text-center text-base text-white max-md:px-5"
          disabled={isLoading}
        >
          {isLoading ? "Töötlemas" : "Saada"}
        </button>
      </form>
    </div>
  );
};
