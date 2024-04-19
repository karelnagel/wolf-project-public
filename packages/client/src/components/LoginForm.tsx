import { useState } from "react";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  let result;
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoggingIn(true);
  };

  return (
    <>
      {!loggingIn && (
        <form className="flex max-w-60 flex-col gap-2" onSubmit={onSubmit}>
          <input
            placeholder="name@email.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="border-primary2 mt-4 justify-center self-center whitespace-nowrap rounded-2xl border border-solid px-8 py-2.5 text-center font-extrabold max-md:px-5">
            Login
          </button>
        </form>
      )}
      {loggingIn && (
        <>
          <div>Check your email to finish login process</div>
          <div>{result}</div>
        </>
      )}
    </>
  );
};
