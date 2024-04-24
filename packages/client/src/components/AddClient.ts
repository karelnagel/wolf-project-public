import { client, useAPI } from "@wolf-project/backend/src/client";

export const useAddClient = () => {
  const { mutate } = useAPI(client.client.create.mutate);
  const add = async (name: string, email: string, language: string) => {
    await mutate({ name, email, role: "client", language });
  };
  return { add };
};
