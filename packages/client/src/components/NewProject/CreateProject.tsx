import { Employee } from "./NewProject";
import { EmployeeSelector } from "./EmployeeSelector";
import { ProjectManagerSelector } from "./ProjectManagerSelector";
import { useStore } from "@nanostores/react";
import { $projectInput, $tab } from "./state";
import { I18nLocale } from "@wolf-project/i18n";
import { Button } from "../Buttons";

export const CreateProject = ({
  employees,
  t,
}: {
  employees: Employee[];
  t: { form: I18nLocale["form"]; placeholder: I18nLocale["placeholder"] };
}) => {
  const input = useStore($projectInput);

  return (
    <div className="flex flex-col items-center rounded-2xl max-md:px-5 ">
      <div className="gap-  border-primary2 mt-28 flex w-[643px] max-w-full flex-col  justify-center rounded-2xl border px-8 py-10 max-md:mt-10 max-md:px-5">
        <div className="self-center text-xl font-semibold">{t.form.newProject}</div>
        <div className="mt-12 font-semibold max-md:mt-10 max-md:max-w-full">
          {t.form.projectName}
        </div>
        <input
          value={input.name}
          onChange={(e) => $projectInput.setKey("name", e.currentTarget.value)}
          className=" bg-primary focus:outline-primary2 mt-4  rounded-2xl focus:outline max-md:max-w-full"
        />
        <div className="mt-8 font-semibold max-md:max-w-full">{t.form.projectDesc}</div>
        <textarea
          value={input.description}
          onChange={(e) => $projectInput.setKey("description", e.currentTarget.value)}
          className="bg-primary mt-4 h-[145px] rounded-2xl max-md:max-w-full"
        />
        <div className="mt-8 flex justify-center gap-8 max-md:flex-wrap">
          <div className="font-semibold">
            {t.form.projectManager}
            <ProjectManagerSelector
              employees={employees}
              placeholder={t.placeholder.projectManager}
            />
          </div>
          <div className="flex w-full flex-col text-base">
            <div className="font-semibold">{t.form.employees}</div>
            <EmployeeSelector
              employees={employees}
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
          <Button dark={false} label={t.form.forward} onClick={() => $tab.set("clients")} />
        </div>
      </div>
    </div>
  );
};
