import { Body, Container, Html, Markdown, Row} from "@react-email/components";
import {Tailwind} from "@react-email/tailwind"
import config from "@wolf-project/client/tailwind.config";
import { Locale, useTranslations } from "@wolf-project/i18n";

export interface MagiclinkEmailProps {
  token: string;
  locale: Locale;
}

export const MagiclinkEmail: React.FC<MagiclinkEmailProps> = ({ token, locale }) => {
  const t = useTranslations(locale || undefined);
  const url = `https://localhost:4321/verify?token=${token}`;
  return (
    <Html>
      <Tailwind config={config}>
        <Body>
          <Container>
            <Row>
              <Markdown>{t.login.body(url)}</Markdown>
            </Row>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
