import { SES } from "@aws-sdk/client-ses";
import { EMAIL_SOURCE } from "@wolf-project/shared/consts";
import { useTranslations } from "@wolf-project/i18n";
import * as React from "react";
import { render } from "@react-email/components";
import { MagiclinkEmail, MagiclinkEmailProps } from "./email-template";

const credentials = {
  accessKeyId: process.env.ADMIN_AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.ADMIN_AWS_SECRET_ACCESS_KEY!,
};
const ses = new SES({ credentials , region: 'eu-central-1',});

export const sendEmail = async (props: { to: string[] } & MagiclinkEmailProps) => {
  const t = useTranslations(props.locale || undefined);
  const payload = render(<MagiclinkEmail token={props.token} locale={props.locale} />);
  await ses.sendEmail({
    Source: EMAIL_SOURCE,
    Destination: { ToAddresses: props.to },
    Message: {
      Body: {
        Html: { Charset: "UTF-8", Data: payload },
      },
      Subject: { Charset: "UTF-8", Data: t.login.title },
    },
  });
};
