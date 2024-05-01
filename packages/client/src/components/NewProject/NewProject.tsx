import React from "react";
import { CreateProject } from "./CreateProject";
import { Tasks } from "./Tasks";
import ClientInfo from "./ClientInfo";
import { Confirm } from "./Confirm";
import { useStore } from "@nanostores/react";
import { $tab } from "./state";
import { useIsClientSide } from "../ProjectPage";

export interface Employee {
  value: string;
  label: string;
}

// Client side check is needed because react-select doesn't work in SSR for some reason
export const NewProject = ({ employees }: { employees: Employee[] }) => {
  const isClient = useIsClientSide();
  if (!isClient) return null;
  return <Tabs employees={employees} />;
};

const Tabs = ({ employees }: { employees: Employee[] }) => {
  const tab = useStore($tab);
  return (
    <>
      {tab === "project" && <CreateProject employees={employees} />}
      {tab === "clients" && <ClientInfo />}
      {tab === "tasks" && (
        <Tasks
          canEdit
          confirmButton={{ label: "Edasi", onClick: () => $tab.set("confirm") }}
          onBackClick={() => $tab.set("clients")}
        />
      )}
      {tab === "confirm" && <Confirm />}
    </>
  );
};
