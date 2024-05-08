import { Body, Container, Html, Row, Markdown, Section } from "@react-email/components";

import { Locale, useTranslations } from "@wolf-project/i18n";

export interface MagiclinkEmailProps {
  token: string;
  locale: Locale;
}

export const MagiclinkEmail: React.FC<MagiclinkEmailProps> = ({ token, locale }) => {
  const t = useTranslations(locale || undefined);
  const url = `${process.env.PUBLIC_API_URL}/verify?token=${token}`;
  return (
    <Html>
      <Body>
        <Container>
          <Row>
            <Section>
              <Markdown>{t.login.body(url)}</Markdown>
            </Section>
          </Row>
        </Container>
      </Body>
    </Html>
  );
};

export interface NewProjectEmailProps {
  locale: Locale;
  name: string;
  ofStage: string;
  projectId: string;
  projectMName: string;
  projectMEmail: string;
  projectMPhone: string;
}

export const NewProject: React.FC<NewProjectEmailProps> = ({
  name,
  ofStage,
  projectId,
  projectMName,
  projectMEmail,
  projectMPhone,
  locale,
}) => {
  const t = useTranslations(locale || undefined);
  const url = `${process.env.PUBLIC_API_URL}/project/${projectId}`;
  return (
    <Html>
      <Body>
        <Container>
          <Row>
            <Markdown>
              {t.email.newProject(name, ofStage, url, projectMName, projectMEmail, projectMPhone)}
            </Markdown>
          </Row>
        </Container>
      </Body>
    </Html>
  );
};

export interface UpdateStageProps {
  locale: Locale;
  name: string;
  stageNumber: string;
  stageName: string;
  responsible: string;
  projectMName: string;
  projectId: string;
}
export const UpdateStage: React.FC<UpdateStageProps> = ({
  locale,
  name,
  stageNumber,
  stageName,
  responsible,
  projectId,
  projectMName,
}) => {
  const t = useTranslations(locale || undefined);
  const url = `${process.env.PUBLIC_API_URL}/project/${projectId}`;
  return (
    <Html>
      <Body>
        <Container>
          <Row>
            <Markdown>
              {t.email.stageUpdate(name, stageNumber, stageName, url, projectMName, responsible)}
            </Markdown>
          </Row>
        </Container>
      </Body>
    </Html>
  );
};
