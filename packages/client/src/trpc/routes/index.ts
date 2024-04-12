import { projects } from "./projects";
import { router } from "../root";
import { tasks } from "./tasks";
import { comments } from "./comments";
import { employee, client } from "./users";

export const appRouter = router({
  projects,
  employee,
  client,
  tasks,
  comments,
});

export type AppRouter = typeof appRouter;
