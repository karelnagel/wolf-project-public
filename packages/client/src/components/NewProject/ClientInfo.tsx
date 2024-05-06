import React, { useState } from "react";
import { CircleUserRound, Trash } from "lucide-react";
import { $projectInput, $tab } from "./state";
import { Locale, useTranslations } from "@wolf-project/i18n";
import { SingleSelect } from "../SingleSelect";
import { CreateProjectInput } from "@wolf-project/backend/src/routes/projects";
import { useStore } from "@nanostores/react";

type Client = CreateProjectInput["clients"][0];
const defaultClient: Client = { name: "", email: "", language: "et" };

export const ClientInfo = () => {
  const input = useStore($projectInput);
  const t = useTranslations("et");

  const [showForm, setShowForm] = useState(false);
  const [client, setClient] = useState(defaultClient);

  const handleAddClient = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    $projectInput.setKey("clients", [...input.clients, client]);
    setClient(defaultClient);
  };

  return (
    <div className="flex items-center justify-center px-20 py-12 font-semibold max-md:px-5">
      <div className="border-primary2 flex w-1/3 max-w-md flex-col items-center rounded-2xl border border-solid px-0 py-10 max-md:mt-10 max-md:px-5">
        <div className="text-center text-xl">Kliendi info:</div>
        <textarea
          value={input.companyName}
          onChange={(e) => $projectInput.setKey("companyName", e.target.value)}
          placeholder={t.placeholder.companyName}
          className="bg-primary mt-8 h-12 w-2/3 resize-none justify-center rounded-2xl px-2.5 py-3 text-base text-opacity-50"
        ></textarea>
        <div className="mt-7 flex w-2/3 flex-col justify-center">
          <div className="flex justify-center">
            <div className="border-primary2 mt-4 flex w-full flex-col">
              <div className="flex">
                <span className="flex-grow">Ettevõtte esindaja</span>
                <button
                  className=" ml-2 flex-grow-0 items-center text-xl"
                  onClick={() => setShowForm(!showForm)}
                >
                  {showForm ? "-" : "+"}
                </button>
              </div>
            </div>
          </div>
          {input.clients.map((client, i) => (
            <Info
              key={i}
              name={client.name}
              email={client.email}
              removeClient={() =>
                $projectInput.setKey(
                  "clients",
                  input.clients.filter((c) => c !== client),
                )
              }
            />
          ))}
          {showForm && (
            <form onSubmit={handleAddClient} className="text-center">
              <textarea
                placeholder={t.placeholder.name}
                className="bg-primary mt-4 h-12 w-full resize-none justify-center whitespace-nowrap rounded-2xl px-2.5 py-3 text-base text-opacity-50"
                value={client.name}
                onChange={(e) => setClient({ ...client, name: e.target.value })}
              />
              <textarea
                placeholder={t.placeholder.email}
                className="bg-primary mt-4 h-12 w-full resize-none justify-center  whitespace-nowrap rounded-2xl px-2.5 py-3 text-base text-opacity-50"
                value={client.email}
                onChange={(e) => setClient({ ...client, email: e.target.value })}
              />
              <div className="mt-4 flex gap-3 text-base text-opacity-50">
                <div className="bg-primary w-1/3 items-start justify-center rounded-2xl p-2.5 font-normal max-md:pr-5">
                  Vali keel
                </div>
                <SingleSelect
                  selectOptions={Locale.options.map((value) => ({
                    value,
                    label: t.language[value],
                  }))}
                  selectedOption={client.language}
                  onChange={(x) => setClient({ ...client, language: x as Locale })}
                  dark={true}
                />
              </div>
              <button
                type="submit"
                className="border-primary2 mt-4 justify-center self-center whitespace-nowrap rounded-2xl border border-solid px-8 py-2.5 text-center font-extrabold max-md:px-5"
              >
                Lisa
              </button>
            </form>
          )}
        </div>
        <div className="mt-8 flex max-w-md flex-wrap justify-center gap-5 whitespace-nowrap text-base font-extrabold">
          <button
            className="border-primary justify-center rounded-2xl border-[3px] border-solid px-12 py-2.5 max-md:px-5"
            onClick={() => $tab.set("project")}
          >
            Tagasi
          </button>
          <button
            className="bg-primary2 justify-center rounded-2xl px-12 py-2.5 max-md:px-5"
            onClick={() => $tab.set("tasks")}
          >
            Edasi
          </button>
        </div>
      </div>
    </div>
  );
};

const Info: React.FC<{ name: string; email: string; removeClient: () => void }> = ({
  name,
  email,
  removeClient,
}) => {
  return (
    <div className="border-primary mt-4 flex items-center gap-5 rounded-2xl border border-solid p-2.5 text-center">
      <CircleUserRound className="aspect-square h-10 w-10 shrink self-center align-middle" />
      <div className="flex flex-1 flex-col items-start">
        <div className="text-base font-normal">{name}</div>
        <div className="mt-1.5 text-base font-normal">{email}</div>
      </div>
      <button className="ml-auto" onClick={removeClient}>
        <Trash />
      </button>
    </div>
  );
};

export default ClientInfo;
