import { useState } from "react";
import { Loader2 } from "lucide-react";
import { client, useAPI } from "@wolf-project/backend/src/client";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const { mutate, isLoading } = useAPI(client.authenticate.login.query);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ email })
      .then(() => {
        setLoggingIn(true);
      })
      .catch(Error);
      setLoggingIn(true);
  };

  return (
    <div className="mt-72 flex flex-col items-center justify-center">
      <div className="border-primary2 flex min-h-[18rem] min-w-[18rem] flex-col items-center justify-center rounded-2xl border border-solid">
        {!loggingIn && (
          <div>
            <div className="mt-10 text-center text-2xl font-semibold">Login</div>
            <form className="mt-[50px] flex flex-col" onSubmit={onSubmit}>
              <input
                placeholder="name@email.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button className="border-primary2 bg-primary hover:bg-primary2 mb-7 mt-10 justify-center self-center whitespace-nowrap rounded-2xl border border-solid px-8 py-[15px] text-center font-extrabold">
                {isLoading ? <Loader2 className="animate-spin" /> : "Login"}
              </button>
            </form>
          </div>
        )}
        {loggingIn && (
          <div className="flex w-[18rem] flex-col items-center justify-center">
            <div className="rounded-lg px-6 py-4 shadow-md">
              <div className="flex flex-col items-center justify-center text-center">
                <p className="whitespace-normal font-semibold">
                  Continue login process by opening magic link, which is sent to your email!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
