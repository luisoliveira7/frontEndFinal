import { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Layout() {
    const { user, logout } = useContext(AuthContext);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
                <span className="navbar-brand">Controle de Despesas</span>
                <div className="collapse navbar-collapse">
                    <div className="navbar-nav me-auto">
                        <Link className="nav-link text-white" to="/">Dashboard</Link>
                        <Link className="nav-link text-white" to="/categorias">Categorias</Link>
                        <Link className="nav-link text-white" to="/despesas">Despesas</Link>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <span className="text-white">{user && user.email}</span>
                        <button className="btn btn-outline-light btn-sm" onClick={logout}>Sair</button>
                    </div>
                </div>
            </nav>
            <main className="container mt-4">
                <Outlet />
            </main>
        </div>
    );
}