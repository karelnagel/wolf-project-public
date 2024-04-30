import React, { useState } from "react";
import { CircleUserRound, Trash } from "lucide-react";
import { Client } from "./NewProject";
import { Locale, useTranslations } from "@wolf-project/i18n";
import { SingleSelect } from "../SingleSelect";

interface ClientInfoProps {
  companyName: string;
  clients: Client[];
  leaveClientTab: () => void;
  returnProjectTab: () => void;
  updateCompanyName: (x: React.ChangeEvent<HTMLTextAreaElement>) => void;
  addClient: (x: Client) => void;
  removeClient: (x: Client) => void;
  locale: Locale;
}
export const ClientInfo: React.FC<ClientInfoProps> = ({
  companyName,
  clients,
  leaveClientTab,
  returnProjectTab,
  updateCompanyName,
  addClient,
  removeClient,
  locale,
}) => {
  const t = useTranslations(locale);

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState("et");

  const languageOptions = [
    { value: "et", label: t.language.et },
    { value: "en", label: t.language.en },
  ];

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEmail(e.target.value);
  };

  const handleLanguageChange = (x: string) => {
    setLanguage(x);
  };

  const handleAddClient = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newClient: Client = { name, email, language };
    addClient(newClient);
    setName("");
    setEmail("");
    setLanguage("et");
  };

  return (
    <div className="flex items-center justify-center px-20 py-12 font-semibold max-md:px-5">
      <div className="border-primary2 flex w-1/3 max-w-md flex-col items-center rounded-2xl border border-solid px-0 py-10 max-md:mt-10 max-md:px-5">
        <div className="text-center text-xl">Kliendi info:</div>
        <textarea
          value={companyName}
          onChange={updateCompanyName}
          placeholder="Ettevõtte nimi"
          className="bg-primary mt-8 h-12 w-2/3 resize-none justify-center rounded-2xl px-2.5 py-3 text-base text-opacity-50"
        ></textarea>
        <div className="mt-7 flex w-2/3 flex-col justify-center">
          <div className="flex justify-center">
            <div className="border-primary2 mt-4 flex w-full flex-col">
              <div className="flex">
                <span className="flex-grow">Ettevõtte esindaja</span>
                <button className=" ml-2 flex-grow-0 items-center text-xl" onClick={toggleForm}>
                  {showForm ? "-" : "+"}
                </button>
              </div>
            </div>
          </div>
          {clients.map((client, i) => (
            <Info
              key={i}
              name={client.name}
              email={client.email}
              language={client.language}
              removeClient={removeClient}
            />
          ))}
          {showForm && (
            <form onSubmit={handleAddClient} className="text-center">
              <textarea
                placeholder="Nimi"
                className="bg-primary mt-4 h-12 w-full resize-none justify-center whitespace-nowrap rounded-2xl px-2.5 py-3 text-base text-opacity-50"
                value={name}
                onChange={handleNameChange}
              />
              <textarea
                placeholder="E-mail"
                className="bg-primary mt-4 h-12 w-full resize-none justify-center  whitespace-nowrap rounded-2xl px-2.5 py-3 text-base text-opacity-50"
                value={email}
                onChange={handleEmailChange}
              />
              <div className="mt-4 flex gap-3 text-base text-opacity-50">
                <div className="bg-primary w-1/3 items-start justify-center rounded-2xl p-2.5 font-normal max-md:pr-5">
                  Vali keel
                </div>
                <SingleSelect
                  selectOptions={languageOptions}
                  selectedOption={language}
                  parentSetMethod={handleLanguageChange}
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
            onClick={returnProjectTab}
          >
            Tagasi
          </button>
          <button
            className="bg-primary2 justify-center rounded-2xl px-12 py-2.5 max-md:px-5"
            onClick={leaveClientTab}
          >
            Edasi
          </button>
        </div>
      </div>
    </div>
  );
};
const Info: React.FC<Client & { removeClient: ({ name, email, language }: Client) => void }> = ({
  name,
  email,
  language,
  removeClient,
}) => {
  const handleClick = () => {
    removeClient({ name, email, language });
  };
  return (
    <div className="border-primary mt-4 flex items-center gap-5 rounded-2xl border border-solid p-2.5 text-center">
      <CircleUserRound className="aspect-square h-10 w-10 shrink self-center align-middle" />
      <div className="flex flex-1 flex-col items-start">
        <div className="text-base font-normal">{name}</div>
        <div className="mt-1.5 text-base font-normal">{email}</div>
      </div>
      <button className="ml-auto" onClick={handleClick}>
        <Trash />
      </button>
    </div>
  );
};

export default ClientInfo;
