import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            setUser({ id: decoded.id, email: decoded.email });
        }
        setLoading(false);
    }, []);

    async function login(email, senha) {
        const response = await api.post('/auth/login', { email, senha });
        const { token } = response.data;
        localStorage.setItem('token', token);
        const decoded = jwtDecode(token);
        setUser({ id: decoded.id, email: decoded.email });
    }

    function logout() {
        localStorage.removeItem('token');
        setUser(null);
        window.location.href = '/login';
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}