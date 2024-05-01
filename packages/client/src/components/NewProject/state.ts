import { CreateProjectInput, CreateProjectTask } from "@wolf-project/backend/src/routes/projects";
import { atom, map } from "nanostores";

export type Tab = "project" | "clients" | "tasks" | "confirm";
export const $tab = atom<Tab>("project");

export const $popUpOpen = atom(false);

export const sortTasks = (x: CreateProjectTask[]): CreateProjectTask[] => {
  return x.slice().sort((a, b) => {
    const deadlineA = a.deadline ? new Date(a.deadline) : null;
    const deadlineB = b.deadline ? new Date(b.deadline) : null;
    if (!deadlineA && !deadlineB) {
      return 0;
    } else if (!deadlineA) {
      return 1;
    } else if (!deadlineB) {
      return -1;
    }
    if (deadlineA < deadlineB) {
      return -1;
    } else if (deadlineA > deadlineB) {
      return 1;
    } else {
      return 0;
    }
  });
};
export const $projectInput = map<CreateProjectInput>({
  companyName: "",
  description: "",
  name: "",
  projectManager: "",
  employees: [],
  tasks: [],
  clients: [],
});
export const setTasks = (tasks: CreateProjectTask[]) => {
  $projectInput.setKey("tasks", sortTasks(tasks));
};
