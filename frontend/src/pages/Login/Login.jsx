import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Alerta from '../../components/Alerta';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setErro('');
        setCarregando(true);

        try {
            await login(email, senha);
            navigate('/');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setErro(error.response.data.error);
            } else {
                setErro('Erro ao fazer login');
            }
        } finally {
            setCarregando(false);
        }
    }

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="card shadow-sm p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <form onSubmit={handleSubmit}>
                    <h1 className="h3 text-center mb-4">Login</h1>

                    <Alerta tipo="erro" mensagem={erro} />

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Senha</label>
                        <input
                            type="password"
                            className="form-control"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100" disabled={carregando}>
                        {carregando ? 'Entrando...' : 'Entrar'}
                    </button>

                    <div className="text-center mt-3">
                        <Link to="/cadastro">Criar conta</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}