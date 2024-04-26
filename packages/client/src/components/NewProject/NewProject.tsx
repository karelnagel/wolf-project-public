import React, { useState } from "react";
import { CreateProject } from "./CreateProject";
import { Tasks } from "./Tasks";
import ClientInfo from "./ClientInfo";
import { Confirm } from "./Confirm";

interface NewProjectProps {
  employees: Employees[];
  creatorId: string;
  creatorRole: string;
}

export interface Employees {
  value: string;
  label: string;
}

export interface Client {
  name: string;
  email: string;
  language: string;
}

export const NewProject: React.FC<NewProjectProps> = ({ employees, creatorId, creatorRole }) => {
  const [projectName, setProjectName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  const [projectTab, setProjectTab] = useState(true);
  const [clientTab, setClientTab] = useState(false);
  const [tasksTab, setTasksTab] = useState(false);
  const [confirmTab, setConfirmTab] = useState(false);

  const updateProjectName = (x: string) => {
    setProjectName(x);
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

  const addEmployees = (x: string) => {
    setSelectedEmployees([...selectedEmployees, x])
  }
  const removeEmployees = (x: string) => {
    setSelectedEmployees(selectedEmployees.filter((employee) => employee !== x))
  }

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
    console.log("test123");
  };

  return (
    <>
      {projectTab && (
        <CreateProject
          projectName={projectName}
          updateProjectName={updateProjectName}
          leaveProjectTab={projectToClient}
          employees={employees}
          creatorId={creatorId}
          creatorRole={creatorRole}
          selectedEmployees={selectedEmployees}
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
        />
      )}
      {tasksTab && <Tasks returnClientTab={tasksToClient} leaveTasksTab={tasksToConfirm} />}
      {confirmTab && <Confirm returnTasks={confirmToTasks} confirmCreation={handleSubmit} />}
    </>
  );
};
