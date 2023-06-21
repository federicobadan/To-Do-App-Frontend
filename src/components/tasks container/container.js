import './container.css';
import Tasks from '../tasks/tasks.js';
import Submit from '../tasks submit/submit.js';
import { useState } from 'react';
import { useEffect } from 'react';

const axios = require('axios');

export default function Container() {
    
    const [tasks, setTasks] = useState([]);
    const getTasks = async () => {
        const response = [];
        try{
            response = await axios.get('/tasks');
        }
        catch (error) {
            console.error(error);
        }
        finally {
            console.log(response)
            setTasks(response);
        }
    };

    useEffect(() => {
        getTasks();
      }, [tasks]);

    return (
        <>
            <div className="title">
                <h1>To do App</h1>
            </div>
            <div className='container'>
                <Submit />
                <div className="container-tasks">
                    <Tasks />
                    <Tasks />
                    <Tasks />
                </div>
            </div>
        </>
    )

};