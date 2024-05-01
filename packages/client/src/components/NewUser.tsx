import { useState } from "react";
import { client, useAPI } from "@wolf-project/backend/src/client";
import { UserRole } from "@wolf-project/db/schema";
import { Locale } from "@wolf-project/i18n";

export const NewUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<UserRole>();
  const [language, setLanguage] = useState<Locale>();
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
    if (!role || !language) return;

    await mutate({ name, email, role, language });
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
        <select value={language} onChange={(e) => setLanguage(e.target.value as Locale)} required>
          <option value="" disabled hidden>
            Vali töötaja keel
          </option>
          <option value="en">English</option>
          <option value="et">Eesti</option>
        </select>
        <select value={role} onChange={(e) => setRole(e.target.value as UserRole)} required>
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
