import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useContactos } from "../context/ContactosContext";

const CATS = [
{ value: "amigos", label: "Amigos" },
{ value: "familia", label: "Familia" },
{ value: "trabajo", label: "Trabajo" },
];

export default function Formulario() {
const { id } = useParams();
const navigate = useNavigate();
const { porId, agregar, editar } = useContactos();

const isEdit = Boolean(id);
const contacto = isEdit ? porId(id) : null;

const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
    nombre: "",
    telefono: "",
    email: "",
    categoria: "amigos",
    notas: "",
    }
});

useEffect(() => {
    if (isEdit && contacto) {
    reset(contacto);
    }
}, [isEdit, contacto, reset]);

const onSubmit = async (data) => {
    if (isEdit && contacto) {
    editar(contacto.id, data);
    navigate(`/contacto/${contacto.id}`);
    } else {
    const newId = await agregar(data);
    navigate(`/contacto/${newId}`);
    }
};

return (
    <section className="form-section">
    <h2>{isEdit ? "Editar contacto" : "Nuevo contacto"}</h2>

    <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="field">
        <label>Nombre *</label>
        <input
            type="text"
            {...register("nombre", { required: "El nombre es obligatorio", minLength: { value: 3, message: "Mínimo 3 caracteres" } })}
            placeholder="Juan Pérez"
        />
        {errors.nombre && <span className="error">{errors.nombre.message}</span>}
        </div>

        <div className="field">
        <label>Teléfono *</label>
        <input
            type="tel"
            {...register("telefono", { required: "El teléfono es obligatorio" })}
            placeholder="387-555-1234"
        />
        {errors.telefono && <span className="error">{errors.telefono.message}</span>}
        </div>

        <div className="field">
        <label>Email *</label>
        <input
            type="email"
            {...register("email", { required: "El email es obligatorio", pattern: { value: /\S+@\S+\.\S+/, message: "Email inválido" } })}
            placeholder="correo@ejemplo.com"
        />
        {errors.email && <span className="error">{errors.email.message}</span>}
        </div>

        <div className="field">
        <label>Categoría *</label>
        <select {...register("categoria", { required: true })}>
            {CATS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
        </div>

        <div className="field">
        <label>Notas</label>
        <textarea rows={3} {...register("notas")} placeholder="Información adicional..." />
        </div>

        <div className="actions-row">
        <button type="submit" className="btn" disabled={isSubmitting}>
            {isEdit ? "Guardar cambios" : "Crear contacto"}
        </button>
        <button type="button" className="btn outline" onClick={() => navigate(-1)}>Cancelar</button>
        </div>
    </form>
    </section>
);
}
