import './tasks.css';
//import { useState} from 'react';
//import { useEffect } from 'react';
import axios from 'axios';

export default function Tasks({id, flag, task, created}) {

    //const [completed, setCompleted] = useState(flag);
    let completed = flag;
    
    const updateCompleted = async () => {
        let response = null;
        try{
            response = await axios.patch(`http://localhost:3001/task/${id}`, { flag: completed });
        }
        catch (error) {
            console.error(error);
        }
        finally {
            console.log(response.data)
        }
    };

    const  handleCheckbox = () => {
        //setCompleted(!completed);
        completed = !completed;
        updateCompleted();
    }

    // useEffect(() => {
    //     updateCompleted();
    //     console.log(`useEffect update`)
    //   }, [completed]);

    const editTask = () => {

    }


    const deleteTask = () => {
        created = [];
    }
    // const deleteComponent = async () => {
    //     let response=null;
    //     try{
    //      response = await axios.delete(`http://localhost:3001/task/${id}`)
    //     }
    //     catch (error) {
    //         console.error(error);
    //     }
    // }
    // useEffect(() => {
    //     deleteComponent();
    //   }, [created]);

    return (
        <>
            <div className="tasks">

                <div className="div-checkbox">
                    <input type="checkbox" name="myCheckbox" defaultChecked={completed} onClick={handleCheckbox} />
                </div>

                <div className="div-task">
                    <p>{task}</p>
                </div>

                <div className="div-buttons">
                    <button onClick={editTask()}>Editar</button>
                    <button onClick={deleteTask()}>Borrar</button>
                </div>
            </div>
        </>
    )
};