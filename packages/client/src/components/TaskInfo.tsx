import React from "react";
import { CircleCheck, LucideIcon } from "lucide-react";

interface TaskinfoProps {
  Responsible: string;
  Name: string;
  Deadline: Date;
  Status: string;
  Completed?: Date;
  Icon: LucideIcon;
}

export const TaskInfo = ({ tasks }: { tasks: TaskinfoProps[] }) => {
  return (
    <>
      {tasks.map((task, index) => (
        <React.Fragment key={index}>
          {index === 0 && <Line Completed={task.Completed} />}
          <div
            key={index}
            className={`grid w-full max-w-full grid-cols-7 items-center justify-between gap-5 self-start rounded-2xl px-5 py-2.5 max-md:flex-wrap ${
              task.Status === "InProgress" ? " border-primary2 my-5 border-[1px] py-5" : ""
            }`}
          >
            <div className="col-span-2 my-auto self-stretch text-center text-xl font-bold">
              {task.Responsible}
            </div>
            <Icons Completed={task.Completed} task={task} />
            <div className="col-span-3 flex justify-between gap-5 self-stretch max-md:max-w-full max-md:flex-wrap">
              <div className="flex flex-col">
                <div className="text-left text-xl font-semibold">
                  {index + 1}. {task.Name}
                </div>
                <div className="mt-4 flex gap-5 text-base max-md:mx-2.5">
                  <div className="flex flex-col items-start font-semibold">
                    <span className="font-bold">Tähtaeg:</span>
                    <span className="font-medium">{task.Deadline.toLocaleDateString()}</span>
                  </div>
                  {task.Completed && (
                    <div className="flex flex-col items-start">
                      <span className="font-bold">Tehtud:</span>
                      <span className="text-primary2">{task.Completed.toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <button className="bg-primary2 my-auto justify-center self-stretch rounded-2xl px-5 py-2.5 text-center text-xl font-semibold">
              Muuda
            </button>
          </div>
          <Line Completed={task.Completed} />
        </React.Fragment>
      ))}
    </>
  );
};

const Icons = ({ Completed, task }: { Completed?: Date; task: TaskinfoProps }) => {
  const Icon = Completed ? CircleCheck : task.Icon;
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Icon className={`h-10 w-10 ${Completed ? "text-primary2" : "text-white"}`} />
    </div>
  );
};

const Line = ({ Completed }: { Completed?: Date }) => {
  return (
    <div className={`grid h-10 w-full grid-cols-7 gap-5 px-5`}>
      <div className="col-span-2"></div>
      <div className="flex justify-center">
        <div className={`h-10 w-[1px] ${Completed ? "bg-primary2" : "bg-white"}`}></div>
      </div>
    </div>
  );
};
