interface ConfirmProps {
  returnTasks: () => void;
  confirmCreation: () => void;
}

export const Confirm: React.FC<ConfirmProps> = ({ returnTasks, confirmCreation }) => {
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
            onClick={confirmCreation}
          >
            {"Kinnita ning genereeri"}
          </button>
          <button
            className="border-primary justify-center rounded-2xl border-[3px] border-solid px-12 py-2.5 max-md:px-5"
            onClick={returnTasks}
          >
            {"Tagasi"}
          </button>
        </div>
      </div>
    </div>
  );
};
