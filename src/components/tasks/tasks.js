import './tasks.css';
import {useState} from 'react';
import Submit from "../tasks submit/submit";
// import { useEffect } from 'react';
// import axios from 'axios';


export default function Tasks({task, toggleCompleted, deleteTask, editTask}) {

    const [isEditing, setIsEditing] = useState(false);
    let completed = task.flag;

    const handleCheckbox = () => {
        toggleCompleted(task.id, completed);
    }

    const deleteComponent = (id) => {
        deleteTask(id);
    }


    const handleOnEditing = () => {
        setIsEditing(!isEditing);
    }

    return (
        <>
            {isEditing ?
                <Submit editTask={editTask} currentId={task.id} isEditing={isEditing} changeOnEdit={handleOnEditing}/>
                :
                <div className="tasks">

                    <div className="div-checkbox">
                        <input type="checkbox" name="myCheckbox" defaultChecked={completed} onClick={handleCheckbox}/>
                    </div>

                    <div className="div-task">
                        <p>{task.task}</p>
                    </div>

                    <div className="div-buttons">
                        <button onClick={handleOnEditing}>Editar</button>
                        <button onClick={() => deleteComponent(task.id)}>Borrar</button>
                    </div>
                </div>}
        </>
    )
};
