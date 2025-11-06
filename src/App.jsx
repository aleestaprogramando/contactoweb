import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Index from "./pages/Index";
import ContactoDetalle from "./pages/ContactoDetalle";
import Formulario from "./pages/Formulario";

export default function App() {
return (
    <div className="app">
    <NavBar />
    <main className="container">
        <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/contacto/:id" element={<ContactoDetalle />} />
        <Route path="/formulario" element={<Formulario />} />
        <Route path="/formulario/:id" element={<Formulario />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </main>
    </div>
);
}
