import { useEffect, useState } from "react";
import { Tasks } from "./NewProject/Tasks";
import { CreateProjectInput } from "@wolf-project/backend/src/routes/projects";
import { $comments, $projectId, $projectInput, $users } from "./NewProject/state";
import { I18nLocale } from "@wolf-project/i18n";
import { Comment, User } from "@wolf-project/db/schema";

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
  comments,
  users,
  projectId,
}: {
  t: {
    form: I18nLocale["form"];
    type: I18nLocale["type"];
    status: I18nLocale["status"];
    comment: I18nLocale["comment"];
  };
  project: CreateProjectInput;
  canEdit: boolean;
  lang: string;
  comments: Comment[];
  users: User[];
  projectId: string;
}) => {
  const isClient = useIsClientSide();
  useEffect(() => {
    $projectInput.set(project);
    $comments.set(comments);
    $users.set(users);
    $projectId.set(projectId)
  }, []);
  if (!isClient) return null;
  return <Tasks t={t} canEdit={canEdit} exProject lang={lang} />;
};
