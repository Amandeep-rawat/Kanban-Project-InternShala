// import React from 'react';

import { CheckCircle, ChevronDown, MonitorSmartphone, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ProjectCommandItems from "./ProjectCommandItems";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type ProjectItem={
    name:string;
    icon:React.ElementType;

}
const projectsArray:ProjectItem[]=[
{
    name:"project 1",
    icon:MonitorSmartphone
},
{
    name:"project 2",
    icon : MonitorSmartphone
}
]
const ProjectList = () => {
    const [selectedProject,setSelectedProject]=useState<ProjectItem>(projectsArray[0]);
    const [searchQuery,setSearchQuery]=useState<string>("");
    const [isopen,setisOpen]=useState(false)
    const dropdownRef=useRef<HTMLDivElement>(null);
    const filterBySearchQuery=projectsArray.filter((project)=> project.name.toLowerCase().includes(searchQuery.toLowerCase()));
    useEffect(() => {
      const handleClickOutside=(event:MouseEvent)=>{
          if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node)){
              setisOpen(false);
          }
      
      }
      document.addEventListener("mousedown",handleClickOutside);
      return ()=>{
          document.removeEventListener("mousedown",handleClickOutside);
      }
    }, []);

    const RenderSelectedProject=()=>{
        const Icon=selectedProject.icon;
        return (
            <div className="flex items-center gap-2">
                <div className="size-7 rounded-md flex items-center justify-center text-lg text-primary bg-primary/10">
                <Icon/>
                </div>
                <span>{selectedProject.name}</span>
               
            </div>
        )
    }
    function renderDropDownMenuItem(projectItem:ProjectItem){
        const Icon=projectItem.icon;
        return (
                <div onClick={()=>{

                    setSelectedProject(projectItem)
                     setisOpen(false)
                     }}
                      className="flex items-center gap-2 p-2 hover:bg-gray-200 cursor-pointer">
                            <div className="size-7 bg-primary/10 rounded-md flex items-center justify-center text-[14px] text-primary">
                            
                            <Icon/>

                            </div>

                            <span>{projectItem.name}</span>
                            {
                    ProjectCommandItems.name ===selectedProject.name &&(
                        <CheckCircle size={12} className=" ml-auto"/>

                    )
                }
                </div>
        )
    }
  return (
    <div className="relative" ref={dropdownRef}>
        <Label className="opacity-75 text-sm font-medium">
            Projects
        </Label>
        <div className="mt-1 w-full">
            <Button onClick={()=>setisOpen(!isopen)} variant={"outline"} className="w-full h-11 flex justify-between items-center border">
                <RenderSelectedProject/>
                <ChevronDown className="text-gray-400"/>
            </Button>
        </div>
        {
            isopen &&(
                <div className="absolute overflow-hidden z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                    <Input type="text" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} className="w-full h-11 pl-8 text-sm border-b border-gray-300 focus:outline-none overflow-hidden" placeholder="Search a project" autoFocus/>
                    <Search className="absolute top-[13px] left-2 text-lg text-gray-500"/>

                    <div className="max-h-60 overflow-y-auto my-2">
                        {
                            filterBySearchQuery.map((projectItem,index)=>{
                                return (
                                    <div key={index} className="text-sm">
                                            {renderDropDownMenuItem(projectItem)}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            )
        }
      
    </div>
  );
}

export default ProjectList;
