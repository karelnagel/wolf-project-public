import { useState } from "react";
import { Loader2 } from "lucide-react";
import { client, useAPI } from "@wolf-project/backend/src/client";
import { sendEmail } from "@wolf-project/backend/src/lib/email";
import { hasToken } from "@wolf-project/shared/helpers";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const { mutate, isLoading } = useAPI(client.authenticate.login.query);
  let result;
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    result = await mutate({ email });
    setLoggingIn(true);
    if (hasToken(result)) {
      console.log("I am here");
      await sendEmail({
        to: [email!],
        token: result.Token!,
        locale: "en",
      });
    }
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
            {isLoading ? <Loader2 className="animate-spin" /> : "Login"}
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
