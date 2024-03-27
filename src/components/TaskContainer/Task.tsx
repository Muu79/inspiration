import { useAppDispatch } from "../../app/hooks";
import { toggleTask, TaskType, removeTask } from "../../features/tasks/taskSlice";
import { IoIosClose } from "react-icons/io";
export default function Task({ task }: { task: TaskType }) {
    const dispatch = useAppDispatch();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleTask(task.id));
    }

    return (
        <div className="task-wrapper">
            <p>{task.description}</p><input className='check-box' type='checkbox' checked={task.completed} onChange={handleChange}></input>
            <IoIosClose onClick={() => dispatch(removeTask(task.id))} className="close-icon" />
        </div>
    )
}