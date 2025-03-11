import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "@/tasks";

// ✅ Correct: Initial state ka type define kar diya
interface TasksState {
    tasks: Task[];
    searchQuery:string;
}

const initialState: TasksState = {
    tasks: [], // Ab ye `never[]` nahi hoga, balki `Task[]` hoga
     searchQuery:""
};

const tasksSlice = createSlice({
    name: "tasks",
    initialState, // ✅ Yahan direct initialState use kiya
    reducers: {
        setTasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload;
        },  //use settask only when we need to make changes in whole tasks. like override or we want data from other api source 
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload); // ✅ Redux internally immutable update handle karega.use addtask for better performance 
        },
        updateTask: (state, action: PayloadAction<Task>) => {
            state.tasks = state.tasks.map((task) =>
                task.id === action.payload.id ? action.payload : task
            );
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload; // ✅ Ye globally search query store karega
          },
          updateTaskList: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload; // ✅ Full list update
          },
    },
});


export const { setTasks, addTask, updateTask,setSearchQuery,updateTaskList } = tasksSlice.actions;
export default tasksSlice.reducer;
