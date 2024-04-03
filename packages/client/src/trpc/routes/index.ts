import { projects } from "./projects";
import { router } from "../root";

export const appRouter = router({
  projects,
});

export type AppRouter = typeof appRouter;
