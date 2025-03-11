"use client"

import type React from "react"

import type { RootState } from "@/redux/store"
import SingleBoard from "./SingleBoard"
import type { Task } from "@/tasks"
import { useState, useRef, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateTask } from "@/redux/TasksSlice"
import { useAppContext } from "@/context/AppContext"

export type Board = {
  name: string
  createdAt: Date
  tasks: Task[]
}

const statusMap: Record<string, string> = {
  "To Do": "todo",
  "In Progress": "inprogress",
  "Peer Review": "peerreview",
  Completed: "done",
}

const ProjectAreaTaskBoard = () => {
  const dispatch = useDispatch()
  const { tasks } = useSelector((state: RootState) => state.tasks)
  const { searchQuery } = useAppContext()

  const [currentHoveringOver, setCurrentHoveringOver] = useState<string | null>(null)
  const [draggingTask, setDraggingTask] = useState<string | null>(null)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchStartY, setTouchStartY] = useState<number | null>(null)
  const [dragPosition, setDragPosition] = useState<{ x: number; y: number } | null>(null)
  const boardRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const taskRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const dragTaskRef = useRef<HTMLDivElement | null>(null)

  // Filter logic: searchQuery agar set hai toh sirf wahi task dikhana
  const filteredTasks = searchQuery ? tasks.filter((task) => task.id === searchQuery) : tasks

  const boards: Board[] = [
    { name: "To Do", createdAt: new Date(), tasks: filteredTasks.filter((task) => task.status === "todo") },
    { name: "In Progress", createdAt: new Date(), tasks: filteredTasks.filter((task) => task.status === "inprogress") },
    { name: "Peer Review", createdAt: new Date(), tasks: filteredTasks.filter((task) => task.status === "peerreview") },
    { name: "Completed", createdAt: new Date(), tasks: filteredTasks.filter((task) => task.status === "done") },
  ]

  // Handle desktop drag and drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, boardName: string) => {
    e.preventDefault()
    setCurrentHoveringOver(null)

    const id = e.dataTransfer.getData("id")
    moveTaskToBoard(id, boardName)
  }

  // Handle touch events for mobile
  const handleTouchStart = (taskId: string, e: React.TouchEvent) => {
    if (e.touches[0]) {
      const touch = e.touches[0]
      setDraggingTask(taskId)
      setTouchStartX(touch.clientX)
      setTouchStartY(touch.clientY)

      // Store initial position for the floating preview
      setDragPosition({
        x: touch.clientX,
        y: touch.clientY,
      })

      // Create a clone of the task element for visual feedback
      const taskElement = taskRefs.current[taskId]
      if (taskElement) {
        const clone = taskElement.cloneNode(true) as HTMLDivElement
        clone.style.position = "fixed"
        clone.style.left = `${touch.clientX - 50}px`
        clone.style.top = `${touch.clientY - 30}px`
        clone.style.width = `${taskElement.offsetWidth}px`
        clone.style.zIndex = "9999"
        clone.style.opacity = "0.8"
        clone.style.pointerEvents = "none"
        clone.style.transform = "scale(0.9)"
        clone.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)"

        // Remove any existing clone
        if (dragTaskRef.current && dragTaskRef.current.parentNode) {
          dragTaskRef.current.parentNode.removeChild(dragTaskRef.current)
        }

        document.body.appendChild(clone)
        dragTaskRef.current = clone
      }
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!draggingTask || touchStartX === null || touchStartY === null) return

    // Prevent default to stop scrolling while dragging
    e.preventDefault()

    const touch = e.touches[0]
    const currentX = touch.clientX
    const currentY = touch.clientY

    // Update the position of the floating preview
    if (dragTaskRef.current) {
      dragTaskRef.current.style.left = `${currentX - 50}px`
      dragTaskRef.current.style.top = `${currentY - 30}px`
    }

    setDragPosition({
      x: currentX,
      y: currentY,
    })

    // Find which board we're hovering over
    let foundBoard = false
    for (const [boardName, boardRef] of Object.entries(boardRefs.current)) {
      if (boardRef) {
        const rect = boardRef.getBoundingClientRect()
        if (currentX >= rect.left && currentX <= rect.right && currentY >= rect.top && currentY <= rect.bottom) {
          setCurrentHoveringOver(boardName)
          foundBoard = true
          break
        }
      }
    }

    if (!foundBoard) {
      setCurrentHoveringOver(null)
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    // Remove the floating preview
    if (dragTaskRef.current && dragTaskRef.current.parentNode) {
      dragTaskRef.current.parentNode.removeChild(dragTaskRef.current)
      dragTaskRef.current = null
    }

    if (draggingTask && currentHoveringOver) {
      moveTaskToBoard(draggingTask, currentHoveringOver)
    }

    // Reset states
    setDraggingTask(null)
    setCurrentHoveringOver(null)
    setTouchStartX(null)
    setTouchStartY(null)
    setDragPosition(null)
  }

  // Common function to move a task to a board
  const moveTaskToBoard = (taskId: string, boardName: string) => {
    const task = tasks.find((task) => task.id === taskId)

    if (task && statusMap[boardName] !== task.status) {
      const updatedTask = { ...task, status: statusMap[boardName] }
      console.log("Task moved:", updatedTask)
      dispatch(updateTask(updatedTask))
    }
  }

  // Clean up touch events when component unmounts
  useEffect(() => {
    return () => {
      if (dragTaskRef.current && dragTaskRef.current.parentNode) {
        dragTaskRef.current.parentNode.removeChild(dragTaskRef.current)
      }
      setDraggingTask(null)
      setCurrentHoveringOver(null)
      setTouchStartX(null)
      setTouchStartY(null)
      setDragPosition(null)
    }
  }, [])

  return (
    <div
      className="h-full rounded-2xl w-full grid max-md:grid-cols-2 grid-cols-4 mt-4 gap-3"
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {boards.map((board, index) => (
        <div
          key={index}
          ref={(el) => {
            boardRefs.current[board.name] = el;
          }}
          
          onDrop={(e) => handleDrop(e, board.name)}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => setCurrentHoveringOver(board.name)}
          className={`h-screen max-md:h-[50vh] p-2 border rounded-lg transition-colors duration-200 ${
            currentHoveringOver === board.name ? "bg-gray-200 dark:bg-gray-800" : ""
          }`}
        >
          <SingleBoard
            board={board}
            onTouchStart={handleTouchStart}
            setTaskRef={(taskId, ref) => (taskRefs.current[taskId] = ref)}
          />
        </div>
      ))}
    </div>
  )
}

export default ProjectAreaTaskBoard

