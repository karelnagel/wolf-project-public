import { useState } from "react";
import { client, useAPI } from "../trpc/client";
import { Employee } from "../trpc/routes/users";

interface ModifyUserProps {
  userId: string;
  user: Employee;
}

export const ModifyUser: React.FC<ModifyUserProps> = (userId, user) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [job, setJob] = useState(user.job);
  const [language, setLanguage] = useState(user.language);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [modifying, setModifying] = useState(false);

  const { mutate, error, isLoading } = useAPI(client.employee.create.mutate);

  const onClick = () => {
    setModifying(!modifying)
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const allowedEmail = "veebihunt.ee";
    const splitEmail = email.split("@")[1];
    if (splitEmail !== allowedEmail) {
      setEmailError("Lubatud on ainult firma email!");
      return;
    }
    await mutate({ name, email, role, job, language });
    window.location.href = "/admin";
  };

  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <form className="gap-2 flex flex-col items-center">
          <input
            placeholder="Töötaja dokumendinimi"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={!modifying}
          />
          <input
            placeholder="Töötaja email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            disabled={!modifying}
          />
          <input
            placeholder="Töötaja tööroll"
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
          <button
            type="submit"
            className="rounded bg-blue-500 py-2 px-2 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isLoading || !modifying}
          >
            {isLoading ? "Loading" : "Submit"}
          </button>
        </form>
        <button onClick={onClick} className="rounded py-2 px-2 bg-red-500">
          {modifying ? "Luba muutmist" : "Lõpeta muutmine"}
        </button>
      </div>
    </>
  );
};
