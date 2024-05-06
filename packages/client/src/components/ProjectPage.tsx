import { useEffect, useState } from "react";
import { Tasks } from "./NewProject/Tasks";
import { CreateProjectInput } from "@wolf-project/backend/src/routes/projects";
import { $projectInput } from "./NewProject/state";
import { I18nLocale } from "@wolf-project/i18n";

export const useIsClientSide = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient;
};

export const ProjectPage = ({
  project,
  canEdit,
  t,
  lang,
}: {
  t: {
    form: I18nLocale["form"];
    type: I18nLocale["type"];
    status: I18nLocale["status"];
  };
  project: CreateProjectInput;
  canEdit: boolean;
  lang: string;
}) => {
  const isClient = useIsClientSide();
  useEffect(() => $projectInput.set(project), []);
  if (!isClient) return null;
  return <Tasks t={t} canEdit={canEdit} lang={lang} />;
};
