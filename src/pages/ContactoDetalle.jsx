import { useParams, Link, useNavigate } from "react-router-dom";
import { useContactos } from "../context/ContactosContext";

export default function ContactoDetalle() {
const { id } = useParams();
const navigate = useNavigate();
const { porId, eliminar } = useContactos();
const c = porId(id);

if (!c) return <p className="muted">Contacto no encontrado.</p>;

const handleDelete = () => {
    eliminar(c.id);
    navigate("/");
};

return (
    <section>
    <header className="section-head">
        <h2>{c.nombre}</h2>
        <span className={`pill pill-${c.categoria}`}>{c.categoria}</span>
    </header>

    <div className="detail">
        <p><strong>Teléfono:</strong> {c.telefono}</p>
        <p><strong>Email:</strong> {c.email}</p>
        {c.notas && <p><strong>Notas:</strong> {c.notas}</p>}
    </div>

    <div className="actions-row">
        <Link className="btn" to={`/formulario/${c.id}`}>Editar</Link>
        <button className="btn danger" onClick={handleDelete}>Eliminar</button>
        <Link className="btn outline" to="/">Volver</Link>
    </div>
    </section>
);
}
