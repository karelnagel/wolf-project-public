import React, { useState } from "react";
import { CircleUserRound, Trash } from "lucide-react";
import { $projectInput, $tab } from "./state";
import { SingleSelect } from "../SingleSelect";
import { CreateProjectInput } from "@wolf-project/backend/src/routes/projects";
import { useStore } from "@nanostores/react";
import { I18nLocale, Locale } from "@wolf-project/i18n";
import { Button } from "../Buttons";
import { User } from "@wolf-project/db/schema";
import { client } from "@wolf-project/backend/src/client";

type Client = CreateProjectInput["clients"][0];
const defaultClient: Client = { name: "", email: "", language: "et" };
type Translations = {
  form: I18nLocale["form"];
  placeholder: I18nLocale["placeholder"];
  language: I18nLocale["language"];
};
export const ClientInfoEdit = ({
  t,
  ...props
}: {
  t: Translations;
  companyName: string;
  clients: User[];
  projectId: string;
}) => {
  const [companyName, setCompanyName] = useState(props.companyName);
  const [clients, setClients] = useState(props.clients);

  return (
    <ClientInfo
      t={t}
      companyName={companyName}
      setCompanyName={setCompanyName}
      clients={clients}
      back={() => window.history.back()}
      save={() => console.log("Todo save!")}
      addClient={(c) => client.clients.add.mutate({client: c, projectId: props.projectId}).then(c => setClients([...clients, c]))}
      deleteClient={(index) =>
        client.clients.delete
          .mutate({ id: clients[index]!.id, projectId: props.projectId })
          .then(({id}) => setClients(clients.filter(c => c.id !== id)))
      }
    ></ClientInfo>
  );
};
export const ClientInfoCreate = ({ t }: { t: Translations }) => {
  const input = useStore($projectInput);

  return (
    <ClientInfo
      t={t}
      companyName={input.companyName}
      setCompanyName={(n) => $projectInput.setKey("companyName", n)}
      clients={input.clients}
      addClient={(c) => $projectInput.setKey("clients", [...input.clients, c])}
      deleteClient={(index) =>
        $projectInput.setKey(
          "clients",
          input.clients.filter((_, i) => i !== index),
        )
      }
    ></ClientInfo>
  );
};
export const ClientInfo = ({
  t,
  ...props
}: {
  t: Translations;
  companyName: string;
  setCompanyName: (n: string) => void;
  clients: Client[];
  addClient: (c: Client) => void;
  back: () => void;
  save: () => void;
  deleteClient: (i: number) => void;
}) => {
  const [showForm, setShowForm] = useState(false);
  const [client, setClient] = useState(defaultClient);

  return (
    <div className="flex items-center justify-center px-20 py-12 font-semibold max-md:px-5">
      <div className="border-primary2 flex w-1/3 max-w-md flex-col items-center rounded-2xl border border-solid px-0 py-10 max-md:mt-10 max-md:px-5">
        <div className="text-center text-xl">{t.form.clientInfo}</div>
        <textarea
          value={props.companyName}
          onChange={(e) => props.setCompanyName(e.target.value)}
          placeholder={t.placeholder.companyName}
          className="bg-primary mt-8 h-12 w-2/3 resize-none justify-center rounded-2xl px-2.5 py-3 text-base text-opacity-50"
        ></textarea>
        <div className="mt-7 flex w-2/3 flex-col justify-center">
          <div className="flex justify-center">
            <div className="border-primary2 mt-4 flex w-full flex-col">
              <div className="flex">
                <span className="flex-grow">{t.form.clientRep}</span>
                <button
                  className=" ml-2 flex-grow-0 items-center text-xl"
                  onClick={() => setShowForm(!showForm)}
                >
                  {showForm ? "-" : "+"}
                </button>
              </div>
            </div>
          </div>
          {props.clients.map((client, i) => (
            <Info
              key={i}
              name={client.name}
              email={client.email}
              removeClient={() => props.deleteClient(i)}
            />
          ))}
          {showForm && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                props.addClient(client);
                setClient(defaultClient)
              }}
              className="flex flex-col items-center justify-center text-center"
            >
              <textarea
                placeholder={t.placeholder.name}
                className="bg-primary mt-4 h-12 w-full resize-none justify-center whitespace-nowrap rounded-2xl px-2.5 py-3 text-base text-opacity-50"
                value={client.name}
                required
                onChange={(e) => setClient({ ...client, name: e.target.value })}
              />
              <textarea
                placeholder={t.placeholder.email}
                className="bg-primary mt-4 h-12 w-full resize-none justify-center  whitespace-nowrap rounded-2xl px-2.5 py-3 text-base text-opacity-50"
                value={client.email}
                required
                onChange={(e) => setClient({ ...client, email: e.target.value })}
              />
              <div className="mb-4 mt-4 flex w-full gap-3 text-base text-opacity-50">
                <div className="bg-primary w-1/3 items-start justify-center rounded-2xl p-2.5 font-normal max-md:pr-5">
                  {t.form.chooseLang}
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
              <Button dark={true} label={t.form.add} type={"submit"} />
            </form>
          )}
        </div>
        <div className="mt-8 flex max-w-md flex-wrap justify-center gap-5 whitespace-nowrap text-base font-extrabold">
          <Button onClick={props.back} dark={true} label={t.form.backward} />
          <Button onClick={props.save} label={t.form.forward} />
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
      <CircleUserRound className="aspect-square h-10 w-10 shrink-0 self-center align-middle" />
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
