import { Card } from "./ui/card";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import TaskStatus from "./TaskStatus";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Task } from "@/tasks";

const RightSideBar = () => {
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const completedTasks = tasks.filter((task: Task) => task.status === "done");

  // ✅ Completion Rate Calculation
  const completionRate = tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0;

  return (
    <div>
      <div className="m-3 font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-br from-[#5bff5b] to-[#bc11ab]">
        Total Tasks Report
      </div>
      <Card className="shadow-none flex gap-4 items-center justify-between w-full p-6 rounded-3xl">
        <div className="flex w-64 max-lg:w-44 max-sm:w-36 gap-6">
          <CircularProgressbar
            value={completionRate} // ✅ Percentage Pass Karo
            text={`${Math.round(completionRate)}%`} // ✅ Text me Percentage Dikhana
          />
        </div>
        <TaskStatus />
      </Card>
    </div>
  );
};

export default RightSideBar;
