import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import Alerta from '../../components/Alerta';

export default function Cadastro() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');
    const [carregando, setCarregando] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setErro('');
        setSucesso('');
        setCarregando(true);

        try {
            await api.post('/users', { nome, email, senha });
            setSucesso('Cadastro realizado com sucesso, redirecionando...');
            setTimeout(() => navigate('/login'), 1500);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setErro(error.response.data.error);
            } else {
                setErro('Erro ao cadastrar');
            }
        } finally {
            setCarregando(false);
        }
    }

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="card shadow-sm p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <form onSubmit={handleSubmit}>
                    <h1 className="h3 text-center mb-4">Cadastro</h1>

                    <Alerta tipo="erro" mensagem={erro} />
                    <Alerta tipo="sucesso" mensagem={sucesso} />

                    <div className="mb-3">
                        <label className="form-label">Nome</label>
                        <input
                            type="text"
                            className="form-control"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </div>

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
                        {carregando ? 'Cadastrando...' : 'Cadastrar'}
                    </button>

                    <div className="text-center mt-3">
                        <Link to="/login">Já tenho conta</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}