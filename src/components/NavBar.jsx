import { NavLink, useLocation, useNavigate } from "react-router-dom";

export default function NavBar() {
const location = useLocation();
const navigate = useNavigate();

return (
    <header className="navbar">
    <div className="brand" onClick={() => navigate("/")}>Directorio</div>
    <nav className="links">
        <NavLink to="/" end className={({isActive}) => isActive ? "active" : ""}>Inicio</NavLink>
        <NavLink to="/?categoria=amigos" className={({isActive}) => (isActive || location.search.includes("categoria=amigos")) ? "active" : ""}>Amigos</NavLink>
        <NavLink to="/?categoria=familia" className={({isActive}) => (isActive || location.search.includes("categoria=familia")) ? "active" : ""}>Familia</NavLink>
        <NavLink to="/?categoria=trabajo" className={({isActive}) => (isActive || location.search.includes("categoria=trabajo")) ? "active" : ""}>Trabajo</NavLink>
        <NavLink to="/formulario" className={({isActive}) => isActive ? "active" : ""}>Nuevo</NavLink>
    </nav>
    </header>
);
}
