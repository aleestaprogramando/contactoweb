import { createContext, useContext, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { SEED_CONTACTOS } from "../data/seed";
import { v4 as uuid } from "uuid";

const ContactosContext = createContext();

export function ContactosProvider({ children }) {
const [contactos, setContactos] = useLocalStorage("contactos", SEED_CONTACTOS);

const actions = useMemo(() => ({
    agregar: (data) => {
    const nuevo = { id: uuid(), ...data };
    setContactos(prev => [nuevo, ...prev]);
    return nuevo.id;
    },
    editar: (id, data) => {
    setContactos(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
    },
    eliminar: (id) => {
    setContactos(prev => prev.filter(c => c.id !== id));
    },
    porId: (id) => contactos.find(c => c.id === id),
    filtrarPorCategoria: (cat) => cat ? contactos.filter(c => c.categoria === cat) : contactos,
    todos: () => contactos
}), [contactos, setContactos]);

return (
    <ContactosContext.Provider value={actions}>
    {children}
    </ContactosContext.Provider>
);
}

export function useContactos() {
const ctx = useContext(ContactosContext);
if (!ctx) throw new Error("useContactos debe usarse dentro de <ContactosProvider>");
return ctx;
}
