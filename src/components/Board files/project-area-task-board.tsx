import { RootState } from "@/redux/store";
import SingleBoard from "./SingleBoard";
import { Task } from "@/tasks";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTask } from "@/redux/TasksSlice"; // ✅ Redux Task Update Action
import { useAppContext } from "@/context/AppContext";

export type Board = {
  name: string;
  createdAt: Date;
  tasks: Task[];
};

const statusMap: Record<string, string> = {
  "To Do": "todo",
  "In Progress": "inprogress",
  "Peer Review": "peerreview", // ✅ Added Peer Review Status
  "Completed": "done",
};

const ProjectAreaTaskBoard = () => {








  const dispatch = useDispatch();

  // ✅ Redux se tasks aur searchQuery la rahe hain
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const { searchQuery } = useAppContext();
  console.log("got value searchquery", searchQuery);

  const [currentHoveringOver, setCurrentHoveringOver] = useState<string | null>(null);

  // ✅ Filter logic: searchQuery agar set hai toh sirf wahi task dikhana
  const filteredTasks = searchQuery
    ? tasks.filter((task) => task.id === searchQuery)
    : tasks;

  console.log(filteredTasks);

  const boards: Board[] = [
    { name: "To Do", createdAt: new Date(), tasks: filteredTasks.filter((task) => task.status === "todo") },
    { name: "In Progress", createdAt: new Date(), tasks: filteredTasks.filter((task) => task.status === "inprogress") },
    { name: "Peer Review", createdAt: new Date(), tasks: filteredTasks.filter((task) => task.status === "peerreview") }, // ✅ New Section
    { name: "Completed", createdAt: new Date(), tasks: filteredTasks.filter((task) => task.status === "done") },
  ];

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, boardName: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setCurrentHoveringOver(null);

    const id = e.dataTransfer.getData("id");
    const task = tasks.find((task) => task.id === id);

    if (task) {
      const updatedTask = { ...task, status: statusMap[boardName] };
      console.log("Task moved:", updatedTask);

      // ✅ Redux me task update karna
      dispatch(updateTask(updatedTask));
    }
  };


 

  return (
    <div className="h-full rounded-2xl w-full  grid max-md:grid-cols-2 grid-cols-4 mt-4 gap-3">
      {boards.map((board, index) => (
        <div
          key={index}
          onDrop={(e) => {
            alert("ondrop")
            handleDrop(e, board.name)
          }}
          onDragOver={(e) => {
            alert("ondragover")
            e.preventDefault()
          }} // Allow drop
          onDragEnter={() => {
            alert("ondragenter")
            setCurrentHoveringOver(board.name)
            
          }}
          style={{ touchAction: "none" }}
          
          className={`h-screen max-md:h-[50vh] p-2 border  rounded-lg  ${
            currentHoveringOver === board.name ? "bg-gray-200 dark:bg-gray-800" : ""
          }`}
        >
          <SingleBoard board={board} />
        </div>
      ))}
    </div>
  );
};


export default ProjectAreaTaskBoard;
