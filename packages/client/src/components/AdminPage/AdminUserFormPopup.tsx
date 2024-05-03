import { ArrowLeft, Loader2 } from "lucide-react";
import { $selectedEmployee, $userEditPopUp } from "../NewProject/state";
import { useStore } from "@nanostores/react";
import { I18nLocale, Locale } from "@wolf-project/i18n";
import { SingleSelect } from "../SingleSelect";
import { UserRole } from "@wolf-project/db/schema";
import { Button } from "../Buttons";
import { addEmployee, modifyEmployee, removeEmployee } from "./AdminMutates";
export const UserFormPopup = ({
  t,
}: {
  t: {
    userForm: I18nLocale["userForm"];
    language: I18nLocale["language"];
    priviledge: I18nLocale["priviledge"];
  };
}) => {
  const popup = useStore($userEditPopUp);
  const userInfo = useStore($selectedEmployee);

  const { addUser, isLoading: adding } = addEmployee();
  const { removeUser, isLoading: removing } = removeEmployee();
  const { modifyUser, isLoading: modifying } = modifyEmployee();

  const handleSave = async () => {
    if (popup?.type === "edit") await modifyUser(popup.id, userInfo);
    else {
      await addUser(userInfo);
    }
    $userEditPopUp.set(null);
  };

  const handleDelete = async () => {
    if (popup?.type === "edit") await removeUser(popup.id);
    $userEditPopUp.set(null);
  };

  return (
    <div className="flex w-full">
      <div
        className="h-screen w-full bg-black opacity-50"
        onClick={() => $userEditPopUp.set(null)}
      ></div>
      <div
        className="bg-primary items-right flex w-3/5 flex-col justify-center gap-5 rounded-2xl max-md:px-5"
        style={{ overflowY: "auto", maxHeight: "100vh" }}
      >
        <div className="mx-[25px] mb-16 mt-14 flex items-center text-center text-2xl font-bold max-md:mt-10 max-md:max-w-full max-md:flex-wrap">
          <button onClick={() => $userEditPopUp.set(null)}>
            <ArrowLeft className="text-primary2 aspect-square h-9 w-9  shrink-0" />
          </button>
          <div className="flex-grow">
            {popup?.type === "edit" ? t.userForm.editUser : t.userForm.newUser}
          </div>
        </div>
        <div className="mx-[62px] flex flex-col max-md:max-w-full">
          <div className="text-start text-base font-bold">{t.userForm.name}</div>
          <div className="relative mt-4 flex flex-col justify-center text-base max-md:max-w-full">
            <textarea
              value={userInfo.name}
              onChange={(e) => $selectedEmployee.setKey("name", e.currentTarget.value)}
              className="h-12 rounded-2xl bg-white text-black max-md:max-w-full"
            />
          </div>
        </div>
        <div className="mx-[62px] flex flex-col max-md:max-w-full">
          <div className="text-start text-base font-bold">{t.userForm.email}</div>
          <div className="relative mt-4 flex flex-col justify-center text-base max-md:max-w-full">
            <textarea
              value={userInfo.email}
              onChange={(e) => $selectedEmployee.setKey("email", e.currentTarget.value)}
              className="h-12 rounded-2xl bg-white text-black max-md:max-w-full"
            />
          </div>
        </div>
        <div className="mx-[62px] flex flex-row justify-between">
          <div className="flex flex-col">
            <div className="text-start text-base font-bold">{t.userForm.language}</div>
            <SingleSelect
              selectOptions={[
                { value: "et", label: t.language.et },
                { value: "en", label: t.language.en },
              ]}
              selectedOption={userInfo.language}
              onChange={(x) => {
                $selectedEmployee.setKey("language", x as Locale);
              }}
              dark={false}
            />
          </div>
          <div className="flex flex-col">
            <div className="text-start text-base font-bold">{t.userForm.priviledge}</div>
            <SingleSelect
              selectOptions={[
                { value: "limited", label: t.priviledge.limited },
                { value: "admin", label: t.priviledge.admin },
              ]}
              selectedOption={userInfo.role}
              onChange={(x) => {
                $selectedEmployee.setKey("role", x as UserRole);
              }}
              dark={false}
            />
          </div>
        </div>
        <div className="mt-16 flex gap-5 self-center text-base font-extrabold max-md:mt-10">
          <Button
            label={
              adding || removing || modifying ? (
                <Loader2 className="animate-spin" />
              ) : popup?.type === "edit" ? (
                t.userForm.delete
              ) : (
                t.userForm.cancel
              )
            }
            onClick={handleDelete}
            disabled={adding || removing || modifying}
          />
          <Button
            label={
              adding || removing || modifying ? (
                <Loader2 className="animate-spin" />
              ) : (
                t.userForm.save
              )
            }
            onClick={handleSave}
            disabled={adding || removing || modifying}
          />
        </div>
      </div>
    </div>
  );
};
