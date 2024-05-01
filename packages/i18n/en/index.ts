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
