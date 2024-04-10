import React, { useState } from "react";
import { client, useAPI } from "../trpc/client";
import Datepicker, { DateType, DateValueType } from "react-tailwindcss-datepicker";

interface addTaskProps {
  projectRef: string;
}

export const AddTask: React.FC<addTaskProps> = ({ projectRef }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState<DateType>();
  const [status, setStatus] = useState("toDo");
  const { mutate, error, isLoading } = useAPI(client.tasks.create.mutate);

  const handleValueChange = (newValue: DateValueType) => {
    setDeadline(newValue?.startDate);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const baseMutationParams: {
      projectRef: string;
      status: string;
      description: string;
      title: string;
      deadline: Date | null;
    } = {
      projectRef: projectRef,
      status: status,
      description: description,
      title: title,
      deadline: null,
    };
    if (deadline instanceof Date) {
      baseMutationParams.deadline = deadline;
    }
    const result = await mutate(baseMutationParams);
    console.log(result);
  };

  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-col items-center gap-2">
        <input
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Datepicker
          placeholder={"Vali tähtaeg!"}
          useRange={false}
          asSingle={true}
          value={{ startDate: deadline || null, endDate: deadline || null }}
          onChange={handleValueChange}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="toDo">Tegemata</option>
          <option value="progress">Tegemisel</option>
          <option value="review">Tagasisidestamisel</option>
          <option value="done">Tehtud</option>
        </select>
        {error && <div>{error.message}</div>}

        <button type="submit" className="button" disabled={isLoading}>
          {isLoading ? "Loading" : "Submit"}
        </button>
      </form>
    </>
  );
};
