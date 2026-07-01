import { useState, useEffect } from 'react';
import { listarDespesas, criarDespesa, atualizarDespesa, removerDespesa } from '../../services/expenseService';
import { listarCategorias } from '../../services/categoryService';
import Alerta from '../../components/Alerta';

export default function Despesas() {
    const [despesas, setDespesas] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [data, setData] = useState('');
    const [status, setStatus] = useState('PENDENTE');
    const [categoriaId, setCategoriaId] = useState('');
    const [editandoId, setEditandoId] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');

    const [filtroStatus, setFiltroStatus] = useState('');
    const [filtroCategoria, setFiltroCategoria] = useState('');
    const [filtroValorMin, setFiltroValorMin] = useState('');
    const [filtroValorMax, setFiltroValorMax] = useState('');
    const [filtroDataInicio, setFiltroDataInicio] = useState('');
    const [filtroDataFim, setFiltroDataFim] = useState('');

    useEffect(() => {
        carregarCategorias();
        carregar();
    }, []);

    async function carregarCategorias() {
        try {
            const data = await listarCategorias();
            setCategorias(Array.isArray(data) ? data : []);
        } catch (error) {
            setErro('Erro ao carregar categorias');
        }
    }

    async function carregar() {
        setCarregando(true);
        try {
            const filtros = {};
            if (filtroStatus) filtros.status = filtroStatus;
            if (filtroCategoria) filtros.categoriaId = filtroCategoria;
            if (filtroValorMin) filtros.valorMin = filtroValorMin;
            if (filtroValorMax) filtros.valorMax = filtroValorMax;
            if (filtroDataInicio) filtros.dataInicio = filtroDataInicio;
            if (filtroDataFim) filtros.dataFim = filtroDataFim;

            const resultado = await listarDespesas(filtros);
            setDespesas(resultado.data ? resultado.data : []);
        } catch (error) {
            setErro('Erro ao carregar despesas');
        } finally {
            setCarregando(false);
        }
    }

    function handleFiltrar(e) {
        e.preventDefault();
        carregar();
    }

    function limparFiltros() {
        setFiltroStatus('');
        setFiltroCategoria('');
        setFiltroValorMin('');
        setFiltroValorMax('');
        setFiltroDataInicio('');
        setFiltroDataFim('');
        carregar();
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setErro('');
        setSucesso('');

        const dados = {
            descricao,
            valor: Number(valor),
            data,
            status,
            categoriaId: categoriaId || null
        };

        try {
            if (editandoId) {
                await atualizarDespesa(editandoId, dados);
                setSucesso('Despesa atualizada com sucesso');
            } else {
                await criarDespesa(dados);
                setSucesso('Despesa criada com sucesso');
            }
            limparForm();
            carregar();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setErro(error.response.data.error);
            } else {
                setErro('Erro ao salvar despesa');
            }
        }
    }

    function handleEditar(despesa) {
        setEditandoId(despesa.id);
        setDescricao(despesa.descricao);
        setValor(despesa.valor);
        setData(despesa.data);
        setStatus(despesa.status);
        setCategoriaId(despesa.categoriaId || '');
    }

    async function handleRemover(id) {
        if (!confirm('Deseja remover essa despesa?')) return;

        try {
            await removerDespesa(id);
            setSucesso('Despesa removida com sucesso');
            carregar();
        } catch (error) {
            setErro('Erro ao remover despesa');
        }
    }

    function limparForm() {
        setEditandoId(null);
        setDescricao('');
        setValor('');
        setData('');
        setStatus('PENDENTE');
        setCategoriaId('');
    }

    function nomeCategoria(id) {
        const categoria = categorias.find((c) => c.id === id);
        return categoria ? categoria.nome : '-';
    }

    return (
        <div>
            <h1 className="mb-4">Despesas</h1>

            <Alerta tipo="erro" mensagem={erro} />
            <Alerta tipo="sucesso" mensagem={sucesso} />

            <form onSubmit={handleSubmit} className="row g-2 mb-3">
                <div className="col-md-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Descrição"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        required
                    />
                </div>
                <div className="col-md-2">
                    <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        placeholder="Valor"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        required
                    />
                </div>
                <div className="col-md-2">
                    <input
                        type="date"
                        className="form-control"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        required
                    />
                </div>
                <div className="col-md-2">
                    <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="PENDENTE">PENDENTE</option>
                        <option value="PAGA">PAGA</option>
                    </select>
                </div>
                <div className="col-md-3">
                    <select className="form-select" value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)}>
                        <option value="">Sem categoria</option>
                        {categorias.map((categoria) => (
                            <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                        ))}
                    </select>
                </div>
                <div className="col-12 d-flex gap-2">
                    <button type="submit" className="btn btn-primary">{editandoId ? 'Atualizar' : 'Criar'}</button>
                    {editandoId && <button type="button" className="btn btn-secondary" onClick={limparForm}>Cancelar</button>}
                </div>
            </form>

            <form onSubmit={handleFiltrar} className="row g-2 mb-4 align-items-center bg-light p-3 rounded">
                <div className="col-md-2">
                    <select className="form-select" value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)}>
                        <option value="">Todos os status</option>
                        <option value="PENDENTE">PENDENTE</option>
                        <option value="PAGA">PAGA</option>
                    </select>
                </div>
                <div className="col-md-2">
                    <select className="form-select" value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)}>
                        <option value="">Todas as categorias</option>
                        {categorias.map((categoria) => (
                            <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-2">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Valor mínimo"
                        value={filtroValorMin}
                        onChange={(e) => setFiltroValorMin(e.target.value)}
                    />
                </div>
                <div className="col-md-2">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Valor máximo"
                        value={filtroValorMax}
                        onChange={(e) => setFiltroValorMax(e.target.value)}
                    />
                </div>
                <div className="col-md-2">
                    <input
                        type="date"
                        className="form-control"
                        value={filtroDataInicio}
                        onChange={(e) => setFiltroDataInicio(e.target.value)}
                    />
                </div>
                <div className="col-md-2">
                    <input
                        type="date"
                        className="form-control"
                        value={filtroDataFim}
                        onChange={(e) => setFiltroDataFim(e.target.value)}
                    />
                </div>
                <div className="col-12 d-flex gap-2">
                    <button type="submit" className="btn btn-primary">Filtrar</button>
                    <button type="button" className="btn btn-secondary" onClick={limparFiltros}>Limpar filtros</button>
                </div>
            </form>

            {carregando ? (
                <p>Carregando...</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>Descrição</th>
                                <th>Valor</th>
                                <th>Data</th>
                                <th>Status</th>
                                <th>Categoria</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {despesas.map((despesa) => (
                                <tr key={despesa.id}>
                                    <td>{despesa.descricao}</td>
                                    <td>{despesa.valor}</td>
                                    <td>{despesa.data}</td>
                                    <td>{despesa.status}</td>
                                    <td>{nomeCategoria(despesa.categoriaId)}</td>
                                    <td>
                                        <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEditar(despesa)}>Editar</button>
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleRemover(despesa.id)}>Excluir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}