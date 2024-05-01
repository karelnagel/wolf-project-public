import React, { useEffect, useState } from "react";
import { PopUp } from "../PopUp";
import { ChevronUpCircle, ChevronDownCircle, ArrowLeft } from "lucide-react";
import { TaskInfo } from "../TaskInfo";
import { $popUpOpen, $projectInput, $tab } from "./state";
import { useStore } from "@nanostores/react";


export const Tasks = () => {
  const input = useStore($projectInput);
  const tasks = input.tasks;
  const popupOpen = useStore($popUpOpen);

  const firstInprogress = tasks.findIndex((x) => x.status === "inprogress");
  const lastDone = tasks.findLastIndex((x) => x.status === "completed");
  const [startIndex, setStartIndex] = useState<number>();

  useEffect(() => {
    if (firstInprogress !== -1 && lastDone < firstInprogress) {
      setStartIndex(firstInprogress > 0 ? firstInprogress - 1 : 0);
      return;
    }
    if (lastDone > firstInprogress) {
      setStartIndex(lastDone);
      return;
    }
    setStartIndex(0);
  }, [firstInprogress, lastDone]);

  const increaseStartIndex = () => {
    if (startIndex! < tasks.length - 1) setStartIndex(startIndex! + 1);
  };

  const decreaseStartIndex = () => {
    if (startIndex! > 0) setStartIndex(startIndex! - 1);
  };

  return (
    <div className="flex justify-center px-16 py-20 max-md:px-5">
      <div className="flex w-full flex-col max-md:max-w-full">
        <div className="flex w-full items-start justify-center gap-5 text-center font-semibold max-md:max-w-full max-md:flex-wrap">
          <button className="text-primary2" onClick={() => $tab.set("clients")}>
            <ArrowLeft className="aspect-square h-11 w-11 shrink-0" />
          </button>
          <div className="flex items-start gap-5 text-3xl max-md:mt-10">
            <div className="flex grow flex-col self-center">
              <div>Veebiarenduse projekt</div>
              {tasks.length > 3 && (
                <button
                  onClick={decreaseStartIndex}
                  className="text-primary2 mt-11 aspect-[1.03] self-center max-md:mt-10"
                >
                  <ChevronUpCircle className="h-9 w-9 " />
                </button>
              )}
              <TaskInfo startIndex={startIndex!} />
              {tasks.length > 3 && (
                <button
                  onClick={increaseStartIndex}
                  className="text-primary2 m-11 aspect-[1.03] self-center max-md:mt-10"
                >
                  <ChevronDownCircle className="h-9 w-9" />
                </button>
              )}
              <div className="flex max-w-[281px] justify-between gap-12 self-center text-base font-semibold">
                <button
                  className="bg-primary2 justify-center rounded-2xl px-5 py-2.5"
                  onClick={() => $popUpOpen.set(true)}
                >
                  Lisa task
                </button>
                <button
                  className="bg-primary2 justify-center whitespace-nowrap rounded-2xl px-5 py-2.5"
                  onClick={() => $tab.set("confirm")}
                >
                  Edasi
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`fixed right-0 top-0 w-2/5 transform shadow-lg transition-transform ${
            popupOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {popupOpen && <PopUp />}
        </div>
      </div>
    </div>
  );
};
