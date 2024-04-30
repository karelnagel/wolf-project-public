import React, { useEffect, useState } from "react";
import { CreateProject } from "./CreateProject";
import { Tasks } from "./Tasks";
import ClientInfo from "./ClientInfo";
import { Confirm } from "./Confirm";
import { useAPI, client } from "@wolf-project/backend/src/client";
import { Locale } from "@wolf-project/i18n";
import { Task } from "@wolf-project/db/schema";
import { atom } from "nanostores";
import { useStore } from "@nanostores/react";

interface NewProjectProps {
  employees: Employee[];
  mandatoryMember: Employee | undefined;
  creatorId: string;
}
export interface Employee {
  id: string;
  name: string;
}
export interface Client {
  name: string;
  email: string;
  language: Locale;
}

const useIsClientSide = () => {
  const [isClientSide, setIsClientSide] = useState(false);
  useEffect(() => {
    setIsClientSide(true);
  }, []);
  return isClientSide;
};

type Tab = "project" | "clients" | "tasks" | "confirm";
export const $tab = atom<Tab>("project");

export const NewProject: React.FC<NewProjectProps> = ({ employees, mandatoryMember }) => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const initialSelectedEmployee: Employee | undefined = mandatoryMember;
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [projectManager, setProjectManager] = useState<string>();
  const tab = useStore($tab);

  const [companyName, setCompanyName] = useState("");
  const [clients, setClients] = useState<Client[]>([]);

  const [projectTasks, setProjectTasks] = useState<Task[]>([]);

  const { mutate, isLoading, error } = useAPI(client.projects.create.mutate);

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
    setSelectedEmployees([...selectedEmployees, x.id]);
  };
  const removeEmployees = (x: Employee) => {
    setSelectedEmployees(selectedEmployees.filter((employee) => employee !== x.id));
  };

  const updateProjectManager = (x: Employee | undefined) => {
    setProjectManager(x!.id);
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

  const handleSubmit = () => {
    mutate({
      name: projectName,
      description: projectDescription,
      projectManager: projectManager!,
      clients: clients.map((c) => ({
        name: c.name,
        email: c.email,
        language: c.language,
      })),
      tasks: projectTasks,
      selectedEmployees,
      // Todo also input company name
      companyName: "Todo company name",
    });

    if (error) console.log(error);
  };
  const isClientSide = useIsClientSide();
  if (!isClientSide) return null;
  return (
    <>
      {tab === "project" && (
        <CreateProject
          projectName={projectName}
          projectDescription={projectDescription}
          updateProjectName={updateProjectName}
          updateProjectDescription={updateProjectDescription}
          employees={employees}
          fixedOption={initialSelectedEmployee}
          addEmployees={addEmployees}
          removeEmployees={removeEmployees}
          updateProjectManager={updateProjectManager}
        />
      )}
      {tab === "clients" && (
        <ClientInfo
          companyName={companyName}
          clients={clients}
          updateCompanyName={updateCompanyName}
          addClient={addClient}
          removeClient={removeClient}
          locale={"et"}
        />
      )}
      {tab === "tasks" && (
        <Tasks
          projectTasks={projectTasks}
          addTask={addTask}
          modifyTask={modifyTask}
          removeTask={removeTask}
          responsible={[companyName, "Wolf-Agency OÜ"]}
        />
      )}
      {tab === "confirm" && <Confirm confirmCreation={handleSubmit} isLoading={isLoading} />}
    </>
  );
};
