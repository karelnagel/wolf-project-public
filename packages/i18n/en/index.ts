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
    dashboard: "Dashboard",
    admin: "Admin page",
    projects: 'Project management'
  },
  newUser: "New User",
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
    none: "No choices left"
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
    tasks: "Tasks",
    addTask: "Add task",
    newTask: "New Task",
    editTask: "Edit task",
    type: "Type of task",
    status: "Status",
    taskName: "Task name",
    taskDesc: "Task description",
    responsible: "Responsible",
    deadline: "Deadline",
    completed: "Completed",
    save: "Save",
    delete: "Delete",
    cancel: "Cancel",
    change: "Change",
    view: "View",
    readyMessage: "Ready?\nGenerate new project and notify client.",
    generate: "Confirm and generate",
    error: "Something went wrong.\nCheck that you have filled every input field and added at least one task and client!"
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
  userForm: {
    name: "Name",
    email: "Work Email",
    language: "Language",
    priviledge: "Priviledge level",
    editUser: "Change user info",
    newUser: "New user",
    save: "Save",
    delete: "Delete",
    cancel: "Cancel",
  },
  language: {
    et: "Estonian",
    en: "English",
  },
  priviledge: {
    admin: "Admin",
    limited: "Limited",
  }
};
export type I18nLocale = typeof en;
