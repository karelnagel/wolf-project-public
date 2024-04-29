import React, { useState } from "react";
import { CreateProject } from "./CreateProject";
import { Tasks, Task } from "./Tasks";
import ClientInfo from "./ClientInfo";
import { Confirm } from "./Confirm";

interface NewProjectProps {
  employees: Employee[];
  mandatoryMember: Employee | undefined;
}

export interface Employee {
  value: string;
  label: string;
}

export interface Client {
  name: string;
  email: string;
  language: string;
}

export const NewProject: React.FC<NewProjectProps> = ({ employees, mandatoryMember }) => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const initialSelectedEmployee: Employee | undefined = mandatoryMember;
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([]);
  const [projectManager, setProjectManager] = useState<Employee>();

  const [companyName, setCompanyName] = useState("");
  const [clients, setClients] = useState<Client[]>([]);

  const [projectTasks, setProjectTasks] = useState<Task[]>([]);

  const [projectTab, setProjectTab] = useState(true);
  const [clientTab, setClientTab] = useState(false);
  const [tasksTab, setTasksTab] = useState(false);
  const [confirmTab, setConfirmTab] = useState(false);

  const updateProjectName = (x: string) => {
    setProjectName(x);
  };

  const updateProjectDescription = (x: string) => {
    setProjectDescription(x);
  };

  const updateCompanyName = (x: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCompanyName(x.target.value);
  };

  const addClient = (x: Client) => {
    setClients([...clients, x]);
  };

  const removeClient = (x: Client) => {
    setClients(clients.filter((client) => client.email !== x.email));
  };

  const addEmployees = (x: Employee) => {
    setSelectedEmployees([...selectedEmployees, x]);
  };
  const removeEmployees = (x: Employee) => {
    setSelectedEmployees(selectedEmployees.filter((employee) => employee !== x));
  };

  const updateProjectManager = (x: Employee | undefined) => {
    setProjectManager(x);
  };

  const sortProject = (x: Task[]) => {
    return x.slice().sort((a, b) => {
      const deadlineA = a.deadline ? new Date(a.deadline) : null;
      const deadlineB = b.deadline ? new Date(b.deadline) : null;
      if (!deadlineA && !deadlineB) {
        return 0;
      } else if (!deadlineA) {
        return 1;
      } else if (!deadlineB) {
        return -1;
      }
      if (deadlineA < deadlineB) {
        return -1;
      } else if (deadlineA > deadlineB) {
        return 1;
      } else {
        return 0;
      }
    });
  };

  const addTask = (x: Task) => {
    setProjectTasks(sortProject([...projectTasks, x]));
  };

  const modifyTask = (x: Task, y: Task) => {
    const i = projectTasks.findIndex((task) => task === x);
    if (i !== -1) {
      const updatedTasks = [...projectTasks];
      updatedTasks[i] = y;
      setProjectTasks(sortProject(updatedTasks));
    }
  };

  const removeTask = (x: Task) => {
    setProjectTasks(sortProject(projectTasks.filter((task) => task !== x)));
  };

  const projectToClient = () => {
    setProjectTab(!projectTab);
    setClientTab(!clientTab);
  };
  const clientToProject = () => {
    setProjectTab(!projectTab);
    setClientTab(!clientTab);
  };

  const clientToTasks = () => {
    setClientTab(!clientTab);
    setTasksTab(!tasksTab);
  };

  const tasksToClient = () => {
    setTasksTab(!tasksTab);
    setClientTab(!clientTab);
  };

  const tasksToConfirm = () => {
    setTasksTab(!tasksTab);
    setConfirmTab(!confirmTab);
  };

  const confirmToTasks = () => {
    setConfirmTab(!confirmTab);
    setTasksTab(!tasksTab);
  };

  const handleSubmit = () => {
    console.log(
      "projectName: ",
      projectName,
      " projectDescription: ",
      projectDescription,
      " selectedEmployees: ",
      selectedEmployees,
      " clients: ",
      clients,
      " companyName: ",
      companyName,
      " projectsTasks ",
      projectTasks,
      " projectManager: ",
      projectManager,
    );
  };

  return (
    <>
      {projectTab && (
        <CreateProject
          projectName={projectName}
          projectDescription={projectDescription}
          updateProjectName={updateProjectName}
          updateProjectDescription={updateProjectDescription}
          leaveProjectTab={projectToClient}
          employees={employees}
          fixedOption={initialSelectedEmployee}
          addEmployees={addEmployees}
          removeEmployees={removeEmployees}
          updateProjectManager={updateProjectManager}
        />
      )}
      {clientTab && (
        <ClientInfo
          companyName={companyName}
          clients={clients}
          leaveClientTab={clientToTasks}
          returnProjectTab={clientToProject}
          updateCompanyName={updateCompanyName}
          addClient={addClient}
          removeClient={removeClient}
          locale={"et"}
        />
      )}
      {tasksTab && (
        <Tasks
          projectTasks={projectTasks}
          addTask={addTask}
          modifyTask={modifyTask}
          removeTask={removeTask}
          returnClientTab={tasksToClient}
          leaveTasksTab={tasksToConfirm}
          responsible={[companyName, "Wolf-Agency OÜ"]}
        />
      )}
      {confirmTab && <Confirm returnTasks={confirmToTasks} confirmCreation={handleSubmit} />}
    </>
  );
};
