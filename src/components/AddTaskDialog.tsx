
import { ClipboardList } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Separator } from './ui/separator';
import PriorityList from './PriorityList';

import TaskDescription from './TaskDescription';
import TaskName from './TaskName';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addTask } from '@/redux/TasksSlice';

import { v4 as uuidv4 } from 'uuid';
import {useForm,SubmitHandler} from "react-hook-form"
import { toast } from 'react-toastify';

const AddTaskDialog = () => {
    type Inputs = {
        title: string;
        description: string;
      };
      

      const {
        register,
        handleSubmit,
        reset,  // ✅ Form reset ke liye
        formState: { errors,isSubmitting },
        
      } = useForm<Inputs>();
      
      const [priority, setPriority] = useState("Low");
      const onSubmit: SubmitHandler<Inputs> = async(data) =>{
        const newTask = {
            id: uuidv4(),
            title: data.title,
            description: data.description,
            status: "todo",
            priority: priority,
            createdAt: new Date(),
          };
          console.log("data",data);
          
        
          console.log("Task Added:", newTask);
          dispatch(addTask(newTask));  // ✅ Redux me task save karna
          setIsOpen(false);
          reset();
          toast.success("Task Added Successfully");
      }


    const [isOpen, setIsOpen] = useState(false);
    const dispatch=useDispatch();
  
    return (
        <div>
            <Dialog  open={isOpen} onOpenChange={setIsOpen} >
        <DialogTrigger asChild>
            <Button >Add Task</Button>

        </DialogTrigger>
        <DialogContent>

            <DialogHeader>
                <div className="size-10 bg-gray-200 rounded-full flex justify-center items-center">
                    <ClipboardList className='text-xl text-gray-500'/>
                </div>
                <div className="pt-2">
                    <DialogTitle className='text-lg  h-7'>
                        New Task
                    </DialogTitle>
                    <DialogDescription className=''>
                        Filll in the form below to create or modify a task 
                    </DialogDescription>
                </div>
                <div>
                    <Separator className='mt-4 left-0 absolute'/>
                </div>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} >

            <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="flex flex-col gap-3">
                <TaskName 
                register={register} error={errors.title?.message}
//   value={taskData.title} 
//   onChange={handleInputChange} 
/>                    <TaskDescription
//  value={taskData.description} onChange={handleInputChange}
register={register} error={errors.description?.message}
 />

                </div>
                <div className="flex flex-col gap-12">
                    {/* <ProjectList/> */}
                    <PriorityList  handlePriorityChange={setPriority} />
                </div>
            </div>
            <div>
                <Separator className='mt-4 left-0 absolute'/>

            </div>
            <div className='flex gap-1 justify-end items-center mt-6'>
            <Button type='button' variant={"secondary"} onClick={() => setIsOpen(false)}>
    Close
</Button>
                <Button type='submit' className=' px-5'>{isSubmitting ? "Saving..." : "Add Task"}</Button>
            </div>
            </form>
        </DialogContent>

            </Dialog>

        </div>
    );
}

export default AddTaskDialog;
