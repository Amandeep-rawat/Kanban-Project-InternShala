// src/utils/handleDrop.ts
import { Task } from "@/tasks";
const statusMap: Record<string, string> = {
    "To Do": "todo",
    "In Progress": "inprogress",
    "Peer Review": "peerreview", // ✅ Added Peer Review Status
    "Completed": "done",
  };
export const handleDrop = (
  e: React.DragEvent<HTMLDivElement>,
  boardName: string,
  tasks: Task[],
  setCurrentHoveringOver: (value: string | null) => void,
  dispatch: any,
  updateTaskList: any,
  droppedTaskId?: string
) => {
  e.preventDefault();
  setCurrentHoveringOver(null);

  const draggedTaskId = e.dataTransfer.getData("id");
  if (!draggedTaskId) return;

  const taskIndex = tasks.findIndex((task) => task.id === draggedTaskId);
  const droppedTaskIndex = tasks.findIndex((task) => task.id === droppedTaskId);

  if (taskIndex === -1) return; // Invalid task

  let updatedTasks = [...tasks];
  let draggedTask = updatedTasks.splice(taskIndex, 1)[0];

  // ✅ Agar different column hai to sirf status update karo
  if (droppedTaskId === undefined) {
      draggedTask.status = statusMap[boardName];
      updatedTasks.push(draggedTask);
  } else {
      // ✅ Same column me reorder karna hai
      draggedTask.status = statusMap[boardName];
      updatedTasks.splice(droppedTaskIndex, 0, draggedTask);
  }

  dispatch(updateTaskList(updatedTasks)); // Redux state update
};
