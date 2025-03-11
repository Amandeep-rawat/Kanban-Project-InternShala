// import React from 'react';

import { CheckCircle } from "lucide-react";
import { Project, projects } from "./ProjectSelectionDropDown";
import { CommandItem } from "./ui/command";


type SingleProjectCommandItemProps={
    project:Project;
    isSelected:boolean;
    onSelectedItem:(project:Project)=>void;
}
const SingleProjectCommandItem = ({project,isSelected,onSelectedItem}:SingleProjectCommandItemProps) => {
  const {name:ProjectName,tasks,icon:ProjectorIcon}=project;
    return (
    <div>
      <CommandItem value={ProjectName} onSelect={(value:string)=>{
        const findProject=projects.find((proj)=>proj.name ===value);
        if(findProject){
            onSelectedItem(findProject);
        }
      }}
      className="cursor-pointer hover:bg-gray-100 rounded-lg p-2"

      >
            <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
        <div className="size-0 bg-primary flex items-center justify-center rounded-md text-white">
            <ProjectorIcon/>
        </div>
        <div className="flex flex-col">
            <span className="font-medium">{ProjectName}</span>
            <span className="text-[12px] text-gray-100">
                {tasks.length} Tasks
            </span>
        </div>
            </div>

            {
                isSelected && (
                    <div className="text-primary">
                        <CheckCircle size={12}/>
                    </div>
                )
            }
            </div>
      </CommandItem>
    </div>
  );
}

export default SingleProjectCommandItem;
