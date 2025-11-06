import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useContactos } from "../context/ContactosContext";
import ContactCard from "../components/ContactCard";

export default function Index() {
const { filtrarPorCategoria, eliminar, todos } = useContactos();
const [params] = useSearchParams();
const categoria = params.get("categoria");

const data = useMemo(() => {
    return categoria ? filtrarPorCategoria(categoria) : todos();
}, [categoria, filtrarPorCategoria, todos]);

return (
    <section>
    <header className="section-head">
        <h2>Contactos {categoria ? `— ${categoria}` : ""}</h2>
    </header>

    {data.length === 0 ? (
        <p className="muted">No hay contactos en esta categoría.</p>
    ) : (
        <div className="grid">
        {data.map(c => (
            <ContactCard key={c.id} c={c} onDelete={eliminar} />
        ))}
        </div>
    )}
    </section>
);
}
