import './submit.css';
export default function Submit() {
    return (
        <>
            <div className="submit">
                <div className="submit-label">
                    <label>¿Qué tarea deseas agregar?</label>
                </div>
                <div className="submit-input">
                    <input name="myInput" />
                    <button>Enviar</button>
                </div>
            </div>
        </>
    )
};