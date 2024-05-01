import * as React from "react";
import { ArrowLeft, TrendingUp, CalendarCheck, User, Plus } from "lucide-react";
import { Comments } from "./Comment";
import { $taskInfoPopUp } from "./NewProject/state";

export const TaskInfoPopUp = () => {
  return (
    <div className="flex w-full items-end">
      <div className="h-full w-full" onClick={() => $taskInfoPopUp.set(null)}></div>
      <div
        className="bg-primary mt-20 flex w-2/3 flex-col rounded-2xl px-16 pt-20"
        style={{ overflowY: "auto", maxHeight: "100vh" }}
      >
        <div className="flex max-w-full items-center justify-between">
          <button className="flex items-center" onClick={() => $taskInfoPopUp.set(null)}>
            <ArrowLeft />
          </button>
          <div className="text-center text-2xl font-semibold">Avakuva disaini loomine</div>
          <button className="bg-primary2 rounded-2xl px-5 py-2.5 text-base font-bold">Muuda</button>
        </div>
        <div className="justify-left my-16 flex max-w-full gap-5 whitespace-nowrap rounded-2xl px-5  text-center text-base max-md:mt-10">
          <div className="flex flex-col font-semibold">
            <div className="flex gap-5 ">
              <TrendingUp />
              <div>Staatus</div>
            </div>
            <div className="mt-8 flex gap-5 max-md:mr-2">
              <CalendarCheck />
              <div>Tähtaeg</div>
            </div>
            <div className="mt-8 flex justify-center gap-5">
              <User />
              <div>Vastutaja</div>
            </div>
          </div>
          <div className="my-auto flex flex-col gap-8 font-bold">
            <div>Tegemisel</div>
            <div>14.04.2024</div>
            <div>Veebihunt</div>
          </div>
        </div>
        <div className="border-primary2 flex flex-col rounded-2xl border border-solid py-8 pl-8 font-extrabold text-white  max-md:mt-10 max-md:max-w-full max-md:pl-5">
          <div className="text-center text-xl max-md:max-w-full">Täpsem kirjeldus</div>
          <div className="mt-6 flex flex-col text-sm font-semibold max-md:max-w-full">
            <div className=" max-md:max-w-full">Värvidena must, valge, punane</div>
            <div className="mt-4 max-md:max-w-full">Eelnevas etapis üleslaetud logo</div>
            <div className="mt-4 max-md:max-w-full">
              Müügiargumente, mis rõhutavad kogemust aastates, paindlikkust ning laia tootevalikut
            </div>
          </div>
        </div>
        <Comments taskId="task-reference" />
        <div className="border-primary2 mt-16 flex justify-between gap-5 rounded-2xl border border-solid p-6 text-xl font-semibold text-white max-md:mt-10 max-md:max-w-full max-md:flex-wrap max-md:px-5">
          <div className="my-auto">Tulemus</div>
          <button>
            <Plus className="text-primary2  my-auto h-8 w-8" />
          </button>
        </div>
      </div>
    </div>
  );
};
