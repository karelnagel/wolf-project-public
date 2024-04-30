import { I18nLocale } from "../en";

export const et: I18nLocale = {
  name: "Wolf Project",
  title: "Wolf Project Eesti",
  description: "Wolf Project kirjeldus",
  project: {
    title: "Project alaleht",
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
