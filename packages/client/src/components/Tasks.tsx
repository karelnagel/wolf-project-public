import React, { useState } from "react";
import PopUp from "../components/PopUp";
import {
  ChevronUpCircle,
  ChevronDownCircle,
  ArrowLeft,
  Pencil,
  MessageSquare,
  Code,
} from "lucide-react";
import { TaskInfo } from "../components/TaskInfo";

const ProjectPage = () => {
  const allTasks = [
    {
      Responsible: "Veebihunt",
      Name: "Avakuva disaini loomine",
      Deadline: new Date("2024-03-03"),
      Status: "Done",
      Completed: new Date("2024-03-05"),
      Icon: Pencil,
    },
    {
      Responsible: "Maarjamõisa Venitehas OÜ",
      Name: "Avakuva disainile tagasiside andmine",
      Deadline: new Date("2024-03-03"),
      Status: "InProgress",
      //   Completed: new Date("2023-06-06"),
      Icon: MessageSquare,
    },
    {
      Responsible: "Veebihunt",
      Name: "Kinnitatud disaini põhjal alamlehtede loomine",
      Deadline: new Date("2024-03-03"),
      Status: "Waiting",
      Completed: undefined,
      Icon: Code,
    },
  ];

  const [showPopUp, setShowPopUp] = useState(false);

  const handlePopUpToggle = () => {
    setShowPopUp(!showPopUp);
  };

  return (
    <div className="flex justify-center px-16 py-20 max-md:px-5">
      <div className="flex w-full flex-col max-md:max-w-full">
        <div className="flex w-full items-start justify-center gap-5 text-center font-semibold max-md:max-w-full max-md:flex-wrap">
          <button className="text-primary2">
            <ArrowLeft className="aspect-square h-11 w-11 shrink-0" />
          </button>
          <div className="flex items-start gap-5 text-3xl max-md:mt-10">
            <div className="flex grow flex-col self-center">
              <div>Veebiarenduse projekt</div>
              <button className="text-primary2 mt-11 aspect-[1.03] self-center max-md:mt-10">
                <ChevronUpCircle className="h-9 w-9 " />
              </button>
              <TaskInfo tasks={allTasks} />
              <button className="text-primary2 m-11 aspect-[1.03] self-center max-md:mt-10">
                <ChevronDownCircle className="h-9 w-9" />
              </button>
              <div className="flex max-w-[281px] justify-between gap-12 self-center text-base font-semibold">
                <button
                  className="bg-primary2 justify-center rounded-2xl px-5 py-2.5"
                  onClick={handlePopUpToggle}
                >
                  Lisa task
                </button>
                <button className="bg-primary2 justify-center whitespace-nowrap rounded-2xl px-5 py-2.5">
                  Edasi
                </button>
              </div>
            </div>
            <button className="text-normal bg-primary -mt-3 justify-center rounded-2xl p-4 text-base">
              Logi välja
            </button>
          </div>
        </div>

        {/* <TaskPopUp></TaskPopUp> */}
      </div>
      <div
        className={`fixed right-0 top-0 flex h-full w-2/5 transform shadow-lg transition-transform ${
          showPopUp ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {showPopUp && <PopUp />}
      </div>
    </div>
  );
};

export default ProjectPage;
