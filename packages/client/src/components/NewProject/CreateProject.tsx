import { $projectInput, $tab, Employee } from "./NewProject";
import { EmployeeSelector } from "./EmployeeSelector";
import { ProjectManagerSelector } from "./ProjectManagerSelector";
import { useStore } from "@nanostores/react";

export const CreateProject = ({ employees }: { employees: Employee[] }) => {
  const input = useStore($projectInput);

  return (
    <div className="flex flex-col items-center rounded-2xl max-md:px-5 ">
      <div className="gap-  border-primary2 mt-28 flex w-[643px] max-w-full flex-col  justify-center rounded-2xl border px-8 py-10 max-md:mt-10 max-md:px-5">
        <div className="self-center text-xl font-semibold">Uus projekt</div>
        <div className="mt-12 font-semibold max-md:mt-10 max-md:max-w-full">Projekti nimi</div>
        <input
          value={input.name}
          onChange={(e) => $projectInput.setKey("name", e.currentTarget.value)}
          className=" bg-primary focus:outline-primary2 mt-4  rounded-2xl focus:outline max-md:max-w-full"
        />
        <div className="mt-8 font-semibold max-md:max-w-full">Projekti kirjeldus</div>
        <textarea
          value={input.description}
          onChange={(e) => $projectInput.setKey("description", e.currentTarget.value)}
          className="bg-primary mt-4 h-[145px] rounded-2xl max-md:max-w-full"
        />
        <div className="mt-8 flex justify-center gap-8 max-md:flex-wrap">
          <div className="font-semibold">
            {"Projectijuht"}
            <ProjectManagerSelector employees={employees} />
          </div>
          <div className="flex w-full flex-col text-base">
            <div className="font-semibold">Seotud inimesed</div>
            <EmployeeSelector employees={employees} />
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
    </div>
  );
};
