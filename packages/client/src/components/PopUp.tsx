import React, { useState } from "react";
import Datepicker, { DateType, DateValueType } from "react-tailwindcss-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ArrowLeft, Paperclip } from "lucide-react";

export default function PopUp() {
  const [deadline, setDeadline] = useState<DateType>();
  const handleValueChange = (newValue: DateValueType) => {
    setDeadline(newValue?.startDate);
  };

  return (
    <div
      className="bg-primary flex w-full flex-col justify-center rounded-2xl px-12 py-10 max-md:px-5"
      style={{ overflowY: "auto", maxHeight: "100%" }}
    >
      <div className="justify- mb-16 mt-14 flex items-center gap-5 text-center text-2xl font-bold max-md:mt-10 max-md:max-w-full max-md:flex-wrap">
        <button>
          <ArrowLeft className="text-primary2 aspect-square h-9 w-9  shrink-0" />
        </button>
        <div className="flex-grow">Uue taski loomine</div>
      </div>
      <div className="mt-17 flex flex-col  max-md:mt-10 max-md:max-w-full">
        <div className="flex items-center justify-between">
          <div className="text-start text-base font-bold">
            Tööetapp
            <select className="mt-4 w-full rounded-2xl bg-white px-2 py-1.5 font-semibold text-black">
              <option>Sisend</option>
              <option>Disain</option>
              <option>Arendus</option>
              <option>Tagasiside</option>
            </select>
          </div>
          <div>
            <div className="text-start text-base font-bold">
              Staatus
              <select className="mt-4 w-full rounded-2xl bg-white px-2 py-1.5 font-semibold text-black">
                <option>Ootel</option>
                <option>Töös</option>
                <option>Tehtud</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mt-3.5 flex flex-col justify-center max-md:max-w-full">
          <div className="flex flex-col max-md:max-w-full">
            <div className="text-start text-base font-bold">Taski nimi</div>
            <div className="relative mt-4 flex flex-col justify-center text-base max-md:max-w-full">
              <textarea className="h-12 rounded-2xl bg-white text-black max-md:max-w-full" />
            </div>
          </div>
          <div className="mt-8 flex justify-center gap-5">
            <div className="w-full text-start text-base font-bold">
              Vastutaja
              <select className="text-primary mt-4 h-1/2 w-full rounded-2xl bg-white px-2 py-1.5 font-semibold ">
                <option>Veebihunt</option>
                <option>Klient</option>
              </select>
            </div>
            <div className="flex w-full flex-col ">
              <div className="mb-4 text-start text-base font-bold">Tähtaeg</div>
              <div className="">
                <Datepicker
                  inputClassName={"bg-white h-1/2 w-full "}
                  placeholder={"Vali tähtaeg!"}
                  useRange={false}
                  asSingle={true}
                  value={{ startDate: deadline || null, endDate: deadline || null }}
                  onChange={handleValueChange}
                />
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col max-md:max-w-full">
            <div className="flex flex-grow text-start text-base font-bold text-white max-md:max-w-full">
              Taski kirjeldus
              <Paperclip className="text-primary2 ml-2 aspect-square w-5 max-md:mt-10" />
            </div>
            <div className="mt-4 flex flex-col justify-center text-base max-md:max-w-full">
              <textarea className="rounded-2xl bg-white text-black max-md:max-w-full" />
            </div>
          </div>
        </div>
        <div className="mt-16 flex gap-5 self-center text-base font-extrabold max-md:mt-10">
          <button className="bg-primary justify-center rounded-2xl border-2 border-solid border-black px-9 py-4 max-md:px-5">
            Kustuta
          </button>
          <button className="bg-primary2 rounded-2xl px-9 py-4">Salvesta</button>
        </div>
      </div>
    </div>
  );
}
