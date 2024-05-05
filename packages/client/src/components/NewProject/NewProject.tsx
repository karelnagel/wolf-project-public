import React from "react";
import { CreateProject } from "./CreateProject";
import { Tasks } from "./Tasks";
import ClientInfo from "./ClientInfo";
import { Confirm } from "./Confirm";
import { useStore } from "@nanostores/react";
import { $tab } from "./state";
import { useIsClientSide } from "../ProjectPage";
import { I18nLocale } from "@wolf-project/i18n";
import _ from "lodash";

const { omit } = _;

export interface Employee {
  value: string;
  label: string;
}

// Client side check is needed because react-select doesn't work in SSR for some reason
export const NewProject = ({
  employees,
  t,
  lang,
}: {
  employees: Employee[];
  t: {
    form: I18nLocale["form"];
    placeholder: I18nLocale["placeholder"];
    language: I18nLocale["language"];
    type: I18nLocale["type"];
    status: I18nLocale["status"];
  };
  lang: string;
}) => {
  const isClient = useIsClientSide();
  if (!isClient) return null;
  return <Tabs employees={employees} t={t} lang={lang} />;
};

const Tabs = ({
  employees,
  t,
  lang,
}: {
  employees: Employee[];
  t: {
    form: I18nLocale["form"];
    placeholder: I18nLocale["placeholder"];
    language: I18nLocale["language"];
    type: I18nLocale["type"];
    status: I18nLocale["status"];
  };
  lang: string;
}) => {
  const tab = useStore($tab);
  return (
    <>
      {tab === "project" && (
        <CreateProject employees={employees} t={omit(t, ["language", "type", "status"])} />
      )}
      {tab === "clients" && <ClientInfo t={t} />}
      {tab === "tasks" && <Tasks canEdit t={omit(t, ["placeholder", "language"])} lang={lang} />}
      {tab === "confirm" && <Confirm t={t.form} />}
    </>
  );
};
