import { useState } from 'react';
import './ToDo.css';

export default function ToDo() {
    const [taskInput, setInput] = useState('');
    return (<>
        <div id='task-header'>
            <h1>Task Tracker</h1>
            <div>
                <label htmlFor="task-input">Add Task:</label>
                <input id='task-input' value={taskInput} onChange={(e)=>setInput(e.target.value)}></input>
            </div>
        </div>
        <div id='task-body'>
            
        </div>
    </>
    )
}