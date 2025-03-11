import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";

type MenuItem={
  icon:React.ElementType;
  label:string;
  className:string;
  seprator?:undefined;
}  

const TaskDropDown = () => {
const menuItems:MenuItem[]=[
    {
        icon:Edit,label:"Edit Task",className:""
    },{
        icon:Trash,label:"Delete Task",className:"text-red-500"
    },
];
    return (
    <div>
        
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"ghost"}><MoreHorizontal/></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {
                    menuItems.map((item,index)=>{
                    
                    return (
                            
                        item.seprator?(
                            <DropdownMenuSeparator key={index}/>
                        ):  
                        (
                            <DropdownMenuItem  onClick={()=>alert("Not Creted Yet.Sorry Sir/Mam")}  className="flex cursor-pointer items-center gap-1 p-[18px]" key={index}>
                                <item.icon className="w-4 h-4 mr-2" /> {/* ✅ Correct way to render */}
                               <span  >{item.label}</span>
                           </DropdownMenuItem>
                            )
                            
                        )
                        })
                    }
            </DropdownMenuContent>
        </DropdownMenu>
      </div>
  );
}

export default TaskDropDown;
