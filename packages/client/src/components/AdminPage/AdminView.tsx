import { I18nLocale } from "@wolf-project/i18n";
import { AdminUserList } from "./AdminUserList";
import { Button } from "../Buttons";
import { UserFormPopup } from "./AdminUserFormPopup";
import { useStore } from "@nanostores/react";
import { $employees, $userEditPopUp } from "../NewProject/state";
import _ from "lodash";
import { User } from "@wolf-project/db/schema";
import { useIsClientSide } from "../ProjectPage";

const { pick } = _;

export const AdminView = ({ t, employees }: { t: I18nLocale; employees: User[] }) => {
  const isClient = useIsClientSide();
  if (!isClient) return null;
  $employees.set(employees);
  return <AdminViewWrapper t={t} />;
};

const AdminViewWrapper = ({ t }: { t: I18nLocale }) => {
  const popupOpen = useStore($userEditPopUp);
  return (
    <div className="mx-auto mt-12 max-w-screen-xl justify-center">
      <div className="border-primary2 flex flex-col items-center justify-center gap-5 rounded-2xl border px-[115.5px] py-[40px]">
        <Button dark={true} label={t.newUser} onClick={() => $userEditPopUp.set({ type: "new" })} />
        <div className="scrollbar-thin scrollbar-track-black scrollbar-thumb-primary2 mx-auto flex h-[67vh] flex-col overflow-auto rounded-2xl p-5">
          <AdminUserList t={t} />
        </div>
        <div
          className={`fixed right-0 top-0 z-10 w-full transform shadow-lg transition-transform ${
            popupOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {popupOpen && <UserFormPopup t={pick(t, ["userForm", "language", "priviledge", "error"])} />}
        </div>
      </div>
    </div>
  );
};
