// import React from 'react';

// import { Cross } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
type TaskNameProps = {
  register: any;
  error?: string;
};
const TaskName = ({ register, error }: TaskNameProps) => {
  return (
    <div className="flex flex-col gap-2">
        <Label className="opacity-75 text-sm font-medium">Task Title</Label>
        <Input {...register("title",{required:"Title is required",minLength:{value:3,message:"Title must be at least 3 characters"}})} placeholder="Joe Doe" className="h-11"/>
        {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default TaskName;
