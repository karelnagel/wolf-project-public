import { useEffect, useState } from "react";
import { Tasks } from "./NewProject/Tasks";
import { CreateProjectInput } from "@wolf-project/backend/src/routes/projects";
import { $projectInput } from "./NewProject/state";

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
}: {
  project: CreateProjectInput;
  canEdit: boolean;
}) => {
  const isClient = useIsClientSide();
  useEffect(() => $projectInput.set(project), []);
  if (!isClient) return null;
  return (
    <Tasks
      canEdit={canEdit}
      onBackClick={() => {
        window.location.href = "/";
      }}
      confirmButton={{
        label: "Save",
        onClick: () => {
          // Todo save tasks in the database
          console.log("This should save these tasks:", $projectInput.get().tasks);
        },
      }}
    />
  );
};
