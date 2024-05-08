export const en = {
  name: "Wolf Project",
  title: "Wolf Project English",
  description: "Wolf Project description",
  project: {
    login: "Login Page",
    dashboard: "Dashboard",
    newproject: "New Project Page",
    admin: "Admin page",
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
    phone: "Phone number",
    none: "No choices left"
  },
  allProjects: {
    name: "Name",
    manager: "Project Manager",
    description: "Description",
    client: "Client",
    progress: "Progress",
    type: "Project Type",
    status: "Status",
    deadline: "Deadline",
    open: "Tasks",
    changeProject: "Change project",
    changeClient: "Change client info"
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
    disabled: "Disabled",
    loading: "Loading",
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
  comment: {
    title: "Comments"
  },
  /*Used for UserPopUp*/
  userForm: {
    name: "Name",
    email: "Work Email",
    phone: "Phone number",
    language: "Language",
    priviledge: "Priviledge level",
    editUser: "Change user info",
    newUser: "New user",
    save: "Save",
    delete: "Delete",
    cancel: "Cancel",
  },
  error: {
    missingInputs: "Fill in name and email input fields!",
    wrongWorkEmail: "Ensure that you assinged work email to new Employee!",
    dbIssue: "Something went wrong with Database. Check console.error or contact a developer!"
  },
  language: {
    et: "Estonian",
    en: "English",
  },
  priviledge: {
    admin: "Admin",
    limited: "Limited",
  },
  pageNotFound: {
    title: "Error 404 ",
    button: "Return to dashboard"
  },
  notAllowed: {
    title: "Error 401 ",
    button: "Return to dashboard"
  },
  email: {
    newProjectSubject: (companyName: string) => `Project Start and Important Information – ${companyName} & Wolf Agency`,
    newProject: (name: string, ofStage: string, url: string, projectMName: string, projectMEmail: string, projectMPhone: string) => `Hello,${name}!\n\n
    Thank you for trusting us with your project! We are starting the project as of now.\n\n
    The project will be completed in ${ofStage} stages, which we ask you to follow on our project platform at the following link:\n\n${url}\n\n
    Each stage has assigned its content, the side responsible for the stage, and the expected completion deadline. Some stages require your input – these stages are defined and you have been assigned as theresponsible party (these stages may include, for example, submitting images or providing feedback).\n\n
    The project platform is continuously updated in real-time, and it allows you to leave comments, provide feedback, and upload the required inputs. We will also notify you by email as each stage is completed.\n\n
    Please make sure to familiarize yourself with everything carefully and provide the necessary input on time, so that the rest of the project can be completed within the initially agreed timeframe. :)\n\n
    Your project manager is: ${projectMName}\n${projectMEmail}\n${projectMPhone}\n\n
    If you have any questions or concerns, please feel free to contact us! We are ready to assist and answer any questions.\n\n
    Best regards and wishing you successful cooperation,\n${projectMName}\n\n
    WolfAgency`,
    stageUpdateSubject: (stageNumber: string, companyName: string) => `ProjectStage ${stageNumber} Completed – ${companyName} & Wolf Agency`,
    stageUpdate: (name: string, stageNumber: string, stageName: string, url: string, projectMName: string, responsible: string) => `Hello, ${name}!\n\n
    We are pleased to inform you that project stage ${stageNumber} has been completed. The next stage is ${stageName}, and the responsible party is ${responsible}. See more on the project platform.\n\n
    The project platform is accessible at: ${url} \n\n
    Comments and your input can be provided through the project platform.\n\n
    If you have any questions or concerns, please do not hesitate to contact us! We are ready to assist and answer any questions.\n\n
    Bestregards,\n${projectMName}\nWolf Agency`
    ,
  }
};
export type I18nLocale = typeof en;
