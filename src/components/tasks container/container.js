import './container.css';
import Tasks from '../tasks/tasks';
import Submit from '../tasks submit/submit';
import { useState, useEffect } from 'react';
// import axios from 'axios';
// import xtype from 'xtypejs';
import db from '../../db.json'
    

export default function Container() {
    
    const [tasks, setTasks] = useState();
    const [error, setError] = useState();
    const getTasks = async () => {
        let response = [];
        try{
            response = db;
        }
        catch (error) {
            console.error(error.toJSON());
            setError(error.toJSON());
        }
        finally {
            setTasks(response);
            console.log(response)
        }
    };

    useEffect(() => {
        getTasks();
    }, []); 

    // const updateCompleted = async (id, completed) => {
    //     let response = null;
    //     try{
    //         response = await axios.patch(`http://localhost:3001/task/${id}`, { completed: !completed });
    //     }
    //     catch (error) {
    //         console.error(error);
    //     }
    //     finally {
    //         console.log(response)
    //     }
    // };

    const updateCompleted = (id, completed) => {
        const newTasks = [];
        
        tasks.map( (task) => {
            if (task.id===id) task.completed= !task.completed;
            newTasks.push(task)
        });
        setTasks(newTasks);

    };
    const deleteTask = (id) => {
        const newTasks = [];
        
        tasks.map( (task) => {
            if (task.id!==id) newTasks.push(task);
        });
        setTasks(newTasks);
    }
    const addTask = (task) => {
        const newTasks = [];
        tasks.map( (task) => {
            newTasks.push(task);
        });
        newTasks.push(task);
        setTasks(newTasks);
    }

    return (
        <>
            {error ? 
            <>
                <p>Aplicación fuera de servicio</p>
                <p>Código: {error.code}</p>
            </>: null}
            {tasks ? 
            <>
                <div className="title">
                    <h1>To do App</h1>
                </div>
                <div className='container'>
                    <Submit addTask={addTask} lastId={tasks.slice(-1)[0].id}  />
                    <div className="container-tasks">
                        
                        {tasks.map( (task) => (
                            <Tasks key={task.id} task={task} toggleCompleted={updateCompleted} deleteTask={deleteTask} />
                            )
                        )}

                    </div>
                </div>
            </>: null}
        </>
    )
};