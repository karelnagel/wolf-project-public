import React, {useState} from "react";
import Datepicker, { DateType, DateValueType } from "react-tailwindcss-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function PopUp() {
    const [deadline, setDeadline] = useState<DateType>();
    const handleValueChange = (newValue: DateValueType) => {
        setDeadline(newValue?.startDate);
      };
  return (
    <div className="flex flex-col justify-center px-12 py-10 rounded-2xl bg-primary max-w-[648px] max-md:px-5">
      <div className="flex mb-16 items-center gap-5 justify- mt-14 text-2xl font-bold text-center max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d648f395ba1423609cfb486bec0cf488e1dff49fe972911a868e241924edf9e4?apiKey=cae8022f5fdb46b6994961e7252531bd&"
          className="shrink-0 aspect-square w-[40px]"
        />
        <div className="flex-grow">Uue taski loomine</div>
      </div>
      <div className="flex flex-col mt-17 max-md:mt-10 max-md:max-w-full">
        <div className="flex flex-col justify-center self-end max-w-full w-[131px]">
          <div className="flex flex-col">
            <div className="text-base font-bold text-start">
              Staatus
            <select className="w-full bg-white text-black rounded-2xl mt-4 px-2 py-1.5 font-semibold ">
                <option>Ootel</option>
                <option>Töös</option>
                <option>Tehtud</option>
            </select>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center mt-3.5 max-md:max-w-full">
            <div className="flex flex-col max-md:max-w-full">
                <div className="text-base font-bold text-start">
                    Taski nimi
                </div>
                <div className="flex text-base flex-col justify-center mt-4 max-md:max-w-full relative">
                    <textarea className="h-12 bg-white text-black rounded-2xl max-md:max-w-full" />
                </div>
            </div>
          <div className="flex gap-5 mt-8 justify-center">
            <div className="text-base w-full font-bold text-start">
                Vastutaja
                <select className="text-primary w-full h-1/2 bg-white rounded-2xl mt-4 px-2 py-1.5 font-semibold ">
                    <option>Veebihunt</option>
                    <option>Klient</option>
                </select>
            </div>
            <div className="flex flex-col w-full ">
                <div className="text-base font-bold text-start">
                    Tähtaeg
                </div>
                <div >
                <Datepicker
                    placeholder={"Vali tähtaeg!"}
                    useRange={false}
                    asSingle={true}
                    value={{ startDate: deadline || null, endDate: deadline || null }}
                    onChange={handleValueChange}
                />      
                </div>
            </div>
          </div>
          <div className="flex flex-col mt-8 max-md:max-w-full">
            <div className="text-base flex-grow flex font-bold text-start text-white max-md:max-w-full">
              Taski kirjeldus
              <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/7dfe909abb9e34b9e69eb30e1a23d6d60a6484af3fb8cd00922b10438f4fce71?apiKey=cae8022f5fdb46b6994961e7252531bd&"
                    className="w-6 aspect-square max-md:mt-10"
                    />
            </div>
            <div className="flex text-base flex-col justify-center mt-4 max-md:max-w-full">
              <textarea className="bg-white text-black rounded-2xl max-md:max-w-full" />
            </div>
        </div>
      </div>
      <div className="flex gap-5 self-center mt-16 text-base font-extrabold max-md:mt-10">
        <button className="justify-center px-9 py-4 rounded-2xl border-2 border-black border-solid bg-primary max-md:px-5">
          Kustuta
        </button>
        <button className="bg-primary2 rounded-2xl py-4 px-9">
            Salvesta
        </button>
      </div>
    </div>
    </div>
  );
}

