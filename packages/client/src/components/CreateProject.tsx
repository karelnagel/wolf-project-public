import { useState } from "react";
import { client, useAPI } from "../trpc/client";

export const CreateProject = () => {
  const [projectName, setProjectName] = useState("");
  const { mutate, data, error, isLoading } = useAPI(client.projects.create.mutate);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await mutate({ projectName });

  window.location.href=`/project/${result.projectId}/clients`;
  };
  return (
    <form onSubmit={onSubmit} className="flex flex-col rounded-2xl items-center max-md:px-5 ">
      <div className="flex  gap- flex-col justify-center px-8 py-10 mt-28  max-w-full rounded-2xl border border-primary2 w-[643px] max-md:px-5 max-md:mt-10">
        <div className="self-center text-xl font-semibold">
          Uus projekt
        </div>
        <div className="mt-12 font-semibold max-md:mt-10 max-md:max-w-full">
          Projekti nimi
        </div>
        <input className=" mt-4 rounded-2xl bg-primary  max-md:max-w-full focus:outline-primary2 focus:outline" />
        <div className="mt-8 font-semibold max-md:max-w-full">
          Projekti kirjeldus
        </div>
        <textarea className="mt-4 rounded-2xl bg-primary h-[145px] max-md:max-w-full"/>
        <div className="flex justify-center gap-8 mt-8 max-md:flex-wrap">
          <div className="flex flex-col text-base w-full">
            <div className="font-semibold">Vali projekti põhi</div>
            <input className=" mt-4 rounded-2xl bg-primary"/>
          </div>
          <div className="flex flex-col text-base w-full">
            <div className="font-semibold">Seotud inimesed</div>
              <div className="relative mt-4">
                <input className=" rounded-2xl bg-primary pr-10" />
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/86c8286cb6dbc6b10b19642f4c2d296de32352ba06add1cb72648172cba5f90e?"
                  className="absolute top-0 right-0 w-6 h-6 mt-3 mr-2 cursor-pointer"
                />
              </div>
          </div>
        </div>
        <button type="submit" className="button px-8 justify-center self-center py-3 mt-12 text-base bg-primary2 rounded-2xl max-md:px-5 max-md:mt-10" disabled={isLoading}>
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
