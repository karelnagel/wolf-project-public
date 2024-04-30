export const en = {
  name: "Wolf Project",
  title: "Wolf Project English",
  description: "Wolf Project description",
  project: {
    title: "Project subpage",
  },
  login: {
    body: (url: string) =>  `To login to your account, please click this [link](${url}). Link lasts for 5 minutes.`,
    title: `Wolf Project login email`
  },
  type: {
    input: "Input",
    design: "Design",
    development: "Development",
    feedback: "Feedback"
  },
  status: {
    pending: "Pending",
    inprogress: "In Progress",
    completed: "Completed"
  },
  language:{
    et: "Estonian",
    en: "English"
  }
};
export type I18nLocale = typeof en;
