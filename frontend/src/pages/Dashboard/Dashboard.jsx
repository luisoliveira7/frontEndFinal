import { useState, useEffect } from 'react';
import { totalDespesas, quantidadeDespesas, despesasPorCategoria } from '../../services/dashboardService';
import { listarDespesas } from '../../services/expenseService';

export default function Dashboard() {
    const [total, setTotal] = useState(0);
    const [quantidade, setQuantidade] = useState(0);
    const [porCategoria, setPorCategoria] = useState([]);
    const [ultimas, setUltimas] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');

    useEffect(() => {
        carregar();
    }, []);

    async function carregar() {
        setCarregando(true);
        try {
            const totalData = await totalDespesas();
            const quantidadeData = await quantidadeDespesas();
            const categoriaData = await despesasPorCategoria();
            const despesasData = await listarDespesas();

            setTotal(totalData.total);
            setQuantidade(quantidadeData.quantidade);
            setPorCategoria(categoriaData);

            const lista = despesasData.data ? despesasData.data : [];
            const ordenadas = [...lista].sort((a, b) => new Date(b.data) - new Date(a.data));
            setUltimas(ordenadas.slice(0, 5));
        } catch (error) {
            setErro('Erro ao carregar dashboard');
        } finally {
            setCarregando(false);
        }
    }

    if (carregando) {
        return <p>Carregando...</p>;
    }

    return (
        <div>
            <h1 className="mb-4">Dashboard</h1>

            {erro && <p className="text-danger">{erro}</p>}

            <div className="row mb-4">
                <div className="col-md-6 mb-3">
                    <div className="card text-center shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Total gasto</h5>
                            <p className="fs-3 text-primary">R$ {total}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mb-3">
                    <div className="card text-center shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Quantidade de despesas</h5>
                            <p className="fs-3 text-primary">{quantidade}</p>
                        </div>
                    </div>
                </div>
            </div>

            <h2 className="h4 mb-3">Gastos por categoria</h2>
            {porCategoria.length === 0 ? (
                <p>Nenhum gasto por categoria</p>
            ) : (
                <table className="table table-striped table-bordered mb-4">
                    <thead className="table-dark">
                        <tr>
                            <th>Categoria</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {porCategoria.map((item, index) => (
                            <tr key={index}>
                                <td>{item.categoria}</td>
                                <td>R$ {item.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <h2 className="h4 mb-3">Últimas despesas cadastradas</h2>
            {ultimas.length === 0 ? (
                <p>Nenhuma despesa cadastrada</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>Descrição</th>
                                <th>Valor</th>
                                <th>Data</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ultimas.map((despesa) => (
                                <tr key={despesa.id}>
                                    <td>{despesa.descricao}</td>
                                    <td>R$ {despesa.valor}</td>
                                    <td>{despesa.data}</td>
                                    <td>{despesa.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}