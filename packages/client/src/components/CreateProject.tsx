import { useState } from "react";
import { client, useAPI } from "../trpc/client";

export const CreateProject = () => {
  const [projectName, setProjectName] = useState("");
  const { mutate, data, error, isLoading } = useAPI(client.projects.create.mutate);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await mutate({ projectName });
    console.log(result);
  };
  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center gap-2">
      <input
        placeholder="title"
        type="title"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      {error && <div>{error.message}</div>}
      {data && (
        <div>
          {data.projectId} {data.projectName}
        </div>
      )}
      <button type="submit" className="button" disabled={isLoading}>
        {isLoading ? "Loading" : "Submit"}
      </button>
    </form>
  );
};
