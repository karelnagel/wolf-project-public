import { useState } from "react";
import { client, useAPI } from "../trpc/client";

export const CreateProject = () => {
  const [title, setTitle] = useState("");
  const { mutate, data, error, isLoading } = useAPI(client.project.create.mutate);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await mutate({ title });
    console.log(result);
  };
  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center gap-2">
      <input
        placeholder="title"
        type="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {error && <div>{error.message}</div>}
      {data && (
        <div>
          {data.id} {data.title}
        </div>
      )}
      <button type="submit" className="button" disabled={isLoading}>
        {isLoading ? "Loading" : "Submit"}
      </button>
    </form>
  );
};
