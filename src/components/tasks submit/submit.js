import './submit.css';
import {useState, useEffect, useRef} from 'react';


export default function Submit({addTask, lastId, editTask, currentId, isEditing, changeOnEdit}) {
    const ref = useRef(null);
    const [task, setTask] = useState('');
    const [count, setCount] = useState(lastId)
    
    const onChange = (event) =>{
        setTask(event.target.value)
    }
    const onAddTask = (task) => {
        addTask({task: task, id:count+1});
        setTask('');
        setCount(count+1)
    }

    const onEditTask = () => {
        editTask(currentId, task)
        changeOnEdit()
    }

    useEffect(() => {
        const element = ref.current;
        const handleEnter = (event) => {
            if(event.key==='Enter'){
                event.preventDefault();
                isEditing ? onEditTask() : onAddTask(task);
            }
        }
        element.addEventListener('keypress', handleEnter);
        return () => {
            element.removeEventListener('keypress', handleEnter);
          };
      }, [task]);


    return (
        <>
            <div className="submit-input">
                <input ref={ref} name="myInput" value={task} onChange={onChange} />
                <button onClick={isEditing ? () => onEditTask() : () => onAddTask(task)}>{isEditing ? "Editar" : "Enviar"}</button>
            </div>
        </>
    )
};
