import './tasks.css';
export default function Tasks() {
    return (
        <>
            <div className="tasks">
                <div className="div-checkbox">
                    <input type="checkbox" name="myCheckbox" />
                </div>

                <div className="div-task">
                    <p>Tarea1</p>
                </div>

                <div className="div-buttons">
                    <button>Editar</button>
                    <button>Borrar</button>
                </div>
            </div>
        </>
    )
};