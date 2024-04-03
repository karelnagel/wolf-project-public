import { projects } from "./projects";
import { clients } from "./clients";
import { router } from "../root";

export const appRouter = router({
  projects,
  clients
});

export type AppRouter = typeof appRouter;
