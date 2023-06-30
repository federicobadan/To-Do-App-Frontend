import './submit.css';
import {useState, useEffect, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'


export default function Submit({addTask}) {
    const ref = useRef(null);
    const [task, setTask] = useState('');
    const onChange = (event) =>{
        setTask(event.target.value)
    }
    const onAddTask = (task) => {
        if(task.length!==0){
            addTask({task: task});
        }
        setTask('');
    }

    useEffect(() => {
        const element = ref.current;
        const handleEnter = (event) => {
            if(event.key==='Enter'){
                event.preventDefault();
                if(task.length!==0){
                    onAddTask(task);
                }
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
                <button onClick={() => onAddTask(task)}><FontAwesomeIcon icon={icon({name: 'right-long'})} /></button>
            </div>
        </>
    )
};

