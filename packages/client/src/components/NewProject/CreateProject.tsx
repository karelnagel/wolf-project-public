import { $tab, Employee } from "./NewProject";
import { EmployeeSelector } from "./EmployeeSelector";
import { ProjectManagerSelector } from "./ProjectManagerSelector";

interface CreateProjectProps {
  projectName: string;
  projectDescription: string;
  updateProjectName: (x: string) => void;
  updateProjectDescription: (x: string) => void;
  employees: Employee[];
  fixedOption: Employee | undefined;
  addEmployees: (x: Employee) => void;
  removeEmployees: (x: Employee) => void;
  updateProjectManager: (x: Employee | undefined) => void;
}

export const CreateProject: React.FC<CreateProjectProps> = ({
  projectName,
  projectDescription,
  updateProjectName,
  updateProjectDescription,
  employees,
  fixedOption,
  addEmployees,
  removeEmployees,
  updateProjectManager,
}) => {
  return (
    <form className="flex flex-col items-center rounded-2xl max-md:px-5 ">
      <div className="gap-  border-primary2 mt-28 flex w-[643px] max-w-full flex-col  justify-center rounded-2xl border px-8 py-10 max-md:mt-10 max-md:px-5">
        <div className="self-center text-xl font-semibold">Uus projekt</div>
        <div className="mt-12 font-semibold max-md:mt-10 max-md:max-w-full">Projekti nimi</div>
        <input
          value={projectName}
          onChange={(e) => updateProjectName(e.currentTarget.value)}
          className=" bg-primary focus:outline-primary2 mt-4  rounded-2xl focus:outline max-md:max-w-full"
        />
        <div className="mt-8 font-semibold max-md:max-w-full">Projekti kirjeldus</div>
        <textarea
          value={projectDescription}
          onChange={(e) => updateProjectDescription(e.currentTarget.value)}
          className="bg-primary mt-4 h-[145px] rounded-2xl max-md:max-w-full"
        />
        <div className="mt-8 flex justify-center gap-8 max-md:flex-wrap">
          <div className="font-semibold">
            {"Projectijuht"}
            <ProjectManagerSelector
              employeesList={employees}
              fixedOption={fixedOption}
              setProjectManager={updateProjectManager}
            />
          </div>
          <div className="flex w-full flex-col text-base">
            <div className="font-semibold">Seotud inimesed</div>
            <EmployeeSelector
              employeesList={employees}
              fixedOption={fixedOption}
              addEmployees={addEmployees}
              removeEmployees={removeEmployees}
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
        <button
          onClick={() => $tab.set("clients")}
          className="button bg-primary2 mt-12 justify-center self-center rounded-2xl px-8 py-3 text-base max-md:mt-10 max-md:px-5"
        >
          {"Edasi"}
        </button>
      </div>
    </form>
  );
};
