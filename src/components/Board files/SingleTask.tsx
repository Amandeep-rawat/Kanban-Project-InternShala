"use client"

import type React from "react"

import { ChevronDownCircle, ChevronLeftCircle, ChevronUpCircle } from "lucide-react"
import { Card, CardContent, CardHeader } from "../ui/card"
import TaskDropDown from "../taskdropdown/TaskDropDown"
import type { Task } from "@/tasks"
import { useRef, useEffect } from "react"

interface SingleTaskProps {
  task: Task
  onTouchStart?: (taskId: string, e: React.TouchEvent) => void
  setTaskRef?: (taskId: string, ref: HTMLDivElement | null) => void
}

const SingleTask = ({ task, onTouchStart, setTaskRef }: SingleTaskProps) => {
  const taskRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (setTaskRef && taskRef.current) {
      setTaskRef(task.id, taskRef.current)
    }

    return () => {
      if (setTaskRef) {
        setTaskRef(task.id, null)
      }
    }
  }, [task.id, setTaskRef])

  const handleTouchStart = (e: React.TouchEvent) => {
    if (onTouchStart) {
      // Prevent default to avoid any browser-specific behaviors
      e.preventDefault()
      onTouchStart(task.id, e)
    }
  }

  return (
    <Card
      ref={taskRef}
      draggable
      onDragStart={(e) => {
        console.log("Dragging Task ID:", task.id)
        e.dataTransfer.setData("id", task.id)
      }}
      onTouchStart={handleTouchStart}
      className="opacity-100 w-full cursor-grab active:cursor-grabbing mb-3"
    >
      <CardHeader className="p-4">
        <div className="flex justify-between items-center">
          <div
            className={`p-1 py-2 rounded-3xl px-2 max-sm:p-2 gap-1 max-sm:justify-center flex items-center pr-4 font-medium ${task.priority === "High" && "bg-red-500"} ${task.priority === "Medium" && "bg-yellow-500"} ${task.priority === "Low" && "bg-green-500"} text-white`}
          >
            {task.priority === "Low" && <ChevronDownCircle size={15} />}
            {task.priority === "Medium" && <ChevronLeftCircle size={15} />}
            {task.priority === "High" && <ChevronUpCircle size={15} />}
            <span className={`max-[450px]:hidden text-[10px]`}>{task.priority}</span>
          </div>
          <TaskDropDown />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 mt-1">
        <span className="font-bold max-md:text-sm max-[450px]:text-[12px] max-lg:text-base max-lg:font-semibold overflow-hidden text-lg h-6">
          {task.title.slice(0, 18)}...
        </span>
        <span className="text-sm max-lg:text-xs h-9 overflow-hidden max-[450px]:text-[10px] text-gray-600">
          {task.description.slice(0, 50)}...
        </span>
      </CardContent>
    </Card>
  )
}

export default SingleTask

