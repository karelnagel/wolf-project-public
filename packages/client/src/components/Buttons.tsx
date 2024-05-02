import { ReactNode } from "react";

export const NavButton = ({ href, label }: { label: string; href: string }) => {
  return (
    <a
      href={href}
      className="border-primary2 hover:bg-primary justify-center rounded-2xl border border-solid bg-inherit px-4 py-3.5 text-center font-extrabold"
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
  dark: boolean;
  disabled?: boolean;
}) => {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        className={`bg-primary2 hover:bg-primary border-primary2 justify-center rounded-2xl border px-12 py-2.5 max-md:px-5 ${dark ? "dark:border-solid dark:bg-inherit" : ""}`}
        disabled={disabled}
      >
        {label}
      </button>
    </>
  );
};
