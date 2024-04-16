import { useState } from "react";
import { client, useAPI } from "../trpc/client";

export const NewUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [job, setJob] = useState("");
  const [language, setLanguage] = useState("");
  const allowedEmail = "veebihunt.ee";
  const [emailError, setEmailError] = useState<string | null>(null);

  const { mutate, error, isLoading } = useAPI(client.employee.create.mutate);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      <form onSubmit={onSubmit} className="flex flex-col items-center gap-2">
        <input
          placeholder="Töötaja dokumendinimi"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="Töötaja email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />
        <input
          placeholder="Töötaja tööroll"
          value={job}
          onChange={(e) => setJob(e.target.value)}
          required
        />
        <select value={language} onChange={(e) => setLanguage(e.target.value)} required>
          <option value="" disabled hidden>
            Vali töötaja keel
          </option>
          <option value="en">English</option>
          <option value="ee">Eesti</option>
        </select>
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="" disabled hidden>
            Vali töötaja õigused süsteemis
          </option>
          <option value="limited">Piiratud</option>
          <option value="admin">Admin</option>
        </select>
        {emailError && <div>{emailError}</div>}
        {error && <div>{error.message}</div>}
        <button type="submit" className="button" disabled={isLoading}>
          {isLoading ? "Loading" : "Submit"}
        </button>
      </form>
    </>
  );
};
