import { useState } from "react";
import { client, useAPI } from "../trpc/client";
import { Employee } from "../trpc/routes/users";

interface ModifyUserProps {
  userId: string;
  user: Employee;
}

export const ModifyUser: React.FC<ModifyUserProps> = ({ userId, user }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [job, setJob] = useState(user.job);
  const [language, setLanguage] = useState(user.language);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [modifying, setModifying] = useState(false);

  const { mutate, error, isLoading } = useAPI(client.employee.modify.mutate);

  const onClick = () => {
    setModifying(!modifying);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const allowedEmail = "veebihunt.ee";
    const splitEmail = email.split("@")[1];
    if (splitEmail !== allowedEmail) {
      setEmailError("Lubatud on ainult firma email!");
      return;
    }
    await mutate({ userId, name, email, role, job, language });
    window.location.href = "/admin";
  };

  return (
    <>
      <button className="w-20 rounded bg-orange-600">
        <a href="/admin">Tagasi</a>
      </button>
      <div className="flex flex-col items-center gap-2">
        <form onSubmit={onSubmit} className="flex flex-col items-center gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={!modifying}
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            disabled={!modifying}
          />
          <input
            value={job || undefined}
            onChange={(e) => setJob(e.target.value)}
            required
            disabled={!modifying}
          />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            required
            disabled={!modifying}
          >
            <option value="en">English</option>
            <option value="ee">Eesti</option>
          </select>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            disabled={!modifying}
          >
            <option value="limited">Piiratud</option>
            <option value="admin">Admin</option>
          </select>
          {emailError && <div>{emailError}</div>}
          {error && <div>{error.message}</div>}
          {modifying ? (
            <button
              type="submit"
              className="rounded bg-blue-500 px-2 py-2 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isLoading || !modifying}
            >
              {isLoading ? "Loading" : "Submit"}
            </button>
          ) : null}
        </form>
        <button onClick={onClick} className="rounded bg-red-500 px-2 py-2">
          {modifying ? "Lõpeta muutmine" : "Luba muutmist"}
        </button>
      </div>
    </>
  );
};
