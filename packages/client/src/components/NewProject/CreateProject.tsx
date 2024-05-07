import React, { useState } from "react";
import { Employee } from "./NewProject";
import { useStore } from "@nanostores/react";
import { $projectInput, $tab } from "./state";
import { I18nLocale } from "@wolf-project/i18n";
import { Button } from "../Buttons";
import { client } from "@wolf-project/backend/src/client";
import { ProjectManagerSelector } from "./ProjectManagerSelector";
import { useIsClientSide } from "../ProjectPage";
import { EmployeeSelector } from "./EmployeeSelector";

type Translations = {
  form: I18nLocale["form"];
  placeholder: I18nLocale["placeholder"];
};
export const ProjectInfoEdit = ({
  t,
  allEmployees,
  id,
  ...props
}: {
  id: string;
  name: string;
  t: Translations;
  description: string;
  allEmployees: Employee[];
  employees: string[];
  manager?:string,
}) => {
  const isClient = useIsClientSide()
  const [name, setName] = useState(props.name);
  const [description, setDescription] = useState(props.description);
  const [manager, setManager] = useState(props.manager);
  const [employees, setEmployees] = useState(props.employees)
if (!isClient){
  return null
}

  return (
    <ProjectInfo
    t={t}
    allEmployees={allEmployees}
    name={name}
    setName={setName}
    description={description}
    setDescription={setDescription}
    save={async ()=>{
      await client.projects.edit.mutate({id, name, description, employees, manager})
      window.location.href=`/project/${id}`
    }}
    manager={manager}
    setManager={setManager}
    employees={employees}
    setEmployees={setEmployees}
  ></ProjectInfo>
  );
};

export const ProjectInfoCreate = ({ t, employees }: { t: Translations; employees: Employee[] }) => {

  const input = useStore($projectInput);

  return (
    <ProjectInfo
      t={t}
      allEmployees={employees}
      name={input.name}
      setName={name => $projectInput.setKey("name", name)}
      description={input.description}
      setDescription={description => $projectInput.setKey("description", description)}
      save={() => $tab.set("clients")}
      manager={input.projectManager}
      setManager={manager => $projectInput.setKey("projectManager", manager)}
      employees={input.employees}
      setEmployees={e => $projectInput.setKey("employees", e)}
      ></ProjectInfo>
  );
};

const ProjectInfo = ({
  allEmployees,
  t,
  ...props
}: {
  allEmployees: Employee[];
  t: { form: I18nLocale["form"]; placeholder: I18nLocale["placeholder"] };
  name: string;
  description: string
  setName:(n:string)=> void
  setDescription:(n:string)=> void
  save: () => void
  manager?:string;
  setManager: (m: string) =>void,
  employees: string[],
  setEmployees: (e:string[])=>void
}) => {

  return (
    <div className="flex flex-col items-center rounded-2xl max-md:px-5 ">
      <div className="gap-  border-primary2 mt-28 flex w-[643px] max-w-full flex-col  justify-center rounded-2xl border px-8 py-10 max-md:mt-10 max-md:px-5">
        <div className="self-center text-xl font-semibold">{t.form.newProject}</div>
        <div className="mt-12 font-semibold max-md:mt-10 max-md:max-w-full">
          {t.form.projectName}
        </div>
        <input
          value={props.name}
          onChange={(e) => props.setName(e.currentTarget.value)}
          className=" bg-primary focus:outline-primary2 mt-4  rounded-2xl focus:outline max-md:max-w-full"
        />
        <div className="mt-8 font-semibold max-md:max-w-full">{t.form.projectDesc}</div>
        <textarea
          value={props.description}
          onChange={(e) => props.setDescription( e.currentTarget.value)}
        
          className="bg-primary mt-4 h-[145px] rounded-2xl max-md:max-w-full"
        />
        <div className="mt-8 flex justify-center gap-8 max-md:flex-wrap">
          <div className="font-semibold">
            {t.form.projectManager}
            <ProjectManagerSelector
            manager={props.manager}
            setManager={props.setManager}
              employees={allEmployees}
              placeholder={t.placeholder.projectManager}
            />
          </div>
          <div className="flex w-full flex-col text-base">
            <div className="font-semibold">{t.form.employees}</div>
            <EmployeeSelector
            employees={props.employees}
            setEmployees={props.setEmployees}
              allEmployees={allEmployees}
              placeholder={t.placeholder.employees}
              placeholderNone={t.placeholder.none}
            />
          </div>
        </div>
        <div className="mt-8 flex justify-center gap-8 max-md:flex-wrap">
          {/*
            <div className="flex w-full flex-col text-base">
              <div className="font-semibold">Vali projekti põhi</div>
              <input className=" bg-primary mt-4 rounded-2xl" />
            </div>
            /*needs development*/}
        </div>
        <div className="flex justify-center font-semibold">
          <Button label={t.form.save} onClick={props.save} />

        </div>
      </div>
    </div>
  );
};
