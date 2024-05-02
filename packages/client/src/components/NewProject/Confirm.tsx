import React from "react";

import { Loader2 } from "lucide-react";
import { $projectInput, $tab } from "./state";
import { client, useAPI } from "@wolf-project/backend/src/client";
import { I18nLocale } from "@wolf-project/i18n";
import { Button } from "../Buttons";

export const Confirm = ({ t }: { t: I18nLocale["form"] }) => {
  const { mutate, isLoading, error } = useAPI(client.projects.create.mutate);

  const handleSubmit = async () => {
    const res = await mutate($projectInput.get());
    window.location.href = `/project/${res.id}`;
  };
  return (
    <div className="flex items-center justify-center px-20 py-12 font-semibold max-md:px-5">
      <div className="border-primary2 flex w-1/3 max-w-md flex-col items-center gap-4 rounded-2xl border border-solid px-0 py-10 max-md:mt-10 max-md:px-5">
        <div className="text-center text-xl">
          {t.readyMessage.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </div>
        {error && (
          <div className="text-center text-xl">
            {t.error.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </div>
        )}
        <div className="mt-8 flex max-w-md flex-col flex-wrap justify-center gap-5 whitespace-nowrap text-base font-extrabold">
          <Button
            dark={false}
            onClick={handleSubmit}
            label={isLoading ? <Loader2 className="animate-spin" /> : t.generate}
          />
          <Button dark={true} onClick={() => $tab.set("tasks")} label={t.backward} />
        </div>
      </div>
    </div>
  );
};
