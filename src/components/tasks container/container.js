import './container.css';
import Tasks from '../tasks/tasks';
import Submit from '../tasks submit/submit';
import { useState, useEffect } from 'react';
import axios from 'axios';
import xtype from 'xtypejs';
    

export default function Container() {
    
    // const [tasks, setTasks] = useState();
    // const [error, setError] = useState();
    // const getTasks = async () => {
    //     let response = [];
    //     try{
    //         response = await axios.get('http://localhost:3001/tasks');
    //     }
    //     catch (error) {
    //         console.error(error.toJSON());
    //         setError(error.toJSON());
    //     }
    //     finally {
    //         setTasks(response.data);
    //     }
    // };

    // useEffect(() => {
    //     getTasks();
    // }, []); 
    console.log()
    // const tasks = useFetch ({url:'http://localhost:3001/tasks'});
    const [data, setData] = useState();
    const getData = (options) => {
        useEffect (()=>{
            fetch(options.url)
            .then((response) => response.json)
            .then((json)=>setData(json))
        }, []);
        return {
            data,
        };
    }
    const tasks = getData({url:'http://localhost:3001/tasks'});
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
                    <Submit />
                    <div className="container-tasks">
                        
                        {tasks.map( (x) => (
                            <Tasks key={x.id} id={x.id} flag={x.flag} task={x.task} created={x.created_date} />
                            )
                        )}

                    </div>
                </div>
            </>: null}
        </>
    )
};