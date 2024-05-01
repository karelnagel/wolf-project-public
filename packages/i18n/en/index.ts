export const en = {
  name: "Wolf Project",
  title: "Wolf Project English",
  description: "Wolf Project description",
  project: {
    login: "Login Page",
    dashboard: "Dashboard",
    newproject: "New Project Page",
    admin: "Admin page"
  },
  header: {
    logout: "Log out",
    newproject: "New project",
  },
  login: {
    body: (url: string) =>
      `To login to your account, please click this ${url}. Link lasts for 5 minutes.`,
    title: `Wolf Project login email`,
  },
  placeholder: {
    projectManager: "Choose an employee",
    employees: "Choose employee(s)",
    companyName: "Self-Employee/Company name",
    name: "Name",
    email: "E-mail",
  },
  form: {
    newProject: "New Project",
    projectName: "Project name",
    projectDesc: "Project description",
    projectManager: "Project manager",
    employees: "Associated employees",
    clientInfo: "Client info",
    clientRep: "Client representitive",
    chooseLang: "Choose language",
    forward: "Continue",
    backward: "Back",
    add: "Add",
    addTask: "Add task",
    type: "Type of task",
    status: "Status",
    taskName: "Task name",
    taskDesc: "Task description",
    responsible: "Responsible",
    deadline: "Deadline",
    save: "Save",
    delete: "Delete",
    change: "Change",
    readyMessage: "Ready?\nGenerate new project and notify client.",
    generate: "Confirm and generate"
  },
  type: {
    input: "Input",
    design: "Design",
    development: "Development",
    feedback: "Feedback",
    other: "Other",
  },
  status: {
    pending: "Pending",
    inprogress: "In Progress",
    completed: "Completed",
  },
  language: {
    et: "Estonian",
    en: "English",
  },
};
export type I18nLocale = typeof en;
