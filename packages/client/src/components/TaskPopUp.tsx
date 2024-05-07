import * as React from "react";
import { ArrowLeft, TrendingUp, CalendarCheck, User } from "lucide-react";
import { Comments } from "./Comment";
import { $projectInput, $selectedTask, $taskEditPopUp, $taskInfoPopUp } from "./NewProject/state";
import { I18nLocale } from "@wolf-project/i18n";
import { Button } from "./Buttons";
import { useStore } from "@nanostores/react";

export const TaskInfoPopUp = ({
  t,
  canEdit,
}: {
  t: { form: I18nLocale["form"]; status: I18nLocale["status"]; comment: I18nLocale["comment"] };
  canEdit: boolean;
}) => {
  const project = useStore($projectInput);
  const task = useStore($selectedTask);
  return (
    <div className="flex w-full items-end">
      <div
        className="h-full w-full bg-black opacity-50"
        onClick={() => $taskInfoPopUp.set(null)}
      ></div>
      <div
        className="bg-primary mt-20 flex w-2/3 flex-col rounded-2xl px-16 pt-20"
        style={{ overflowY: "auto", maxHeight: "100vh" }}
      >
        <div className="flex max-w-full items-center justify-between">
          <button className="flex items-center" onClick={() => $taskInfoPopUp.set(null)}>
            <ArrowLeft />
          </button>
          <div className="text-center text-2xl font-semibold">{task.title}</div>
          <Button
            label={canEdit ? t.form.change : t.form.disabled}
            disabled={!canEdit}
            onClick={() => {
              $taskInfoPopUp.set(null);
              $taskEditPopUp.set({ type: "edit", id: task.id });
            }}
          />
        </div>
        <div className="justify-left my-16 flex max-w-full gap-5 whitespace-nowrap rounded-2xl px-5 text-base max-md:mt-10">
          <div className="flex flex-col font-semibold">
            <div className="flex gap-5 ">
              <TrendingUp />
              <div>{t.form.status}</div>
            </div>
            <div className="mt-8 flex gap-5 max-md:mr-2">
              <CalendarCheck />
              <div>{t.form.deadline}</div>
            </div>
            <div className="mt-8 flex justify-center gap-5">
              <User />
              <div>{t.form.responsible}</div>
            </div>
          </div>
          <div className="my-auto flex flex-col gap-8 font-bold">
            <div>
              {task.status === "pending"
                ? t.status.pending
                : task.status === "inprogress"
                  ? t.status.inprogress
                  : t.status.completed}
            </div>

            <div>{task.deadline.toLocaleDateString("et")}</div>
            <div>{task.clientTask ? "Veebihunt" : project.companyName}</div>
          </div>
        </div>
        <div className="border-primary2 flex flex-col rounded-2xl border border-solid py-8 pl-8 font-extrabold text-white  max-md:mt-10 max-md:max-w-full max-md:pl-5">
          <div className="text-center text-xl max-md:max-w-full">{t.form.taskDesc}</div>
          <div className="mt-6 flex flex-col text-sm font-semibold max-md:max-w-full">
            <div className=" max-md:max-w-full">{project.description}</div>
          </div>
        </div>
        <Comments t={t.comment} taskId={task.id} />
        {/* Needs development
        <div className="border-primary2 mt-16 flex justify-between gap-5 rounded-2xl border border-solid p-6 text-xl font-semibold text-white max-md:mt-10 max-md:max-w-full max-md:flex-wrap max-md:px-5">
          <div className="my-auto">Tulemus</div>
          <button>
            <Plus className="text-primary2  my-auto h-8 w-8" />
          </button>
        </div>*/}
      </div>
    </div>
  );
};
