import { ArrowLeft, Loader2 } from "lucide-react";
import { $employees, $selectedEmployee, $userEditPopUp } from "../NewProject/state";
import { useStore } from "@nanostores/react";
import { I18nLocale, Locale } from "@wolf-project/i18n";
import { SingleSelect } from "../SingleSelect";
import { UserRole } from "@wolf-project/db/schema";
import { Button } from "../Buttons";
import { addEmployee, getEmployee, modifyEmployee, removeEmployee } from "./AdminMutates";
import { useState } from "react";
export const UserFormPopup = ({
  t,
}: {
  t: {
    userForm: I18nLocale["userForm"];
    language: I18nLocale["language"];
    priviledge: I18nLocale["priviledge"];
    error: I18nLocale["error"];
  };
}) => {
  const popup = useStore($userEditPopUp);
  const userInfo = useStore($selectedEmployee);
  const employees = useStore($employees);

  const { addUser, isLoading: adding } = addEmployee();
  const { removeUser, isLoading: removing } = removeEmployee();
  const { modifyUser, isLoading: modifying } = modifyEmployee();
  const { getUser } = getEmployee();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSave = async () => {
    if (userInfo.name === "" && userInfo.name === "") {
      setErrorMessage(t.error.missingInputs);
      return;
    }
    if (!userInfo.email.includes("@veebihunt.ee")) {
      setErrorMessage(t.error.wrongWorkEmail);
      return;
    }
    if (popup?.type === "edit") {
      try {
        await modifyUser(popup.id, userInfo);
      } catch (modifyError) {
        console.error((modifyError as Error).message);
        setErrorMessage(t.error.dbIssue);
        return;
      }
    } else {
      try {
        await addUser(userInfo);
      } catch (addError) {
        console.error((addError as Error).message);
        setErrorMessage(t.error.dbIssue);
        return;
      }
      const result = await getUser(userInfo);
      $employees.set([...(employees || []), result]);
      $userEditPopUp.set(null);
    }
  };

  const handleDelete = async () => {
    if (popup?.type === "edit") {
      await removeUser(popup.id);
      $employees.set(employees?.filter((employee) => employee.id !== popup?.id)!);
    }
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
        {errorMessage && <div className="flex justify-center items-center text-2xl font-bold">{errorMessage}</div>}
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
