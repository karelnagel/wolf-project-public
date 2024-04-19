import { appRouter} from "./routes";
import { root } from "./root";

export const server = root.createCallerFactory(appRouter);