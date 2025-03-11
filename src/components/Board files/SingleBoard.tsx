import { Board } from "./project-area-task-board";
import SingleTask from "./SingleTask";

const SingleBoard = ({ board }: { board: Board }) => {
  const { name: boardName, tasks = [] } = board; // Default empty array to avoid errors
  const numberTasks = tasks.length;

  return (
    <div className="w-full overflow-y-auto overflow-x-hidden h-full  p-1 rounded-2xl">
      <div className="flex justify-between p-4 rounded-lg items-center">
        <span className="font-medium max-lg:text-sm text-lg">{boardName}</span>
        <div className="size-6 rounded-full flex items-center justify-center">
          <span className="text-sm mt-[2px]">{numberTasks}</span>
        </div>
      </div>

      <div className="mt-7">
        {
          tasks.length===0 &&(
            <div className="flex flex-col ">
              <span className="text-gray-500 max-md:text-xs">No tasks Added or Not found.....</span>
            </div>
          )
        }
        {tasks.map((task) => (
          <SingleTask key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default SingleBoard;
