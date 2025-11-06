import { Link } from "react-router-dom";

export default function ContactCard({ c, onDelete }) {
return (
    <article className="card">
    <div className="card-head">
        <h3>{c.nombre}</h3>
        <span className={`pill pill-${c.categoria}`}>{c.categoria}</span>
    </div>
    <p><strong>Tel:</strong> {c.telefono}</p>
    <p><strong>Email:</strong> {c.email}</p>
    {c.notas && <p className="muted">{c.notas}</p>}

    <div className="card-actions">
        <Link className="btn" to={`/contacto/${c.id}`}>Ver</Link>
        <Link className="btn outline" to={`/formulario/${c.id}`}>Editar</Link>
        <button className="btn danger" onClick={() => onDelete(c.id)}>Eliminar</button>
    </div>
    </article>
);
}
