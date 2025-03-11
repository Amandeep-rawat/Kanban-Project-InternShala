// import React from 'react';

import { Flag, MonitorSmartphone } from "lucide-react";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import ProjectCommandItems from "./ProjectCommandItems";


   export type Project={
       id:string;
       name:string;
       icon:React.ElementType;
       createdAt:Date;
       tasks:string[]
   }

export const projects:Project[]=[
    {

        id:"1",
        name:"project1",
        icon:MonitorSmartphone,
        createdAt:new Date(),
        tasks:[]
    },
    {

        id:"2",
        name:"project2",
        icon:Flag,
        createdAt:new Date(),
        tasks:[]
    },
]
const ProjectSelectionDropDown = () => {
    const [selectedProject,setSelectedProject]=useState<Project>(projects[0]);
    return (
    <Popover>
        <PopoverTrigger asChild>
            <Button variant={"ghost"} className="w-full flex justify-between py-9 rounded-xl bg-gray-50">
                <div className="flex items-start flex-col text-[16px] gap-1">
                    <p className="text-[13px] text-slate-500">
                        PROJECT
                    </p>
                    <p className="font-bold">{selectedProject.name}</p>
                </div>
                <div className="size-10 bg-primary rounded-full flex items-center justify-center text-2xl text-white">
                    <selectedProject.icon/>
                </div>
            </Button>
        </PopoverTrigger>
        <PopoverContent className="p-2 rounded-xl">
            <ProjectCommandItems selectedProject={selectedProject} setSelectedProject={setSelectedProject}/>
        </PopoverContent>
    </Popover>
  );
}

export default ProjectSelectionDropDown;
