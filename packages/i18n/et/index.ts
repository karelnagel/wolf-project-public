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
    dashboard: "Töölauale",
    admin: "Admini lehele",
    projects: "projektihaldur"
  },
  newUser: "Uus kasutaja",
  login: {
    body: (url) =>
      `Sisselogimiseks vajutage järgmisele ${url}. Link eluiga on 5 minutit.`,
    title: `Wolf Project login email`,
  },
  placeholder: {
    projectManager: "Vali projektijuht",
    employees: "Vali Töötaja(d)",
    companyName: "FIE/Ettevõtte nimi",
    name: "Nimi",
    email: "E-meil",
    none: "Rohkem valikuid ei ole"
  },
  /*Also used for Tasks and Popups*/
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
    tasks: "Ülesanded",
    addTask: "Lisa ülesanne",
    newTask: "Uus ülesanne",
    editTask: "Muuda ülesannet",
    type: "Ülesande tüüp",
    status: "Staatus",
    taskName: "Ülesande nimi",
    taskDesc: "Ülesande kirjeldus",
    responsible: "Vastutaja",
    deadline: "Tähtaeg",
    completed: "Tehtud",
    save: "Salvesta",
    delete: "Kustuta",
    cancel: "Katkesta",
    change: "Muuda",
    view: "Vaata",
    readyMessage: "Valmis?\nGenereeri uus projekt ja teavita klienti.",
    generate: "Kinnita ja genereeri",
    error: "Midagi läks valesti.\nKontrolli, et kõik väljad oleks täitetud ning oled lisanud vähemalt ühe ülesande ning kliendi!"
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
  userForm: {
    name: "Nimi",
    email: "Tööemail",
    language: "Keel",
    priviledge: "Privileegi tase",
    editUser: "Muuda kasutaja infot",
    newUser: "Uus kasutaja",
    save: "Salvesta",
    delete: "Kustuta",
    cancel: "Katkesta",

  },
  error: {
    missingInputs: "Täida nime ning emaili väljad!",
    wrongWorkEmail: "Veendu, et lisasid tööemail uue töötajale!",
    dbIssue: "Midagi läks andmebaasis töötlemisega valesti. Vaata console.errorit või kontakteeru arendajaga!"
  },

  language: {
    et: "Eesti keel",
    en: "Inglise keel",
  },
  priviledge: {
    admin: "Admin",
    limited: "Piiratud",
  },
  pageNotFound: {
    title: "Error 404 ",
    button: "Tagasi avalehele!"
  },
  notAllowed: {
    title: "Error 401 ",
    button: "Tagasi avalehele"
  }
};
