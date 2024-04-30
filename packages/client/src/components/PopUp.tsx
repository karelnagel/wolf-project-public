import React, { useState } from "react";
import Datepicker, { DateType } from "react-tailwindcss-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ArrowLeft, Paperclip } from "lucide-react";
import { SingleSelect } from "./SingleSelect";
import { Locale, useTranslations } from "@wolf-project/i18n";
import { Task, TaskStatus, TaskType } from "@wolf-project/db/schema";

interface PopUpProps {
  task: Task | undefined;
  addTask: (x: Task) => void;
  modifyTask: (x: Task, y: Task) => void;
  removeTask: (x: Task) => void;
  responsible: string[];
  closePopUp: () => void;
  locale: Locale;
}

export const PopUp: React.FC<PopUpProps> = ({
  task,
  addTask,
  modifyTask,
  removeTask,
  responsible,
  closePopUp,
  locale,
}) => {
  const t = useTranslations(locale);

  const [status, setStatus] = useState<TaskStatus>(task?.status || "pending");
  const [taskType, setTaskType] = useState<TaskType>(task?.type || "input");
  const [title, setTitle] = useState(task?.title || "");
  const [taskResponible, setTaskResponsible] = useState(task?.responsible || "");
  const [deadline, setDeadline] = useState<DateType>(task?.deadline || null);
  const [taskDescription, setTaskDescription] = useState(task?.description || "");

  const convertedResponsible = responsible.map((value) => ({ value, label: value }));

  const handleSave = () => {
    if (!deadline) return;
    // Todo fix the types
    const popUpTask: Task = {
      responsible: taskResponible,
      title: title,
      status: status,
      deadline: typeof deadline === "string" ? new Date(deadline) : deadline,
      completed: status === "completed" ? new Date() : null,
      type: taskType,
      description: taskDescription,
    } as Task;
    if (task) {
      modifyTask(task, popUpTask);
    } else {
      addTask(popUpTask);
    }
    closePopUp();
  };

  const handleDelete = () => {
    if (task) removeTask(task);
    closePopUp();
  };

  return (
    <div
      className="bg-primary flex w-full flex-col justify-center rounded-2xl px-12 py-10 max-md:px-5"
      style={{ overflowY: "auto", maxHeight: "100%" }}
    >
      <div className="justify- mb-16 mt-14 flex items-center gap-5 text-center text-2xl font-bold max-md:mt-10 max-md:max-w-full max-md:flex-wrap">
        <button onClick={closePopUp}>
          <ArrowLeft className="text-primary2 aspect-square h-9 w-9  shrink-0" />
        </button>
        <div className="flex-grow">Uue taski loomine</div>
      </div>
      <div className="mt-17 flex flex-col  max-md:mt-10 max-md:max-w-full">
        <div className="flex items-center justify-between">
          <div className="text-start text-base font-bold">
            Tööetapp
            <select
              value={taskType}
              onChange={(e) => setTaskType(e.currentTarget.value as TaskType)}
              className="mt-4 w-full rounded-2xl bg-white px-2 py-1.5 font-semibold text-black"
            >
              {TaskType.options.map((x) => (
                <option value={x}>{t.type[x]}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <div className="text-start text-base font-bold">
            {"Staatus"}
            <SingleSelect
              selectOptions={TaskStatus.options.map((x) => ({ value: x, label: t.status[x] }))}
              selectedOption={status}
              parentSetMethod={(x) => setStatus(x as TaskStatus)}
              dark={false}
            />
          </div>
        </div>
      </div>
      <div className="mt-3.5 flex flex-col justify-center max-md:max-w-full">
        <div className="flex flex-col max-md:max-w-full">
          <div className="text-start text-base font-bold">{"Taski nimi"}</div>
          <div className="relative mt-4 flex flex-col justify-center text-base max-md:max-w-full">
            <textarea
              value={title}
              onChange={(e) => setTitle(e.currentTarget.value)}
              className="h-12 rounded-2xl bg-white text-black max-md:max-w-full"
            />
          </div>
        </div>
        <div className="mt-8 flex justify-center gap-5">
          <div className="w-full text-start text-base font-bold">
            {"Vastutaja"}
            <SingleSelect
              selectOptions={convertedResponsible}
              selectedOption={taskResponible}
              parentSetMethod={(x) => setTaskResponsible(x)}
              dark={false}
            />
          </div>

          <div className="flex w-full flex-col ">
            <div className="mb-4 text-start text-base font-bold">{"Tähtaeg"}</div>
            <div className="">
              <Datepicker
                inputClassName={"bg-white h-1/2 w-full "}
                placeholder={"Vali tähtaeg!"}
                useRange={false}
                asSingle={true}
                value={{ startDate: deadline || null, endDate: deadline || null }}
                onChange={(x) => (x ? setDeadline(x.startDate) : undefined)}
              />
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col max-md:max-w-full">
          <div className="flex flex-grow text-start text-base font-bold text-white max-md:max-w-full">
            {"Taski kirjeldus"}
            <Paperclip className="text-primary2 ml-2 aspect-square w-5 max-md:mt-10" />
          </div>
          <div className="mt-4 flex flex-col justify-center text-base max-md:max-w-full ">
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.currentTarget.value)}
              className="rounded-2xl bg-white text-black max-md:max-w-full"
            />
          </div>
        </div>
      </div>
      <div className="mt-16 flex gap-5 self-center text-base font-extrabold max-md:mt-10">
        {task && (
          <button
            onClick={handleDelete}
            className="bg-primary justify-center rounded-2xl border-2 border-solid border-black px-9 py-4 max-md:px-5"
          >
            {"Kustuta"}
          </button>
        )}
        <button onClick={handleSave} className="bg-primary2 rounded-2xl px-9 py-4">
          {"Salvesta"}
        </button>
      </div>
    </div>
  );
};
