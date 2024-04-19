import React from 'react';

interface TaskinfoProps {
    Responsible: string;
    Name: string;
    Deadline: Date;
    Completed: Date;
}

export const TaskInfo = ({ tasks }: { tasks: TaskinfoProps[] }) => {
    return (
        <>
            {tasks.map((task, index) => (
                <div key={index} className="flex gap-5 justify-between items-center mt-14 self-start max-w-full max-md:flex-wrap py-2.5 px-5 rounded-2xl">
                    <div className="self-stretch my-auto text-xl font-bold text-center">
                        {task.Responsible}
                    </div>
                    <div className="flex gap-5 justify-between self-stretch max-md:flex-wrap max-md:max-w-full">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f8851abe4597b9d07f3d7a96e4b497c9c661a82f447c02eed8407712d8a87434?apiKey=cae8022f5fdb46b6994961e7252531bd&"
                            alt="placeholder"
                            className="shrink-0 my-auto aspect-square w-[60px]"
                        />
                        <div className="flex flex-col ">
                            <div className="text-xl font-semibold">
                            {index + 1}. {task.Name}
                            </div>
                            <div className="flex gap-5 mt-4 text-base max-md:mx-2.5">
                                <div className="font-semibold flex flex-col items-start">
                                    <span className="font-bold">Tähtaeg:</span>
                                    <span className="font-medium">{task.Deadline.toLocaleDateString()}</span>
                                </div>
                                <div className=" flex flex-col items-start">
                                    <span className="font-bold">Tehtud:</span>
                                    <span className="text-primary2">{task.Completed.toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="justify-center self-stretch px-5 py-2.5 my-auto text-xl font-semibold text-center whitespace-nowrap bg-primary2 rounded-2xl">
                        Muuda
                    </button>
                </div>
            ))}
        </>
    );
};