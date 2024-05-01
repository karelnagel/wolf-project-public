import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ArrowLeft, Paperclip } from "lucide-react";
import { SingleSelect } from "./SingleSelect";
import { useTranslations } from "@wolf-project/i18n";
import { TaskStatus, TaskType } from "@wolf-project/db/schema";
import { $popUpOpen, $projectInput, setTasks } from "./NewProject/state";
import { OUR_COMPANY_NAME } from "@wolf-project/shared/consts";
import { useStore } from "@nanostores/react";
import { CreateProjectTask } from "@wolf-project/backend/src/routes/projects";

const defaultTask: CreateProjectTask = {
  title: "",
  status: "pending",
  deadline: new Date(),
  completed: null,
  type: "input",
  description: "",
  clientTask: false,
};

export const PopUp = () => {
  const t = useTranslations("et");
  const input = useStore($projectInput);
  const [task, setTask] = useState<CreateProjectTask>(defaultTask);

  const handleSave = () => {
    setTasks([...input.tasks, task]);
    $popUpOpen.set(false);
    setTask(defaultTask);
  };

  const handleDelete = () => {
    // Todo
    // if (task) removeTask(task);
    $popUpOpen.set(false);
  };

  return (
    <div
      className="bg-primary flex w-full flex-col justify-center rounded-2xl px-12 py-10 max-md:px-5"
      style={{ overflowY: "auto", maxHeight: "100%" }}
    >
      <div className="justify- mb-16 mt-14 flex items-center gap-5 text-center text-2xl font-bold max-md:mt-10 max-md:max-w-full max-md:flex-wrap">
        <button onClick={() => $popUpOpen.set(false)}>
          <ArrowLeft className="text-primary2 aspect-square h-9 w-9  shrink-0" />
        </button>
        <div className="flex-grow">Uue taski loomine</div>
      </div>
      <div className="mt-17 flex flex-col  max-md:mt-10 max-md:max-w-full">
        <div className="flex items-center justify-between">
          <div className="text-start text-base font-bold">
            Tööetapp
            <select
              value={task.type}
              onChange={(e) => setTask({ ...task, type: e.currentTarget.value as TaskType })}
              className="mt-4 w-full rounded-2xl bg-white px-2 py-1.5 font-semibold text-black"
            >
              {TaskType.options.map((x) => (
                <option key={x} value={x}>
                  {t.type[x]}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <div className="text-start text-base font-bold">
            {"Staatus"}
            <SingleSelect
              selectOptions={TaskStatus.options.map((x) => ({ value: x, label: t.status[x] }))}
              selectedOption={task.status}
              onChange={(x) => setTask({ ...task, status: x as TaskStatus })}
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
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.currentTarget.value })}
              className="h-12 rounded-2xl bg-white text-black max-md:max-w-full"
            />
          </div>
        </div>
        <div className="mt-8 flex justify-center gap-5">
          <div className="w-full text-start text-base font-bold">
            {"Vastutaja"}
            <SingleSelect
              selectOptions={[
                { value: "us", label: OUR_COMPANY_NAME },
                { value: "them", label: input.companyName },
              ]}
              selectedOption={task.clientTask ? "them" : "us"}
              onChange={(x) => setTask({ ...task, clientTask: x === "them" })}
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
                value={{ startDate: task.deadline || null, endDate: task.deadline || null }}
                onChange={(x) =>
                  x?.startDate
                    ? setTask({
                        ...task,
                        deadline:
                          typeof x.startDate === "string" ? new Date(x.startDate) : x.startDate,
                      })
                    : undefined
                }
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
              value={task.description}
              onChange={(e) => setTask({ ...task, description: e.currentTarget.value })}
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
