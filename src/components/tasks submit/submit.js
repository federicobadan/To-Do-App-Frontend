import './submit.css';
import {useState, useEffect, useRef} from 'react';


export default function Submit({addTask, lastId}) {
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

    useEffect(() => {
        const element = ref.current;
        const handleEnter = (event) => {
            console.log(ref)
            if(event.key==='Enter'){
                event.preventDefault();
                onAddTask(task)
            }
        }
        element.addEventListener('keypress', handleEnter);
        return () => {
            element.removeEventListener('click', handleEnter);
          };
      }, []);

    return (
        <>
            <div className="submit">
                <div className="submit-label">
                    <label>¿Qué tarea deseas agregar?</label>
                </div>
                <div className="submit-input">
                    <input ref={ref} name="myInput" value={task} onChange={onChange} />
                    <button onClick={() => onAddTask(task)}>Enviar</button>
                </div>
            </div>
        </>
    )
};