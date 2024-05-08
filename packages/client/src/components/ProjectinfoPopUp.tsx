import * as React from "react";
import { ArrowLeft } from "lucide-react";
import { I18nLocale } from "@wolf-project/i18n";
import { Project } from "./DisplayAllProjects";

export default function ProjectInfoPopUp({
  t,
  onClose,
  project,
}: {
  onClose: () => void;
  t: I18nLocale["allProjects"];
  project: Project;
}) {
  return (
    <div className="flex h-screen w-full">
      <div className="w-1/2 bg-black opacity-50" onClick={onClose}></div>
      <div className="flex w-1/2  rounded-2xl ">
        <div className=" w-full max-w-4xl">
          <div
            className="bg-primary flex w-full max-w-full flex-col rounded-2xl p-14"
            style={{ overflowY: "auto", maxHeight: "100vh" }}
          >
            <div className="mt-14 flex w-full max-w-full justify-between">
              <button className="flex items-center" onClick={onClose}>
                <ArrowLeft className="text-primary2 h-9 w-9" />
              </button>
              <h1 className="w-full text-center text-2xl font-semibold">{project.name}</h1>
            </div>

            <div className="mt-12 flex w-full justify-center gap-5 text-base font-semibold">
              <a
                href={`/project/${project.id}/edit`}
                className="border-primary2 rounded-2xl border border-solid px-3 py-3"
              >
                {t.changeProject}
              </a>
              <a
                href={`/project/${project.id}/clients`}
                className="border-primary2 rounded-2xl border border-solid px-3 py-3.5"
              >
                {t.changeClient}
              </a>
            </div>
            <div className="mx-5 my-10 flex max-w-full items-start gap-4 text-lg">
              <div className="flex flex-col gap-6 text-left font-semibold max-md:mt-10">
                <div>{t.client}</div>
                <div>{t.manager}</div>
                <div>{t.deadline}</div>
                <div>{t.progress}</div>
                <div>{t.status}</div>
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
              <div className="mt-4 text-base font-semibold">{project.description}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
