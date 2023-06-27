import './container.css';
import Tasks from '../tasks/tasks';
import Submit from '../tasks submit/submit';
import { useState, useEffect } from 'react';
import axios from 'axios';
// import xtype from 'xtypejs';
    

export default function Container() {
    let isMounted = false;
    const [tasks, setTasks] = useState();
    const [error, setError] = useState();
    const getTasks = async () => {
        let response = [];
        try{
            response = await axios.get(`http://localhost:3001/tasks`);
        }
        catch (error) {
            console.error(error.toJSON());
            setError(error.toJSON());
        }
        finally {
            response.data.sort(function(a, b){return b.id - a.id});
            setTasks(response.data);
            console.log(response.data)
        }
    };

    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        axios
        .get(`http://localhost:3001/tasks`, {
          cancelToken: source.token
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log('successfully aborted');
          } else {
            // handle error
          }
        });
        if (isMounted ===false){
            getTasks();
        }
        isMounted = true;
        return () => {
            // cancel the request before component unmounts
            source.cancel();
            isMounted = true;
          };
    }, []); 


    const updateCompleted = async (id, flag) => {
        const newTasks = [];
        let response = null;
        try{
            response = await axios.patch(`http://localhost:3001/task/${id}`, { flag: !flag, info:'flag'});
        }
        catch (error) {
            console.error(error);
        }
        finally {
            tasks.map( (task) => {
                if (task.id===id) task.flag= !task.flag;
                newTasks.push(task)
            });
            setTasks(newTasks);
            console.log(response.data)
        }
    };
    const deleteTask = async (id) => {
        let response=null;
        try{
         response = await axios.delete(`http://localhost:3001/task/${id}`)
        }
        catch (error) {
            console.error(error);
        }
        finally {
            const newTasks = [];
            tasks.map( (task) => {
                if (task.id!==id) newTasks.push(task);
            });
            setTasks(newTasks);
        }
    }

    const addTask = async (task, id) => {
        let response=null;
        try{
         response = await axios.post(`http://localhost:3001/task/${id}`, {task:`${task.task}`})
        }
        catch (error) {
            console.error(error);
        }
        finally {
            const newTasks = [];
            tasks.map( (task) => {
                newTasks.push(task);
            });
            newTasks.push(task);
            setTasks(newTasks);
        }
    }

    const editTask = async (id, newTask) => {
        let response=null;
        try{
         response = await axios.patch(`http://localhost:3001/task/${id}`, {task:`${newTask}`, info:'task'})
        }
        catch (error) {
            console.error(error);
        }
        finally {
            const newTasks = [];
            tasks.map( (task) => {
                if (task.id===id) task.task = newTask;
                newTasks.push(task)
            });
            setTasks(newTasks);
            console.log(response.data)
        }
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
                <div className="submit">
                    <div className="submit-label">
                        <label>¿Qué tarea deseas agregar?</label>
                    </div>
                    <Submit addTask={addTask} lastId={tasks.slice(0)[0].id}  />
                </div>
                <div className="container-tasks">
                    {tasks.map( (task) => (
                        <Tasks key={task.id} task={task} toggleCompleted={updateCompleted} deleteTask={deleteTask} editTask={editTask} />
                        )
                    )}
                </div>
            </div>
        </>: null}
    </>
    )
};
