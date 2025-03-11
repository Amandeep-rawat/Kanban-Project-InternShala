// import { useAppContext } from "@/context/AppContext";
import { RootState } from "@/redux/store";
import { Separator } from "./ui/separator";
import { useSelector } from "react-redux";
import { Task } from "@/tasks";

// import React from 'react';
type TaskCard={
  label:string;
  value:number;
}
const TaskStatus = () => {
  const {tasks}=useSelector((state:RootState)=>state.tasks);
  console.log(tasks);
  const inprogressTasks=tasks.filter((task:Task)=>task.status==="inprogress");
  const peerreviewTasks=tasks.filter((task:Task)=>task.status==="peerreview");
  const completedTasks=tasks.filter((task:Task)=>task.status==="done");
   
  const statisticCards:TaskCard[]=[
    {label:"Total",value:tasks.length},
    {label:"In progress",value:inprogressTasks.length},
    {label:"Peer Review",value:peerreviewTasks.length},
    {label:"Completed",value:completedTasks.length},
  ]
  return (
    <div className="w-full gap-2">
       
        <div className="grid grid-cols-2 gap-3 mt-3">
          {
            statisticCards.map((statCard,index)=>(
              <SingleCard key={index} statCard={statCard}/>
            ))
          }
        </div>
    </div>
  );
}

export default TaskStatus;


const SingleCard=({statCard}:{statCard:TaskCard})=>{
  return (
    <div className="p-3 border rounded-xl">
      <span className=" text-[12px]">
        {
          statCard.label.toUpperCase()
        }
      </span>
      <div className="flex gap-2 mt-1 items-center">
        <Separator className="w-1 h-4 bg-primary" orientation="vertical"/>
        <span className="font-bold text-lg">
          {
            statCard.value
          }
        </span>
      </div>
    </div>
  )
}