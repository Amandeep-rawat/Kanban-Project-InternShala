import { Check, ChevronDown, ChevronRight, ChevronUp} from "lucide-react" ;
import { useState } from "react";
import { Label } from "./ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";

// import React from 'react';
type PriorityListProps = {
    name: string;
    icon: React.ElementType;
    textColor: string;
    backgroundColor: string;
}
const PriorityListArray: PriorityListProps[] = [
    {
        name: "Low",
        icon: ChevronDown,
        textColor: "text-green-700",
        backgroundColor: "bg-green-500/15"
    },
    {
        name: "Medium",
        icon: ChevronRight,
        textColor: "text-yellow-700",
        backgroundColor: "bg-yellow-500/15"
    },
    {
        name: "High",
        icon: ChevronUp,
        textColor: "text-red-700",
        backgroundColor: "bg-red-500/15"
    },
]
const PriorityList = ({handlePriorityChange}:{handlePriorityChange:React.Dispatch<React.SetStateAction<string>>}) => {
    const [selectedPriority, setSelectedPriority] = useState<PriorityListProps>(PriorityListArray[0]);

    const RenderSelectedPriority=()=> {
        return(

            <div className="flex items-center gap-2">
            <div className={`size-6 ${selectedPriority.backgroundColor} rounded-md justify-center items-center flex`}>
                {
                    <selectedPriority.icon />
                    
                }
            </div>
            <span className={`${selectedPriority.textColor}`}>{selectedPriority.name}</span>

        </div>
            )
    }
    function renderDropDownMenuItem(priorityItem: PriorityListProps) {
        return (
            <div className="flex items-center gap-2">
                <div className={`size-6 ${priorityItem.backgroundColor} rounded-md flex w-full items-center justify-center text-lg ${priorityItem.textColor}`}>
                    <priorityItem.icon  />
                    
                </div>
                <span className={`${priorityItem.textColor}`}>{priorityItem.name}</span>

            </div>
        )
    }

    function isDropDownItemChecked(priorityItem: PriorityListProps) {
        return (
            <>


                {priorityItem.name === selectedPriority.name && <Check />}
            </>
        )
    }

    return (
        <div>
            <Label className="opacity-75 text-sm font-medium">Priority</Label>
            <div className="mt-2 w-full">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button id="priority-dropdown" variant={"outline"} className="w-full h-11 flex justify-between">
                            <RenderSelectedPriority />
                            <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                        </Button>

                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-full ">
                        {
                            PriorityListArray.map((priorityItem, index) => {
                                return (
                                    <DropdownMenuItem onClick={() =>
                                    {
                                        
                                        handlePriorityChange(priorityItem.name)
                                        setSelectedPriority(priorityItem)
                                    
                                        handlePriorityChange(priorityItem.name)
                                    }
                                    }
                                    
                                     key={index} className="flex justify-between items-center">
                                        {renderDropDownMenuItem(priorityItem)}
                                        {isDropDownItemChecked(priorityItem)}
                                    </DropdownMenuItem>
                                )
                            })
                        }

                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}

export default PriorityList;
