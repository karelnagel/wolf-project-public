import { I18nLocale } from "../en";

export const et: I18nLocale = {
  name: "Wolf Project",
  title: "Wolf Project Eesti",
  description: "Wolf Project kirjeldus",
  login: {
    title: "Sisselogimiseks vajutage järgmisele lingile. Link eluiga on 5 minutit:",
    body: (url: string) => `<a href="${url}">${url}</a>`,
  },
  project: {
    title: "Projekti nimi",
  },
  // login: 'Sisselogimiseks vajutage järgmisele lingile. Link eluiga on 5 minutit:'
};
