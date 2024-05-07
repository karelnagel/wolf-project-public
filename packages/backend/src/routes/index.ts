import { projects } from "./projects";
import { router } from "../root";
import { tasks } from "./tasks";
import { comments } from "./comments";
import { employee, client, authenticate } from "./users";
import { projectUser } from "./projectUser";
import { clients } from "./clients";

export const appRouter = router({
  projects,
  projectUser,
  employee,
  client,
  tasks,
  comments,
  authenticate,
  clients
});

export type AppRouter = typeof appRouter;
