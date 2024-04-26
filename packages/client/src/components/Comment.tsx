import React, { useState } from "react";
import { client, useAPI } from "../trpc/client";
import { Comment as CommentType } from "../trpc/routes/comments";
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
    <div className="flex flex-col justify-center p-8 mt-16 rounded-2xl border border-primary2 border-solid max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div className="text-xl font-extrabold text-center text-white max-md:max-w-full">
        Kommentaarid
      </div>
      <div className="flex flex-col mt-9 max-w-full text-center text-white">
        {comments.map((comment, index) => (
          <div key={index} className="flex text-left w-full py-5 flex-col max-w-full">
            <div className=" font-extrabold">{comment.commenter}</div>
            <div className="flex gap-5 mt-1.5 text-base">
              <div>{comment.date}</div>
              <div>{comment.time}</div>
            </div>
            <div className="mt-4 flextext-base font-bold">{comment.text}</div>
          </div>
        ))}
      </div>
      <form onSubmit={onSubmit} className="flex gap-5 justify-between px-0.5 mt-9 font-bold whitespace-nowrap max-md:flex-wrap">
      <input
          className="justify-center px-5 py-2.5 text-xl w-full rounded-2xl bg-[#ABABAB] text-black max-md:px-5 max-md:max-w-full"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          placeholder="Kommentaar"
          type="text"        />
        {error && <div>{error.message}</div>}
        <button> 
          <Paperclip className="my-auto w-10" />
        </button>
        <button type="submit" className="justify-center px-6 py-2.5 text-base text-center text-white border-primary2 bg-primary2 rounded-2xl max-md:px-5" disabled={isLoading}>
          {isLoading ? "Töötlemas" : "Saada"}
        </button>
      </form>
    </div>
  );
};
