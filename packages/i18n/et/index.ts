import { I18nLocale } from "../en";

export const et: I18nLocale = {
  name: "Wolf Project",
  title: "Wolf Project Eesti",
  description: "Wolf Project kirjeldus",
  project: {
    login: "Login Page",
    dashboard: "Dashboard",
    newproject: "New Project Page",
    admin: "Admin page"
  },
  header: {
    logout: "Logi välja",
    newproject: "Uus projekt",
  },
  login: {
    body: (url) =>
      `Sisselogimiseks vajutage järgmisele ${url}. Link eluiga on 5 minutit.`,
    title: `Wolf Project login email`,
  },
  type: {
    input: "Sisend",
    design: "Disain",
    development: "Arendustöö",
    feedback: "Tagasiside",
    other: "Muud",
  },
  status: {
    pending: "Ootel",
    inprogress: "Töös",
    completed: "Tehtud",
  },
  language: {
    et: "Eesti keel",
    en: "Inglise keel",
  },
};
