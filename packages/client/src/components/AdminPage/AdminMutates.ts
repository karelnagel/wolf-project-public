import { client, useAPI } from "@wolf-project/backend/src/client"
import { Employee } from "@wolf-project/backend/src/routes/users"



export const addEmployee = () => {
    const { mutate, isLoading, error } = useAPI(client.employee.create.mutate)
    const addUser = async (props: Employee) => await mutate(props);
    return { addUser, isLoading, error };
}

export const removeEmployee = () => {
    const { mutate, isLoading } = useAPI(client.employee.delete.mutate)
    const removeUser = async (id: string) => await mutate({ id });
    return { removeUser, isLoading };
}
export const modifyEmployee = () => {
    const { mutate, isLoading, error } = useAPI(client.employee.modify.mutate)
    const modifyUser = async (id: string, props: Employee) => await mutate({ id, ...props });
    return { modifyUser, isLoading, error };
}

export const getEmployee = () => {
    const { mutate } = useAPI(client.employee.get.mutate)
    const getUser = async (props: Employee) => await mutate(props);
    return { getUser }
}

