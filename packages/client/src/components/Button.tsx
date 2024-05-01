import { ReactNode } from "react";
export const Button = ({ href, children }: { children: ReactNode; href: string }) => {
  return (
    <a
      href={href}
      className="border-primary2 bg-primary hover:bg-primary2 justify-center rounded-2xl border border-solid px-4 py-3.5 text-center font-extrabold"
    >
      {children}
    </a>
  );
};
