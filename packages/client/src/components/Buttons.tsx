import { ReactNode } from "react";

export const NavButton = ({ href, label }: { label: string; href: string }) => {
  return (
    <a
      href={href}
      className="button border-primary2 hover:bg-primary justify-center rounded-2xl border border-solid bg-inherit px-4 py-3.5 text-center font-extrabold"
    >
      {label}
    </a>
  );
};

export const Button = ({
  onClick,
  label,
  dark,
  type,
  disabled,
}: {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  label: ReactNode;
  dark?: boolean;
  disabled?: boolean;
}) => {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        className={`button flex items-center bg-primary2 hover:bg-primary border-primary2 justify-center rounded-2xl border text-wrap py-2.5 w-[104px] max-md:px-5 ${dark ? "dark:bg-inherit" : ""}`}
        disabled={disabled}
      >
        {label}
      </button>
    </>
  );
};
