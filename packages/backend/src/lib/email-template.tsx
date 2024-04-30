import { Body, Container, Html, Row } from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import config from "@wolf-project/client/tailwind.config";
import { Locale, useTranslations } from "@wolf-project/i18n";

export interface MagiclinkEmailProps {
  token: string;
  locale: Locale;
}

export const MagiclinkEmail: React.FC<MagiclinkEmailProps> = ({ token, locale }) => {
  const t = useTranslations(locale || undefined);
  const url = `${process.env.PUBLIC_API_URL}/verify?token=${token}`;
  console.log(url);
  return (
    <Html>
      <Tailwind config={config}>
        <Body>
          <Container>
            <Row>{t.login.body(url)}</Row>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
