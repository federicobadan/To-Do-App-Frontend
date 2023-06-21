import './tasks.css';
export default function Tasks({complete, task, created}) {
    return (
        <>
            <div className="tasks">
                <div className="div-checkbox">
                    <input type="checkbox" name="myCheckbox" defaultChecked={complete} />
                </div>

                <div className="div-task">
                    <p>{task}</p>
                </div>

                <div className="div-buttons">
                    <button>Editar</button>
                    <button>Borrar</button>
                </div>
            </div>
        </>
    )
};