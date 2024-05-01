import { useEffect, useState } from "react";
import { Tasks } from "./NewProject/Tasks";
import { CreateProjectInput } from "@wolf-project/backend/src/routes/projects";
import { $projectInput } from "./NewProject/state";
import { client } from "@wolf-project/backend/src/client";

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
  projectId,
}: {
  projectId: string;
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
          client.tasks.save
            .mutate({
              projectId,
              tasks: $projectInput.get().tasks.map((task) => ({ ...task, projectId })),
            })
            .then(() => {
              alert("Tasks saved!");
            });
        },
      }}
    />
  );
};
