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
  stretch,
}: {
  type?: "button" | "submit" | "reset";
  onClick?: (() => void) | ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
  label: ReactNode;
  dark?: boolean;
  disabled?: boolean;
  href?: string;
  stretch?: boolean;
}) => {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        className={`button border-primary2 flex items-center justify-center self-stretch text-wrap rounded-2xl border py-2.5 max-md:px-5 ${dark ? "dark:bg-inherit" : ""} ${stretch ? "" : "w-[104px]"} ${disabled ? "bg-black" : "bg-primary2 hover:bg-primary"}`}
        disabled={disabled}
      >
        <a className="flex h-full w-full items-center justify-center" href={href}>
          {label}
        </a>
      </button>
    </>
  );
};
