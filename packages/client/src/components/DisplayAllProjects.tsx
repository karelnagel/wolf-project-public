import React, { useState } from "react";
import { I18nLocale } from "@wolf-project/i18n";
import ProjectInfoPopUp from "./ProjectinfoPopUp";
import { Projects } from "@wolf-project/db/schema";

export type Project = Projects & {status:string, progress: string, manager:string, deadline: string}

const AllProjects = ({ t, projects }: { t: I18nLocale["allProjects"], projects: Project[] }) => {
  const [selectedProject, setselectedProject] = useState <Project | null>(null);

  const handleCloseProjectInfo = () => {
    setselectedProject(null);
  };


  return (
    
    <div className="flex flex-col items-center justify-center text-center font-semibold max-md:px-5">
      <div className=" mt-12 flex w-3/4 flex-col max-md:mt-10 max-md:max-w-full">
          <div className="flex justify-between">
          <div>{t.name}</div>
          <div>{t.manager}</div>
          <div>{t.client}</div>
          <div>{t.progress}</div>
          <div>{t.status}</div>
          </div>
        <div className="mt-16 flex flex-col items-center text-base max-md:mt-10 max-md:max-w-full">
          {projects.map((project) => (
            <div
            key={project.id}
            className="border-primary2 my-7 flex w-full justify-between gap-5 rounded-2xl border border-solid px-5 py-8 max-md:max-w-full max-md:flex-wrap"
            onClick={()=>setselectedProject(project)} 
            style={{ cursor: "pointer" }} // Change cursor to pointer
          >
            <div>{project.name}</div>
            <div>{project.manager}</div>
            <div>{project.companyName}</div>
            <div>{project.progress}</div>
            <div>{project.status}</div>
          </div>
          ))}
        </div>

        <div
          className={`fixed right-0 top-0 w-full transform shadow-lg transition-transform ${
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
