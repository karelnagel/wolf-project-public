import { useState } from "react";
import { client, useAPI } from "../trpc/client";

export const CreateProject = () => {
  const [projectName, setProjectName] = useState("");
  const { mutate, data, error, isLoading } = useAPI(client.projects.create.mutate);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await mutate({ projectName });

    window.location.href = `/project/${result.projectId}/clients`;
  };
  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center rounded-2xl max-md:px-5 ">
      <div className="gap-  border-primary2 mt-28 flex w-[643px] max-w-full flex-col  justify-center rounded-2xl border px-8 py-10 max-md:mt-10 max-md:px-5">
        <div className="self-center text-xl font-semibold">Uus projekt</div>
        <div className="mt-12 font-semibold max-md:mt-10 max-md:max-w-full">Projekti nimi</div>
        <input
          value={projectName}
          onChange={(e) => setProjectName(e.currentTarget.value)}
          className=" bg-primary focus:outline-primary2 mt-4  rounded-2xl focus:outline max-md:max-w-full"
        />
        <div className="mt-8 font-semibold max-md:max-w-full">Projekti kirjeldus</div>
        <textarea className="bg-primary mt-4 h-[145px] rounded-2xl max-md:max-w-full" />
        <div className="mt-8 flex justify-center gap-8 max-md:flex-wrap">
          <div className="flex w-full flex-col text-base">
            <div className="font-semibold">Vali projekti põhi</div>
            <input className=" bg-primary mt-4 rounded-2xl" />
          </div>
          <div className="flex w-full flex-col text-base">
            <div className="font-semibold">Seotud inimesed</div>
            <div className="relative mt-4">
              <input className=" bg-primary rounded-2xl pr-10" />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/86c8286cb6dbc6b10b19642f4c2d296de32352ba06add1cb72648172cba5f90e?"
                className="absolute right-0 top-0 mr-2 mt-3 h-6 w-6 cursor-pointer"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="button bg-primary2 mt-12 justify-center self-center rounded-2xl px-8 py-3 text-base max-md:mt-10 max-md:px-5"
          disabled={isLoading}
        >
          {isLoading ? "Loading" : "Edasi"}
        </button>
      </div>

      {error && <div>{error.message}</div>}
      {data && (
        <div className="gap-2">
          {data.projectId} {data.projectName}
        </div>
      )}
    </form>
  );
};
