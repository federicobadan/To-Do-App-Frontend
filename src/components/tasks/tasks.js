import './tasks.css';
import {useState} from 'react';
import Submit from "../tasks submit/submit";
// import { useEffect } from 'react';
// import axios from 'axios';

export default function Tasks({task, toggleCompleted, deleteTask, editTask}) {

    const [isEditing, setIsEditing] = useState(false);
    let completed = task.completed;

    // const updateCompleted = async () => {
    //     let response = null;
    //     try{
    //         response = await axios.patch(`http://localhost:3001/task/${task.id}`, { completed: task.completed });
    //     }
    //     catch (error) {
    //         console.error(error);
    //     }
    //     finally {
    //         setCompleted(!completed);
    //         console.log(response)
    //     }
    // };

    const handleCheckbox = () => {
        toggleCompleted(task.id);
    }

    const deleteComponent = (id) => {
        deleteTask(id);
    }
    // const deleteComponent = async () => {
    //     let response=null;
    //     try{
    //      response = await axios.delete(`http://localhost:3001/task/${id}`)
    //     }
    //     catch (error) {
    //         console.error(error);
    //     }
    //     finally {
    //         console.log(response.data)
    //     }
    // }

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
