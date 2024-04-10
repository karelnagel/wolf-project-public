import { useState } from "react";
import { client, useAPI } from "../trpc/client";
import { useAddClient } from "./AddClient";

export const CreateProject = () => {
  const [projectName, setProjectName] = useState("");
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState("");
  const { mutate, data, error, isLoading } = useAPI(client.projects.create.mutate);
  const { add } = useAddClient()
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(language)
    e.preventDefault();
    const result = await mutate({ projectName });
    console.log(result);
    add(result!.projectId, clientName, email, language);
  };
  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center gap-2">
      <input
        placeholder="title"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        required
      />
      <input
        placeholder="client"
        value={clientName}
        onChange={(e) => setClientName(e.target.value)}
        required
      />
      <input
        placeholder="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
        <select value={language} onChange={(e) => setLanguage(e.target.value)} required>
          <option value="" disabled selected>Vali kliendi keel</option>
          <option value="en" >English</option>
          <option value="ee" >Eesti</option>
        </select>
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
