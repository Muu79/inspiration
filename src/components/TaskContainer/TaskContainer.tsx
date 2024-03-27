import { useState } from 'react';
import './TaskContainer.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addTask, selectTasks } from '../../features/tasks/taskSlice';
import { FaPlus } from 'react-icons/fa';
import { TaskType } from '../../features/tasks/taskSlice';
import { v4 as uuid } from 'uuid';
import Task from './Task';

export default function ToDo() {
    const tasks = useAppSelector(selectTasks);
    const dispatch = useAppDispatch();
    const [taskInput, setInput] = useState('');


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        if (taskInput === '') return;
        e.preventDefault();
        const task: TaskType = {
            id: uuid(),
            description: taskInput,
            completed: false,
        }
        dispatch(addTask(task));
        setInput('');
    }

    return (<>
        <div id='task-header'>
            <h1>Task Tracker</h1>
            <div>
                <form id='task-form' onSubmit={handleSubmit}>
                    <label htmlFor="task-input">Add Task:</label>
                    <input id='task-input' value={taskInput} onChange={(e) => setInput(e.target.value)}></input>
                    <button type='submit'><FaPlus /></button>
                </form>
            </div>
        </div>
        <div id='task-body'>
            {tasks.map(task => {
                return (
                    <Task key={task.id} task={task} />
                )
            })}
        </div>
    </>
    )
}