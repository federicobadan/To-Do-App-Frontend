import './edit.css';
import {useState, useEffect, useRef} from 'react';
import useHandleKey from '../../custom hooks/useHandleKey';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'


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
            <div className="edit">
                <input ref={ref} name="myInput" defaultValue={currentTask} onChange={onChange} />
                <div className="edit-btn">
                    <button onClick={onConfirmEdit}><FontAwesomeIcon icon={icon({name: 'right-long'})} /></button>
                    <button onClick={() => changeOnEdit()}><FontAwesomeIcon icon={icon({name: 'X'})} /></button>
                </div>
                
               
            </div>
        </>
    )
};

