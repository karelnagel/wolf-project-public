import { client, useAPI } from "../trpc/client";

export const AddClient = (projectRef: string, name: string, email:string, language: string|null) => {
    const saltedKeycode = 'KYU07';
    const { mutate } = useAPI(client.clients.create.mutate);
    mutate({projectRef, name, email, language, saltedKeycode})
}
