import * as React from "react";
import { Comment } from "./Comment";
import {
    ArrowLeft,
    TrendingUp,
    CalendarCheck,
    User,
    Plus

} from 'lucide-react'
const comments = [
    {
      commenter: "Veini-Albert",
      date: "Monday, April 1",
      time: "15:06:12",
      text: "Jep, nice. Kas saaks muidu logo veits paremale liigutada?",
    },
    {
      commenter: "Hundi-Pets",
      date: "Monday, April 1",
      time: "15:11:09",
      text: "Jaa, ikka",
    }
  ];
function TaskPopUp() {
  return (
    <div className="flex justify-center items-center px-16 py-20 rounded-2xl max-md:px-5">
      <div className="flex flex-col mt-20 w-2/3 max-md:mt-10 max-md:max-w-full">
        <div className="flex justify-between items-center max-w-full">
            <div className="flex items-center">
                <ArrowLeft />
            </div>
            <div className="text-2xl font-semibold text-center">
                Avakuva disaini loomine
            </div>
            <button className="px-5 py-2.5 text-base font-bold bg-primary2 rounded-2xl">
                Muuda
            </button>
        </div>
        <div className="flex gap-5 justify-left px-5 my-16 max-w-full text-base text-center  whitespace-nowrap rounded-2xl max-md:mt-10">
          <div className="flex flex-col font-semibold">
            <div className="flex gap-5 ">
              <TrendingUp />
              <div>Staatus</div>
            </div>
            <div className="flex gap-5 mt-8 max-md:mr-2">
                <CalendarCheck/>
                <div>Tähtaeg</div>
            </div>
            <div className="flex gap-5 mt-8 justify-center">
                <User/>
                <div>Vastutaja</div>
            </div>
          </div>
          <div className="flex flex-col my-auto gap-8 font-bold">
            <div>Tegemisel</div>
            <div>14.04.2024</div>
            <div>Veebihunt</div>
          </div>
        </div>
        <div className="flex flex-col py-8 pl-8 font-extrabold text-white rounded-2xl border border-primary2 border-solid  max-md:pl-5 max-md:mt-10 max-md:max-w-full">
          <div className="text-xl text-center max-md:max-w-full">
            Täpsem kirjeldus
          </div>
          <div className="flex flex-col mt-6 text-sm font-semibold max-md:max-w-full">
            <div className=" max-md:max-w-full">
              Värvidena must, valge, punane
            </div>
            <div className="mt-4 max-md:max-w-full">
              Eelnevas etapis üleslaetud logo
            </div>
            <div className="mt-4 max-md:max-w-full">
              Müügiargumente, mis rõhutavad kogemust aastates, paindlikkust ning
              laia tootevalikut
            </div>
          </div>
        </div>
        <Comment taskRef="task-reference" commenterId="commenter-id" comments={comments} />

        <div className="flex gap-5 justify-between p-6 mt-16 text-xl font-semibold text-white rounded-2xl border border-primary2 border-solid max-md:flex-wrap max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <div className="my-auto">Tulemus</div>
          <Plus className="my-auto  h-8 w-8 text-primary2"/>
        </div>
      </div>
    </div>
  );
}
export default TaskPopUp;

