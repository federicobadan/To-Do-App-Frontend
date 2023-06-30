import './submit.css';
import {useState, useEffect, useRef} from 'react';


export default function Submit({addTask}) {
    const ref = useRef(null);
    const [task, setTask] = useState('');
    const onChange = (event) =>{
        setTask(event.target.value)
    }
    const onAddTask = (task) => {
        addTask({task: task});
        setTask('');
    }

    useEffect(() => {
        const element = ref.current;
        const handleEnter = (event) => {
            if(event.key==='Enter'){
                event.preventDefault();
                onAddTask(task);
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
                <button onClick={() => onAddTask(task)}>Enviar</button>
            </div>
        </>
    )
};

