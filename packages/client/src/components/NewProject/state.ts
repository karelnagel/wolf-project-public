import { CreateProjectInput, CreateProjectTask } from "@wolf-project/backend/src/routes/projects";
import { Employee } from "@wolf-project/backend/src/routes/users";
import { User } from "@wolf-project/db/schema";
import { getRandomId } from "@wolf-project/shared/helpers";
import { atom, map } from "nanostores";
import { Comment } from "@wolf-project/db/schema";

export type Tab = "project" | "clients" | "tasks" | "confirm";
export const $tab = atom<Tab>("project");

type Popup = { type: "new" } | { type: "edit"; id: string };

export const $employees = atom<User[] | null>(null);
export const $taskEditPopUp = atom<Popup | null>(null);
export const $userEditPopUp = atom<Popup | null>(null);
export const $taskInfoPopUp = atom<string | null>(null);
export const $userInfoPopUp = atom<string | null>(null);
export const $comments = atom<Comment[] | null>(null);
export const $users = atom<User[] | null>(null);
export const $projectId = atom<string | null>(null);

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
const defaultEmployee = (): Employee => ({
  name: "",
  email: "",
  language: "et",
  role: "limited",
  phone: ""
})

export const $selectedEmployee = map<Employee>(defaultEmployee());

$userEditPopUp.subscribe((popup) => {
  if (!popup || popup.type === "new") $selectedEmployee.set(defaultEmployee());
  else if (popup.type === 'edit') $selectedEmployee.set($employees.get()!.find((employee) => employee.id === popup.id)!)
    ;
})

export const $selectedTask = map<CreateProjectTask>(defaultTask());

$taskEditPopUp.subscribe((popup) => {
  if (!popup || popup.type === "new") $selectedTask.set(defaultTask());
  else if (popup.type === "edit")
    $selectedTask.set($projectInput.get().tasks.find((task) => task.id === popup.id)!);
});


$taskInfoPopUp.subscribe((id) => {
  if (!id) { $selectedTask.set(defaultTask()) }
  else {
    $selectedTask.set($projectInput.get().tasks.find((task) => task.id === id)!);
  }

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