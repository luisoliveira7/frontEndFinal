import { useState, useEffect } from 'react';
import { listarCategorias, criarCategoria, atualizarCategoria, removerCategoria } from '../../services/categoryService';
import Alerta from '../../components/Alerta';

export default function Categorias() {
    const [categorias, setCategorias] = useState([]);
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [editandoId, setEditandoId] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');
    const [ordenarPor, setOrdenarPor] = useState(null);
    const [ordemAsc, setOrdemAsc] = useState(true);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 5;

    useEffect(() => {
        carregar();
    }, []);

    async function carregar() {
        setCarregando(true);
        try {
            const data = await listarCategorias();
            setCategorias(Array.isArray(data) ? data : []);
        } catch (error) {
            setErro('Erro ao carregar categorias');
        } finally {
            setCarregando(false);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setErro('');
        setSucesso('');

        try {
            if (editandoId) {
                await atualizarCategoria(editandoId, { nome, descricao });
                setSucesso('Categoria atualizada com sucesso');
            } else {
                await criarCategoria({ nome, descricao });
                setSucesso('Categoria criada com sucesso');
            }
            limparForm();
            carregar();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setErro(error.response.data.error);
            } else {
                setErro('Erro ao salvar categoria');
            }
        }
    }

    function handleEditar(categoria) {
        setEditandoId(categoria.id);
        setNome(categoria.nome);
        setDescricao(categoria.descricao || '');
    }

    async function handleRemover(id) {
        if (!confirm('Deseja remover essa categoria?')) return;

        try {
            await removerCategoria(id);
            setSucesso('Categoria removida com sucesso');
            carregar();
        } catch (error) {
            setErro('Erro ao remover categoria');
        }
    }

    function limparForm() {
        setEditandoId(null);
        setNome('');
        setDescricao('');
    }

    function ordenar(campo) {
        if (ordenarPor === campo) {
            setOrdemAsc(!ordemAsc);
        } else {
            setOrdenarPor(campo);
            setOrdemAsc(true);
        }
    }

    function categoriasOrdenadas() {
        if (!ordenarPor) return categorias;

        const copia = [...categorias];
        copia.sort((a, b) => {
            const valorA = a[ordenarPor] || '';
            const valorB = b[ordenarPor] || '';

            if (valorA < valorB) return ordemAsc ? -1 : 1;
            if (valorA > valorB) return ordemAsc ? 1 : -1;
            return 0;
        });
        return copia;
    }

    function categoriasPaginadas() {
        const ordenadas = categoriasOrdenadas();
        const inicio = (paginaAtual - 1) * itensPorPagina;
        return ordenadas.slice(inicio, inicio + itensPorPagina);
    }

    function totalPaginas() {
        return Math.ceil(categorias.length / itensPorPagina);
    }

    return (
        <div>
            <h1 className="mb-4">Categorias</h1>

            <Alerta tipo="erro" mensagem={erro} />
            <Alerta tipo="sucesso" mensagem={sucesso} />

            <form onSubmit={handleSubmit} className="row g-2 mb-4">
                <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>
                <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Descrição"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                </div>
                <div className="col-md-4 d-flex gap-2">
                    <button type="submit" className="btn btn-primary">{editandoId ? 'Atualizar' : 'Criar'}</button>
                    {editandoId && <button type="button" className="btn btn-secondary" onClick={limparForm}>Cancelar</button>}
                </div>
            </form>

            {carregando ? (
                <p>Carregando...</p>
            ) : (
                <>
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th role="button" onClick={() => ordenar('nome')}>Nome</th>
                                    <th role="button" onClick={() => ordenar('descricao')}>Descrição</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categoriasPaginadas().map((categoria) => (
                                    <tr key={categoria.id}>
                                        <td>{categoria.nome}</td>
                                        <td>{categoria.descricao}</td>
                                        <td>
                                            <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEditar(categoria)}>Editar</button>
                                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleRemover(categoria.id)}>Excluir</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="d-flex justify-content-center gap-2 mt-3">
                        <button
                            className="btn btn-sm btn-outline-secondary"
                            disabled={paginaAtual === 1}
                            onClick={() => setPaginaAtual(paginaAtual - 1)}
                        >
                            Anterior
                        </button>
                        <span className="align-self-center">Página {paginaAtual} de {totalPaginas() || 1}</span>
                        <button
                            className="btn btn-sm btn-outline-secondary"
                            disabled={paginaAtual >= totalPaginas()}
                            onClick={() => setPaginaAtual(paginaAtual + 1)}
                        >
                            Próxima
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
