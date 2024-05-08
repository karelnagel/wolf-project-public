import { I18nLocale } from "../en";

export const et: I18nLocale = {
  name: "Wolf Project",
  title: "Wolf Project Eesti",
  description: "Wolf Project kirjeldus",
  project: {
    login: "Login Page",
    dashboard: "Dashboard",
    newproject: "New Project Page",
    admin: "Admin page",
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
    body: (url) => `Sisselogimiseks vajutage järgmisele ${url}. Link eluiga on 5 minutit.`,
    title: `Wolf Project login email`,
  },
  placeholder: {
    projectManager: "Vali projektijuht",
    employees: "Vali Töötaja(d)",
    companyName: "FIE/Ettevõtte nimi",
    name: "Nimi",
    email: "E-mail",
    phone: "Telefoninumber",
    none: "Rohkem valikuid ei ole"
  },
  allProjects: {
    name: "Nimi",
    manager: "Projektijuht",
    description: "Kirjeldus",
    client: "Klient",
    type: "Projektitüüp",
    progress: "Progress",
    status: "Staatus",
    deadline: "Tähtaeg",
    open: "Vaata taske",
    changeProject: "Muuda projekti",
    changeClient: "Muuda kliendi infot"
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
    disabled: "Keelatud",
    loading: "Laadimas",
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
  comment: {
    title: "Kommentaarid"
  },
  userForm: {
    name: "Nimi",
    email: "Tööemail",
    phone: "Telefoninumber",
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
  },
  email: {
    newProjectSubject: (companyName: string) => `Projekti algus ja oluline info – ${companyName} & Wolf Agency`,
    newProject: (name: string, ofStage: string, url: string, projectMName: string, projectMEmail: string, projectMPhone: string) => `Tere, ${name}!\n\n
    Aitäh, et usaldad meid oma projekti valmimisel! Alates pragusest hetkest alustame projektiga.\n\n
    Järgnevalt valmib projekt ${ofStage} etapis, mida palume teil jälgida meie projektiplatvormilt, mis asub järgmisel lingil: ${url}\n\n
    Igale etapile on määratud selle etapi sisu, etapi eest vastutaja ning eeldatav valmimistähtaeg. Mõnede etappide valmimine eeldab ka teiepoolse sisendi andmist – need etapid on ära määratletud ning vastutavaks tegijaks määratud teid (need etapid võivad hõlmata näiteks piltide edastamist või tagasiside andmist).\n\n
    Projektiplatvorm uueneb pidevalt reaalajas ning selle kaudu on võimalik teil jätta ka kommentaare, anda tagasisidet ning laadida üles nõutav sisend. Iga etapi valmimise korral teavitame teid sellest ka e-kirja teel.\n\n
    Palume kindlasti hoolikalt kõigega tutvuda ning vajalik sisend anda õigeks ajaks, et ka ülejäänud projekt valmiks esialgu kokkulepitud ajaraamistikus. :)\n\n
    Teie projektijuhiks on: ${projectMName}\n${projectMEmail}\n${projectMPhone}\n\n
    Kui tekib küsimusi või muresid, siis võtke julgelt ühendust! Oleme valmis kõigega abistama ja küsimustele vastama.\n\n
    Tervitades ja edukat koostööd soovides\n ${projectMName}\nWolf Agency`,
    stageUpdateSubject: (stageNumber: string, companyName: string) => `Projekti etapp ${stageNumber} on valminud – ${companyName} & Wolf Agency`,
    stageUpdate: (name: string, stageNumber: string, stageName: string, url: string, projectMName: string, responsible: string) => `Tere, ${name}!\n\n
    Anname märku, et projekti etapp ${stageNumber} on valminud. Järgmine etapp on ${stageName} ning vastutav tegija ${responsible}. Vaata lähemalt projektiplatvormilt.\n\n
    Projektiplatvorm on kättesaadav lingil: ${url}\n\n
    Kommentaare ning omapoolset sisendit on võimalik anda läbi projektiplatvormi.\n\n
    Kui tekib küsimusi või muresid, siis võtke julgelt ühendust! Oleme valmis kõigega abistama ja küsimustele vastama.\n\n
    Tervitades\n${projectMName}\nWolf Agency`,
  }
};
