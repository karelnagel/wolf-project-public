import { navigate } from "astro/virtual-modules/transitions-router.js";
import { LogOutIcon } from "lucide-react";

export const LogoutButton = () => {
  const onClick = () => {
    navigate('/logout')
  };
  return (
    <>
      <button onClick={onClick} className="text-primary">
        <LogOutIcon />
      </button>
    </>
  );
};
