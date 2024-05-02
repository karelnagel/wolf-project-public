import React from "react";
import Datepicker from "react-tailwindcss-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ArrowLeft, Paperclip } from "lucide-react";
import { SingleSelect } from "./SingleSelect";
import { I18nLocale } from "@wolf-project/i18n";
import { TaskStatus, TaskType } from "@wolf-project/db/schema";
import { $taskEditPopUp, $projectInput, $selectedTask, setTasks } from "./NewProject/state";
import { useStore } from "@nanostores/react";
import { OUR_COMPANY_NAME } from "@wolf-project/shared/consts";
import { Button } from "./Buttons";

export const TaskEditPopUp = ({
  t,
  lang,
}: {
  t: { form: I18nLocale["form"]; type: I18nLocale["type"]; status: I18nLocale["status"] };
  lang: string;
}) => {
  const input = useStore($projectInput);
  const task = useStore($selectedTask);
  const popup = useStore($taskEditPopUp);

  const handleSave = () => {
    if (popup?.type === "edit") setTasks(input.tasks.map((x) => (x.id === popup.id ? task : x)));
    else setTasks([...input.tasks, task]);

    $taskEditPopUp.set(null);
  };

  const handleDelete = () => {
    if (popup?.type !== "edit") return;
    setTasks(input.tasks.filter((task) => task.id !== popup.id));
    $taskEditPopUp.set(null);
  };

  return (
    <div className="flex w-full">
      <div className="h-screen w-full" onClick={() => $taskEditPopUp.set(null)}></div>
      <div
        className="bg-primary items-right flex w-3/5 flex-col justify-center rounded-2xl px-12 py-10 max-md:px-5"
        style={{ overflowY: "auto", maxHeight: "100vh" }}
      >
        <div className="justify- mb-16 mt-14 flex items-center gap-5 text-center text-2xl font-bold max-md:mt-10 max-md:max-w-full max-md:flex-wrap">
          <button onClick={() => $taskEditPopUp.set(null)}>
            <ArrowLeft className="text-primary2 aspect-square h-9 w-9  shrink-0" />
          </button>
          <div className="flex-grow">
            {popup?.type === "edit" ? t.form.editTask : t.form.newTask}
          </div>
        </div>
        <div className="mt-17 flex flex-col  max-md:mt-10 max-md:max-w-full">
          <div className="flex items-center justify-between">
            <div className="h-full text-start text-base font-bold">
              {t.form.type}
              <SingleSelect
                selectOptions={TaskType.options.map((x) => ({ value: x, label: t.type[x] }))}
                selectedOption={task.type}
                onChange={(x) => $selectedTask.setKey("type", x as TaskType)}
                dark={false}
              />
            </div>
            <div className="text-start text-base font-bold">
              {t.form.status}
              <SingleSelect
                selectOptions={TaskStatus.options.map((x) => ({ value: x, label: t.status[x] }))}
                selectedOption={task.status}
                onChange={(x) => {
                  if (x === "completed") {
                    $selectedTask.setKey("completed", new Date());
                  } else {
                    $selectedTask.setKey("completed", null);
                  }
                  $selectedTask.setKey("status", x as TaskStatus);
                }}
                dark={false}
              />
            </div>
          </div>
        </div>
        <div className="mt-3.5 flex flex-col justify-center max-md:max-w-full">
          <div className="flex flex-col max-md:max-w-full">
            <div className="text-start text-base font-bold">{t.form.taskName}</div>
            <div className="relative mt-4 flex flex-col justify-center text-base max-md:max-w-full">
              <textarea
                value={task.title}
                onChange={(e) => $selectedTask.setKey("title", e.currentTarget.value)}
                className="h-12 rounded-2xl bg-white text-black max-md:max-w-full"
              />
            </div>
          </div>
          <div className="mt-8 flex justify-center gap-5">
            <div className="w-full text-start text-base font-bold">
              {t.form.responsible}
              <SingleSelect
                selectOptions={[
                  { value: "us", label: OUR_COMPANY_NAME },
                  { value: "them", label: input.companyName },
                ]}
                selectedOption={task.clientTask ? "them" : "us"}
                onChange={(x) => $selectedTask.setKey("clientTask", x === "them")}
                dark={false}
              />
            </div>

            <div className="flex w-full flex-col ">
              <div className="mb-4 text-start text-base font-bold">{t.form.deadline}</div>
              <div className="">
                <Datepicker
                  i18n={lang}
                  readOnly={true}
                  displayFormat={"DD/MM/YYYY"}
                  inputClassName={"bg-white h-1/2 w-full "}
                  useRange={false}
                  asSingle={true}
                  value={{ startDate: task.deadline || null, endDate: task.deadline || null }}
                  onChange={(x) =>
                    x?.startDate
                      ? $selectedTask.setKey(
                          "deadline",
                          typeof x.startDate === "string" ? new Date(x.startDate) : x.startDate,
                        )
                      : undefined
                  }
                />
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col max-md:max-w-full">
            <div className="flex flex-grow text-start text-base font-bold text-white max-md:max-w-full">
              {t.form.taskDesc}
              <Paperclip className="text-primary2 ml-2 aspect-square w-5 max-md:mt-10" />
            </div>
            <div className="mt-4 flex flex-col justify-center text-base max-md:max-w-full ">
              <textarea
                value={task.description}
                onChange={(e) => $selectedTask.setKey("description", e.currentTarget.value)}
                className="rounded-2xl bg-white text-black max-md:max-w-full"
              />
            </div>
          </div>
        </div>
        <div className="mt-16 flex gap-5 self-center text-base font-extrabold max-md:mt-10">
          <Button
            label={popup?.type === "edit" ? t.form.delete : t.form.cancel}
            onClick={handleDelete}
          />
          <Button label={t.form.save} onClick={handleSave} />
        </div>
      </div>
    </div>
  );
};
