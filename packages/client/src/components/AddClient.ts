import { client, useAPI } from "../trpc/client";

export const useAddClient = () => {
    const saltedKeycode = 'KYU07';
    const { mutate } = useAPI(client.clients.create.mutate);
    const add = async (projectRef: string, name: string, email: string, language: string | null) => {
        const result = await mutate({ projectRef, name, email, language, saltedKeycode })
        console.log(result)
    }
    return { add }
}
