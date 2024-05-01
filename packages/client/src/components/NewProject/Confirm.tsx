import { Loader2 } from "lucide-react";
import { $projectInput, $tab } from "./state";
import { client, useAPI } from "@wolf-project/backend/src/client";

export const Confirm = () => {
  const { mutate, isLoading } = useAPI(client.projects.create.mutate);

  const handleSubmit = async () => {
    const res = await mutate($projectInput.get());
    window.location.href = `/project/${res.id}`;
  };
  return (
    <div className="flex items-center justify-center px-20 py-12 font-semibold max-md:px-5">
      <div className="border-primary2 flex w-1/3 max-w-md flex-col items-center rounded-2xl border border-solid px-0 py-10 max-md:mt-10 max-md:px-5">
        <div className="text-center text-xl">{"Valmis?"}</div>
        <div className="text-center text-xl">
          {"Genereeri uus projekt ning saada info kliendile"}
        </div>
        <div className="mt-8 flex max-w-md flex-col flex-wrap justify-center gap-5 whitespace-nowrap text-base font-extrabold">
          <button
            className="bg-primary2 justify-center rounded-2xl px-12 py-2.5 max-md:px-5"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
                <Loader2 className="animate-spin" />
              </div>
            ) : (
              "Kinnita ning genereeri"
            )}
          </button>
          <button
            className="border-primary justify-center rounded-2xl border-[3px] border-solid px-12 py-2.5 max-md:px-5"
            onClick={() => $tab.set("tasks")}
          >
            {"Tagasi"}
          </button>
        </div>
      </div>
    </div>
  );
};
