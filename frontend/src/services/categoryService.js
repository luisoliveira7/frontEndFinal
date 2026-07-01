import api from './api';

export async function listarCategorias() {
    const response = await api.get('/categories');
    return response.data;
}

export async function buscarCategoria(id) {
    const response = await api.get(`/categories/${id}`);
    return response.data;
}

export async function criarCategoria(dados) {
    const response = await api.post('/categories', dados);
    return response.data;
}

export async function atualizarCategoria(id, dados) {
    const response = await api.put(`/categories/${id}`, dados);
    return response.data;
}

export async function removerCategoria(id) {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
}