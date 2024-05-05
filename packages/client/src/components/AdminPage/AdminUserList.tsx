import { CircleUserRound } from "lucide-react";
import React from "react";
import { Button } from "../Buttons";
import { I18nLocale } from "@wolf-project/i18n";
import { $employees, $userEditPopUp } from "../NewProject/state";
import { User } from "@wolf-project/db/schema";
import { useStore } from "@nanostores/react";

export const AdminUserList = ({ t }: { t: I18nLocale }) => {
  const employees = useStore($employees);
  return (
    <>
      {employees?.map((employee, i) => (
        <EmployeeInfo key={i} user={employee} label={t.form.change} />
      ))}
    </>
  );
};

const EmployeeInfo: React.FC<{ user: User; label: string }> = ({ user, label }) => {
  return (
    <div className="border-primary mt-4 flex items-center gap-5 rounded-2xl border border-solid p-2.5 text-center">
      <CircleUserRound className="text-primary2 aspect-square h-10 w-10 shrink self-center align-middle" />
      <div className="flex flex-1 flex-col items-start">
        <div className="text-base font-semibold">{user.name}</div>
        <div className="mt-1.5 text-base font-semibold">{user.email}</div>
        <div className="mt-1.5 text-base font-semibold">{user.role}</div>
      </div>
      <Button label={label} onClick={() => $userEditPopUp.set({ type: "edit", id: user.id })} />
    </div>
  );
};
