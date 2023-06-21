import './container.css';
import Tasks from '../tasks/tasks.js';
import Submit from '../tasks submit/submit.js';
import { useState } from 'react';
import { useEffect } from 'react';
import axios, * as others from 'axios';

export default function Container() {
    
    const [tasks, setTasks] = useState([]);
    const getTasks = async () => {
        let response = null;
        try{
            response = await axios.get('http://localhost:3001/tasks');
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setTasks(response.data);
        }
    };

    useEffect(() => {
        getTasks();
      }, []);

    return (
        <>
            <div className="title">
                <h1>To do App</h1>
            </div>
            <div className='container'>
                <Submit />
                <div className="container-tasks">
                    
                    {tasks.map( (x) => (
                        
                        <Tasks key={x.id} complete={x.complete} task={x.task} created={x.created_date} />
                    )
                    )}
                </div>
            </div>
        </>
    )

};