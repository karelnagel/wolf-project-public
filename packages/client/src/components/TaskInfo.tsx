import React from "react";
import { Brush, CircleCheck, Code, X, MessageSquare, Pencil } from "lucide-react";
import { Task } from "./NewProject/Tasks";

interface TaskInfoProps {
  projectTasks: Task[];
  startIndex: number;
  handlePopUpOpen: (x: Task) => void;
}

export const TaskInfo: React.FC<TaskInfoProps> = ({
  projectTasks,
  startIndex,
  handlePopUpOpen,
}) => {
  const handleChange = (x: Task) => {
    handlePopUpOpen(x);
  };
  let i: number;
  if (projectTasks.length <= 2) {
    i = 0;
  } else if (projectTasks.length - 1 === startIndex) {
    i = Math.max(0, startIndex - 2);
  } else if (projectTasks.length - 2 === startIndex) {
    i = Math.max(0, startIndex - 1);
  } else {
    i = startIndex;
  }

  return (
    <>
      {projectTasks.map(
        (task, index) =>
          i <= index &&
          index < i + 3 && (
            <React.Fragment key={index}>
              {/* Conditionally apply border based on task status */}
              <div
                key={index}
                className={`grid w-full max-w-full grid-cols-7 items-center justify-between gap-5 self-start rounded-2xl px-5 py-2.5 max-md:flex-wrap ${
                  task.status === "inprogress" ? " border-primary2 my-5 border-[1px] py-5" : ""
                }`}
              >
                <div className="col-span-2 my-auto self-stretch text-center text-xl font-bold">
                  {task.responsible}
                </div>
                <Icons status={task.status} task={task} />
                <div className="col-span-3 flex justify-between gap-5 self-stretch max-md:max-w-full max-md:flex-wrap">
                  <div className="flex flex-col">
                    <div className="text-left text-xl font-semibold">
                      {index + 1}. {task.title}
                    </div>
                    <div className="mt-4 flex gap-5 text-base max-md:mx-2.5">
                      <div className="flex flex-col items-start font-semibold">
                        <span className="font-bold">Tähtaeg:</span>
                        <span className="font-medium">
                          {task.deadline?.toLocaleDateString("et")}
                        </span>
                      </div>
                      {task.completed && (
                        <div className="flex flex-col items-start">
                          <span className="font-bold">Tehtud:</span>
                          <span className="text-primary2">
                            {task.completed?.toLocaleDateString("et")}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleChange(task)}
                  className="bg-primary2 my-auto justify-center self-stretch rounded-2xl px-5 py-2.5 text-center text-xl font-semibold"
                >
                  Muuda
                </button>
              </div>
              <Line Completed={task.completed} />
            </React.Fragment>
          ),
      )}
    </>
  );
};

const Icons = ({ status, task }: { status: string; task: Task }) => {
  const Icon =
    status === "completed"
      ? CircleCheck
      : (() => {
          {
            switch (task.type) {
              case "input":
                return Pencil;
              case "feedback":
                return MessageSquare;
              case "development":
                return Code;
              case "design":
                return Brush;
              default:
                return X;
            }
          }
        })();
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Icon className={`h-10 w-10 ${status !== "pending" ? "text-primary2" : "text-white"}`} />
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
