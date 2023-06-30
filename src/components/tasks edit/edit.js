import './edit.css';
import {useState, useEffect, useRef} from 'react';
import useHandleKey from '../../custom hooks/useHandleKey';


export default function Edit({currentId, editTask, changeOnEdit, currentTask}) {

    const ref = useRef(null);
    const [task, setTask] = useState('');

    const onChange = (event) =>{
        setTask(event.target.value)
    }

    const onConfirmEdit = () => {
        if (currentTask !== task){
            editTask(currentId, task);
        }
        changeOnEdit();
    }

    useEffect (()=> {
        setTask(currentTask);
    }, [])

    useHandleKey('Enter', 'keypress', [task], () => onConfirmEdit(), ref);
    useHandleKey('Escape', 'keydown', [], () => changeOnEdit(), ref);

    return (
        <>
            <div className="submit-input">
                <input ref={ref} name="myInput" defaultValue={currentTask} onChange={onChange} />
                <button onClick={onConfirmEdit}>Editar</button>
                <button onClick={() => changeOnEdit()}>Cancelar</button>
            </div>
        </>
    )
};

