import * as React from "react";
import { ArrowLeft } from "lucide-react";
import { I18nLocale } from "@wolf-project/i18n";
import { Project } from "./DisplayAllProjects";



export default function ProjectInfoPopUp({
  t,
  onClose,
  project
}:{
  onClose: () => void;
 t: I18nLocale["allProjects"]
  project: Project
}) {
  return (

    <div className="flex h-screen w-full">
      <div className="w-1/2"></div>
      <div className="flex w-1/2  rounded-2xl ">
        <div className=" max-w-4xl w-full">
            <div className="flex w-full bg-primary rounded-2xl max-w-full p-14 flex-col"  style={{ overflowY: "auto", maxHeight: "100vh" }}>
              <div className="flex w-full max-w-full mt-14 justify-between">
                <button className="flex items-center" onClick={onClose}>
                  <ArrowLeft className="text-primary2 h-9 w-9" />
                </button>
                <h1 className="w-full text-center text-2xl font-semibold">{project.name}</h1>
              </div>

              <div className="mt-12 flex w-full gap-5 text-base justify-center font-semibold">
                <a href={`/project/${project.id}/edit`} className="border-primary2 rounded-2xl border border-solid px-3 py-3">
                  muuda projekti infot
                </a>
                <a href={`/project/${project.id}/clients`} className="border-primary2 rounded-2xl border border-solid px-3 py-3.5">
                  muuda kliendi infot
                </a>
              </div>
              <div className="mx-5 my-10 flex text-lg max-w-full items-start gap-4">
                  <div className="flex flex-col text-left font-semibold max-md:mt-10 gap-6">
                    <div>{t.client}</div>
                    <div>{t.manager}</div>
                    <div>{t.deadline}</div>
                    <div >{t.progress}</div>
                    <div >{t.status}</div>
                  </div>
                <div className="ml-5 flex-1">
                  <div className="flex flex-col justify-center text-left font-semibold max-md:mt-10">
                    <div>{project.companyName}</div>
                    <div className="mt-6">{project.manager}</div>
                    <div className="mt-6">{project.deadline}</div>
                    <div className="mt-6">{project.progress}</div>
                    <div className="mt-6">{project.status}</div>
                  </div>
                </div>
              </div>
              <div className="border-primary2 bg-primary mt-6  flex flex-col rounded-2xl border p-6 max-md:pl-4">
                <div className="text-center text-xl font-extrabold">{t.description}</div>
                <div className="mt-4 text-base font-semibold">
                 {project.description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
