import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';
import Dashboard from './pages/Dashboard/Dashboard';
import Categorias from './pages/Categorias/Categorias';
import Despesas from './pages/Despesas/Despesas';
import PrivateRoute from './routes/PrivateRoute';
import Layout from './components/Layout';

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/" element={
                <PrivateRoute>
                    <Layout />
                </PrivateRoute>
            }>
                <Route index element={<Dashboard />} />
                <Route path="categorias" element={<Categorias />} />
                <Route path="despesas" element={<Despesas />} />
            </Route>
        </Routes>
    );
}

export default App;