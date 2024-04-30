import { navigate } from "astro/virtual-modules/transitions-router.js";

export const NewProjectButton = ({ newproject }: { newproject: string }) => {
  const onClick = () => {
    navigate("/newproject");
  };
  return (
    <button
      onClick={onClick}
      className="border-primary2 hover:bg-primary justify-center rounded-2xl border border-solid px-4 py-3.5 text-center font-extrabold"
    >
      {newproject}
    </button>
  );
};
