import React, { useEffect, useState } from "react";
import { CreateProject } from "./CreateProject";
import { Tasks } from "./Tasks";
import ClientInfo from "./ClientInfo";
import { Confirm } from "./Confirm";
import { atom, map } from "nanostores";
import { useStore } from "@nanostores/react";
import { CreateProjectInput } from "@wolf-project/backend/src/routes/projects";

export interface Employee {
  value: string;
  label: string;
}

type Tab = "project" | "clients" | "tasks" | "confirm";
export const $tab = atom<Tab>("tasks");

export const $projectInput = map<CreateProjectInput>({
  companyName: "",
  description: "",
  name: "",
  projectManager: "",
  employees: [],
  tasks: [],
  clients: [],
});

// Client side check is needed because react-select doesn't work in SSR for some reason
export const NewProject = ({ employees }: { employees: Employee[] }) => {
  const [isClientSide, setIsClientSide] = useState(false);
  useEffect(() => setIsClientSide(true), []);
  if (!isClientSide) return null;

  return <Tabs employees={employees} />;
};

const Tabs = ({ employees }: { employees: Employee[] }) => {
  const tab = useStore($tab);
  return (
    <>
      {tab === "project" && <CreateProject employees={employees} />}
      {tab === "clients" && <ClientInfo />}
      {tab === "tasks" && <Tasks />}
      {tab === "confirm" && <Confirm />}
    </>
  );
};
