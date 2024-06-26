import React, { useEffect, useState } from "react";
import { TaskEditPopUp } from "../PopUp";
import { ChevronUpCircle, ChevronDownCircle } from "lucide-react";
import { TaskInfo } from "../TaskInfo";
import { $taskEditPopUp, $projectInput, $taskInfoPopUp, $tab } from "./state";
import { useStore } from "@nanostores/react";
import { I18nLocale } from "@wolf-project/i18n";
import { TaskInfoPopUp } from "../TaskPopUp";
import { Button } from "../Buttons";
import _ from "lodash";
const { pick } = _;

export const Tasks = ({
  t,
  lang,
  newProject,
  exProject,
  canEdit,
}: {
  t: {
    form: I18nLocale["form"];
    type: I18nLocale["type"];
    status: I18nLocale["status"];
    comment: I18nLocale["comment"];
  };
  lang: string;
  newProject?: boolean;
  exProject?: boolean;
  canEdit: boolean;
}) => {
  const input = useStore($projectInput);
  const tasks = input.tasks;
  const popupOpen = useStore($taskEditPopUp);
  const taskInfoPopup = useStore($taskInfoPopUp);

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
          <div className="border-primary2 flex flex-col items-start gap-5 rounded-2xl border px-4 py-6 text-3xl max-md:mt-10">
            <div className="flex grow flex-col self-center p-4">
              <div className="mb-4 inline-block align-middle">{t.form.tasks}</div>
              {tasks.length > 3 && (
                <button
                  onClick={decreaseStartIndex}
                  className="text-primary2 mt-11 aspect-[1.03] self-center max-md:mt-10"
                >
                  <ChevronUpCircle className="h-9 w-9 " />
                </button>
              )}
              <TaskInfo
                startIndex={startIndex!}
                canEdit={canEdit}
                t={t.form}
              />
              {tasks.length > 3 && (
                <button
                  onClick={increaseStartIndex}
                  className="text-primary2 m-11 aspect-[1.03] self-center max-md:mt-10"
                >
                  <ChevronDownCircle className="h-9 w-9" />
                </button>
              )}
            </div>
            <div className="flex justify-between gap-12 self-center text-base font-semibold">
              <Button
                dark={true}
                onClick={() => {
                  if (newProject) $tab.set("clients");
                  if (exProject) window.location.href = "/";
                }}
                label={t.form.backward}
              />
              {canEdit && (
                <Button
                  onClick={() => $taskEditPopUp.set({ type: "new" })}
                  label={t.form.addTask}
                />
              )}
              {newProject && <Button onClick={() => $tab.set("confirm")} label={t.form.forward} />}
            </div>
          </div>
        </div>
        <div
          className={`fixed right-0 top-0 z-10 w-full transform shadow-lg transition-transform ${
            popupOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {popupOpen && <TaskEditPopUp t={t} exProject={exProject} lang={lang} />}
        </div>
        {exProject && (
          <div
            className={`fixed right-0 top-0 z-10 flex h-full w-full transform shadow-lg transition-transform ${
              taskInfoPopup ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {taskInfoPopup && (
              <TaskInfoPopUp canEdit={canEdit} t={pick(t, ["form", "status", "comment"])} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
