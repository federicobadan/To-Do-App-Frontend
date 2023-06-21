import './container.css';
import Tasks from '../tasks/tasks.js';
import Submit from '../tasks submit/submit.js'

export default function Container() {

    return (
        <>
            <div className="title">
                <h1>To do App</h1>
            </div>
            <div className='container'>
                <Submit />
                <Tasks />
                <Tasks />
                <Tasks />
            </div>
        </>
    )

};