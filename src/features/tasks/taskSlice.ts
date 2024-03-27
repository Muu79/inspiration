import { createSlice } from "@reduxjs/toolkit";

export interface TaskType{
    id: string,
    description: string,
    completed: boolean,
}
export interface TaskState{
    tasks: TaskType[];
}

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {tasks: []} as TaskState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },
        removeTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },
        toggleTask: (state, action) => {
            state.tasks = state.tasks.map(task => task.id === action.payload ? {...task, completed: !task.completed} : task);
        }
    }
});

export const { addTask, removeTask, toggleTask } = taskSlice.actions;
export const selectTasks = (state: { tasks: TaskState }) => state.tasks.tasks;
export default taskSlice.reducer;