export const en = {
  name: "Wolf Project",
  title: "Wolf Project English",
  description: "Wolf Project description",
  project: {
    title: "Project subpage",
  },
  login: {
    body: (url: string) =>
      `To login to your account, please click this [link](${url}). Link lasts for 5 minutes.`,
    title: `Wolf Project login email`,
  },
};
export type I18nLocale = typeof en;
