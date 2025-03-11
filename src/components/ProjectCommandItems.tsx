// import React from 'react';

import { Dispatch, SetStateAction } from "react";
import { Project, projects } from "./ProjectSelectionDropDown";
import { Command, CommandEmpty, CommandInput, CommandList } from "./ui/command";
import SingleProjectCommandItem from "./SingleProjectCommandItem";

const ProjectCommandItems = ({selectedProject,setSelectedProject}:{selectedProject:Project;setSelectedProject:Dispatch<SetStateAction<Project>>}) => {

    function handleProjectSelect(project:Project){
        setSelectedProject(project);
    }

  return (
    <div>
    <Command>
        <CommandInput placeholder="Search a project"/>
        <CommandList className="my-3">
            <CommandEmpty>No Result Found🥹</CommandEmpty>
        </CommandList>
        <div className="flex flex-col gap-3">
            {
                projects.map((project,index)=>{
                    return (
                        <SingleProjectCommandItem project={project} key={index} onSelectedItem={handleProjectSelect} isSelected={selectedProject.name ===project.name}/>
                    )
                })
            }
        </div>
    </Command>
    </div>
  );
}

export default ProjectCommandItems;
