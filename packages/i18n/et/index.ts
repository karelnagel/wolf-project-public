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
  placeholder: {
    projectManager: "Choose an employee",
    employees: "Choose employee(s)",
    companyName: "FIE/Ettevõtte nimi",
    name: "Nimi",
    email: "E-meil",
  },
  form: {
    newProject: "Uus project",
    projectName: "Projekti nimi",
    projectDesc: "Projekti kirjeldus",
    projectManager: "Projekti juht",
    employees: "Seotud töötajad",
    clientInfo: "Kliendi info",
    clientRep: "Kliendi esindaja",
    chooseLang: "Vali keel",
    forward: "Järgmine",
    backward: "Tagasi",
    add: "Lisa",
    addTask: "Lisa ülesanne",
    type: "Ülesande tüüp",
    status: "Staatus",
    taskName: "Ülesande nimi",
    taskDesc: "Ülesande kirjeldus",
    responsible: "Vastutaja",
    deadline: "Tähtaeg",
    save: "Salvesta",
    delete: "Kustuta",
    change: "Muuda",
    readyMessage: "Valmis?\nGenereeri uus projekt ja teavita klienti.",
    generate: "Kinnita ja genereeri"
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
