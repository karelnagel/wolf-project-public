import { navigate } from "astro/virtual-modules/transitions-router.js";

export const Header = ({ allowRenderC }: { allowRenderC: boolean }) => {
  const logout = "Logi välja"; // Assuming this is where you get the logout string from

  const onClickLogout = () => {
    navigate("/logout");
  };

  const onClickRenderC = () => {
    // Handle rendering C
  };

  return (
    <header className="justify-betwee flex items-center p-4">
      {allowRenderC && (
        <div>
          <button
            onClick={onClickRenderC}
            className="bg-primary mr-4 rounded-md px-4 py-2 text-white"
          >
            C
          </button>
        </div>
      )}

      <div className="flex flex-grow items-center justify-center">
        <h1 className="text-xl font-bold">B</h1>
      </div>

      <div>
        <button
          onClick={onClickLogout}
          className="border-primary2 bg-primary hover:bg-primary2 justify-center rounded-2xl border border-solid px-4 py-3.5 text-center font-extrabold"
        >
          {logout}
        </button>
      </div>
    </header>
  );
};
