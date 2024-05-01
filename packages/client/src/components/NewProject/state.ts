import { CreateProjectInput, CreateProjectTask } from "@wolf-project/backend/src/routes/projects";
import { getRandomId } from "@wolf-project/shared/helpers";
import { atom, map } from "nanostores";

export type Tab = "project" | "clients" | "tasks" | "confirm";
export const $tab = atom<Tab>("project");

type Popup = { type: "new" } | { type: "edit"; id: string };
export const $popUpOpen = atom<Popup | null>(null);

const defaultTask = (): CreateProjectTask => ({
  id: getRandomId(),
  title: "",
  status: "pending",
  deadline: new Date(),
  completed: null,
  type: "input",
  description: "",
  clientTask: false,
});

export const $selectedTask = map<CreateProjectTask>(defaultTask());
$popUpOpen.subscribe((popup) => {
  if (!popup || popup.type === "new") $selectedTask.set(defaultTask());
  else if (popup.type === "edit")
    $selectedTask.set($projectInput.get().tasks.find((task) => task.id === popup.id)!);
});

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
