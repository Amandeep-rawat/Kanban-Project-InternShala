// import React from 'react';


// import React from "react";
import { Label } from "./ui/label";
// import { Textarea } from "./ui/textarea";
// import { X } from "lucide-react";
import { Input } from "./ui/input";
type TaskDescriptionProps = {
  register: any;
  error?: string;
};
const TaskDescription = ({ register, error }: TaskDescriptionProps)=> {
   
   
  return (
    <div className="flex flex-col gap-2 mt-4">
        <Label className="opacity-75 text-sm font-medium">Task Description</Label>
        <Input {...register("description",{required:"Description is required",minLength:{value:10,message:"Description must be at least 10 characters"}})} name="description" placeholder="Description is here.." className="resize-none"/>
        <div className="flex justify-between items-center">
          {/* {
            value.length < 10 &&
            <div className="text-red-500 text-[12px] flex items-center gap-1">
                <X size={10}/>
                <p>Description must be at least 10 characters</p>
            </div>
            } */}
            {/* <p className="text-[12px] text-gray-500">
                {value.length}/50 characters
            </p> */}
             {error && <p className="text-red-500">{error}</p>}
        </div>

    </div>
  );
}

export default TaskDescription;
