import { client, useAPI } from "../trpc/client";

export const useAddClient = () => {
  const { mutate } = useAPI(client.client.create.mutate);
  const add = async (name: string, email: string, language: string) => {
    const result = await mutate({ name, email, role: "client", language });
    console.log(result);
  };
  return { add };
};
