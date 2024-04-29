import React, { useState } from "react";
import { CircleUserRound } from "lucide-react";
interface ClientInfoProps {
  name: string;
  email: string;
}
export const ClientInfo = ({ clients }: { clients: ClientInfoProps[] }) => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };
  return (
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
        <Info key={i} name={client.name} email={client.email} />
      ))}
      {showForm && (
        <form className="text-center">
          <textarea
            placeholder="Nimi"
            className="bg-primary mt-4 h-12 w-full justify-center whitespace-nowrap rounded-2xl px-2.5 py-3 text-base text-opacity-50"
          />
          <textarea
            placeholder="E-mail"
            className="bg-primary mt-4 h-12 w-full justify-center  whitespace-nowrap rounded-2xl px-2.5 py-3 text-base text-opacity-50"
          />
          <div className="mt-4 flex gap-3 text-base text-opacity-50">
            <div className="bg-primary w-1/3 items-start justify-center rounded-2xl p-2.5 font-normal max-md:pr-5">
              Vali keel
            </div>
            <select className=" bg-primary w-2/3 rounded-2xl px-2 py-2.5 font-normal ">
              <option value="et">Eesti keel</option>
              <option value="en">English</option>
            </select>
          </div>
          <button className="border-primary2 mt-4 justify-center self-center whitespace-nowrap rounded-2xl border border-solid px-8 py-2.5 text-center font-extrabold max-md:px-5">
            Lisa
          </button>
        </form>
      )}
    </div>
  );
};
const Info: React.FC<ClientInfoProps> = ({ name, email }) => {
  return (
    <div className="border-primary mt-4 flex justify-start gap-5 rounded-2xl border border-solid p-2.5 text-center">
      <CircleUserRound className="aspect-square h-10 w-10 shrink self-center align-middle" />
      <div className="flex flex-col items-start">
        <div className="text-base font-normal">{name}</div>
        <div className="mt-1.5 text-base font-normal">{email}</div>
      </div>
    </div>
  );
};

export default ClientInfo;
