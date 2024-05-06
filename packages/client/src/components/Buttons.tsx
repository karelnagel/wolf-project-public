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
  href,
}: {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  label: ReactNode;
  dark?: boolean;
  disabled?: boolean;
  href?: string;
}) => {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        className={`button bg-primary2 hover:bg-primary border-primary2 flex w-[104px] items-center justify-center text-wrap rounded-2xl border py-2.5 max-md:px-5 ${dark ? "dark:bg-inherit" : ""}`}
        disabled={disabled}
      >
        <a href={href}>{label}</a>
      </button>
    </>
  );
};
