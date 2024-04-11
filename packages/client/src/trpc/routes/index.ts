import { projects } from "./projects";
import { clients } from "./clients";
import { router } from "../root";
import { tasks } from "./tasks";
import { comments } from "./comments";

export const appRouter = router({
  projects,
  clients,
  tasks,
  comments
});

export type AppRouter = typeof appRouter;
