import api from './api';

export async function totalDespesas() {
    const response = await api.get('/dashboard/total-expenses');
    return response.data;
}

export async function quantidadeDespesas() {
    const response = await api.get('/dashboard/expenses-count');
    return response.data;
}

export async function despesasPorCategoria() {
    const response = await api.get('/dashboard/expenses-by-category');
    return response.data;
}