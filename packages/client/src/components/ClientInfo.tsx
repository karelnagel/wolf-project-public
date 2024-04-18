import React, { useState } from "react";

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
      {clients.map((client) => (
        <Info name={client.name} email={client.email} />
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
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/7d52b398000480c12ec2c2f943526d5768dfe93340e227df8f0c82fc7ead23cc?apiKey=cae8022f5fdb46b6994961e7252531bd&"
        className="aspect-square w-[50px] shrink"
      />
      <div className="flex flex-col items-start">
        <div className="text-base font-normal">{name}</div>
        <div className="mt-1.5 text-base font-normal">{email}</div>
      </div>
    </div>
  );
};

export default ClientInfo;
