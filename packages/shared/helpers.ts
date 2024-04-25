import { v4 as uuidv4 } from "uuid";
export const getRandomId = () => uuidv4();

export const hasToken = (result: any): result is { Token: string | undefined } => {
    return typeof result === 'object' && 'Token' in result;
}
