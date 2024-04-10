import { projects } from "./projects";
import { clients } from "./clients";
import { router } from "../root";
import { tasks } from "./tasks";

export const appRouter = router({
  projects,
  clients,
  tasks
});

export type AppRouter = typeof appRouter;
