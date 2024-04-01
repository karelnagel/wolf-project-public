import { project } from "./project";
import { router } from "../root";

export const appRouter = router({
  project,
});

export type AppRouter = typeof appRouter;
