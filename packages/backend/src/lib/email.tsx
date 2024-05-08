import { SES } from "@aws-sdk/client-ses";
import { useTranslations } from "@wolf-project/i18n";
import * as React from "react";
import { render } from "@react-email/components";
import {
  MagiclinkEmail,
  MagiclinkEmailProps,
  NewProject,
  NewProjectEmailProps,
} from "./email-template";
import { DOMAIN } from "@wolf-project/shared/consts";

export const EMAIL = process.env.EMAIL || `noreply@${DOMAIN}`;
export const EMAIL_SOURCE = `Wolf Agency <${EMAIL}>`;

const credentials = {
  accessKeyId: process.env.ADMIN_AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.ADMIN_AWS_SECRET_ACCESS_KEY!,
};
const ses = new SES({ credentials, region: "eu-central-1" });

export const loginEmail = async (props: { to: string[] } & MagiclinkEmailProps) => {
  const t = useTranslations(props.locale || undefined);
  const payload = render(<MagiclinkEmail {...props} />);
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

export const newProjctEmail = async (
  props: { to: string[]; companyName: string } & NewProjectEmailProps,
) => {
  const t = useTranslations(props.locale || undefined);
  const payload = render(
    <NewProject
      locale={props.locale}
      name={props.name}
      ofStage={props.ofStage}
      projectMEmail={props.projectMEmail}
      projectMName={props.projectMName}
      projectMPhone={props.projectMPhone}
      projectId={props.projectId}
    />,
  );

  await ses.sendEmail({
    Source: EMAIL_SOURCE,
    Destination: { ToAddresses: props.to },
    Message: {
      Body: {
        Html: { Charset: "UTF-8", Data: payload },
      },
      Subject: { Charset: "UTF-8", Data: t.email.newProjectSubject(props.companyName) },
    },
  });
};
