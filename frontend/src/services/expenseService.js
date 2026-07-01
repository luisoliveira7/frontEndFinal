import api from './api';

export async function listarDespesas(filtros) {
    const response = await api.get('/expenses', { params: filtros });
    return response.data;
}

export async function buscarDespesa(id) {
    const response = await api.get(`/expenses/${id}`);
    return response.data;
}

export async function criarDespesa(dados) {
    const response = await api.post('/expenses', dados);
    return response.data;
}

export async function atualizarDespesa(id, dados) {
    const response = await api.put(`/expenses/${id}`, dados);
    return response.data;
}

export async function removerDespesa(id) {
    const response = await api.delete(`/expenses/${id}`);
    return response.data;
}