import { projects } from "./projects";
import { router } from "../root";
import { tasks } from "./tasks";
import { comments } from "./comments";
import { employee, client, authenticate } from "./users";
import { projectUser } from "./projectUser";

export const appRouter = router({
  projects,
  projectUser,
  employee,
  client,
  tasks,
  comments,
  authenticate
});

export type AppRouter = typeof appRouter;
