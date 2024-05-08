import React, { useState } from "react";
import { I18nLocale } from "@wolf-project/i18n";
import ProjectInfoPopUp from "./ProjectinfoPopUp";
import { Projects } from "@wolf-project/db/schema";
import { Button } from "./Buttons";

export type Project = Projects & {
  status: string;
  progress: string;
  manager: string;
  deadline: string;
};

const AllProjects = ({ t, projects }: { t: I18nLocale["allProjects"]; projects: Project[] }) => {
  const [selectedProject, setselectedProject] = useState<Project | null>(null);

  const handleCloseProjectInfo = () => {
    setselectedProject(null);
  };

  return (
    <div className="flex flex-col items-center justify-center text-left font-semibold max-md:px-5">
      <div className=" mt-12 flex w-3/4 flex-col max-md:mt-10 max-md:max-w-full">
        <div className="grid grid-cols-6 justify-between">
          <div className="col-span-2">{t.name}</div>
          <div>{t.manager}</div>
          <div>{t.client}</div>
          <div>{t.progress}</div>
        </div>
        {projects.map((project) => (
          <div
            key={project.id}
            className="border-primary2 my-7 grid w-full grid-cols-6 items-center gap-5 rounded-2xl border border-solid px-5 py-8 max-md:max-w-full max-md:flex-wrap"
            onClick={() => setselectedProject(project)}
            style={{ cursor: "pointer" }}
          >
            <div className="col-span-2">{project.name}</div>
            <div>{project.manager}</div>
            <div>{project.companyName}</div>
            <div>{project.progress}</div>
            <Button
              stretch
              label={t.open}
              href={`/project/${project.id}`}
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.stopPropagation()}
            />
          </div>
        ))}

        <div
          className={`fixed right-0 top-0 z-20 w-full transform shadow-lg transition-transform ${
            selectedProject ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {selectedProject && (
            <ProjectInfoPopUp t={t} onClose={handleCloseProjectInfo} project={selectedProject} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProjects;
