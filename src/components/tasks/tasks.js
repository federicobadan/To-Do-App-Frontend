import './tasks.css';
// import { useState} from 'react';
// import { useEffect } from 'react';
// import axios from 'axios';

export default function Tasks({task, toggleCompleted, deleteTask}) {

    // const [completed, setCompleted] = useState(flag);
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

    const  handleCheckbox = () => {
        toggleCompleted(task.id);
    }


    const editTask = () => {

    }


    const  deleteComponent = (id) => {
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



    return (
        <>
            <div className="tasks">

                <div className="div-checkbox">
                    <input type="checkbox" name="myCheckbox" defaultChecked={completed} onClick={handleCheckbox} />
                </div>

                <div className="div-task">
                    <p>{task.task}</p>
                </div>

                <div className="div-buttons">
                    <button onClick={editTask()}>Editar</button>
                    <button onClick={() => deleteComponent(task.id)}>Borrar</button>
                </div>
            </div>
        </>
    )
};