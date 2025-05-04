import { httpClient } from '../httpClient.js';
import { ENDPOINTS, API_CONFIG } from '../config.js';

class AuthService {
    async login(email, password) {
        try {
            const data = await httpClient.post(ENDPOINTS.AUTH.LOGIN, {
                email,
                password
            });

            // Salva o token com o formato correto
            if (data.token && !data.token.startsWith('Bearer ')) {
                localStorage.setItem('token', `Bearer ${data.token}`);
            } else {
                localStorage.setItem('token', data.token);
            }
            
            // Salva os dados do usuário
            localStorage.setItem('user', JSON.stringify(data.user));

            return data;
        } catch (error) {
            throw this.handleAuthError(error);
        }
    }

    async register(username, email, password, confirmPassword) {
        try {
            const data = await httpClient.post(ENDPOINTS.USERS.REGISTER, {
                username,
                email,
                password,
                confirmPassword: confirmPassword
            });

            // Salva o token com o formato correto
            if (data.token && !data.token.startsWith('Bearer ')) {
                localStorage.setItem('token', `Bearer ${data.token}`);
            } else {
                localStorage.setItem('token', data.token);
            }
            
            // Salva os dados do usuário
            localStorage.setItem('user', JSON.stringify(data.user));

            return data;
        } catch (error) {
            throw this.handleAuthError(error);
        }
    }

    async forgotPassword(email) {
        try {
            return await httpClient.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
        } catch (error) {
            throw this.handleAuthError(error);
        }
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login.html';
    }

    isAuthenticated() {
        const token = localStorage.getItem('token');
        return !!token;
    }

    getCurrentUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    handleAuthError(error) {
        switch (error.code) {
            case 'AUTH001':
                return new Error('Email ou senha incorretos');
            case 'AUTH002':
                this.logout();
                return new Error('Sua sessão expirou. Por favor, faça login novamente');
            case 'AUTH003':
                this.logout();
                return new Error('Token inválido. Por favor, faça login novamente');
            case 'VAL001':
                return new Error('Dados inválidos. Verifique as informações fornecidas');
            default:
                return new Error(error.message || 'Erro ao processar requisição');
        }
    }

    // Login com Google
    initiateGoogleLogin() {
        // Gera um estado aleatório para segurança
        const state = Math.random().toString(36).substring(7);
        localStorage.setItem('googleAuthState', state);

        // Parâmetros para a URL de autorização do Google
        const params = new URLSearchParams({
            client_id: API_CONFIG.GOOGLE_CLIENT_ID,
            redirect_uri: `${window.location.origin}${ENDPOINTS.AUTH.GOOGLE_CALLBACK}`,
            response_type: 'code',
            scope: 'email profile',
            state: state,
            access_type: 'offline',
            prompt: 'select_account'
        });

        // Redireciona para a página de login do Google
        window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    }

    // Processa o retorno do Google
    async handleGoogleCallback(code, state) {
        try {
            // Verifica se o estado corresponde ao armazenado
            const savedState = localStorage.getItem('googleAuthState');
            if (state !== savedState) {
                throw new Error('Estado inválido - possível ataque CSRF');
            }

            // Remove o estado armazenado
            localStorage.removeItem('googleAuthState');

            // Troca o código por um token de acesso
            const data = await httpClient.post(ENDPOINTS.AUTH.GOOGLE, { code });

            // Salva o token e dados do usuário
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            return data;
        } catch (error) {
            throw this.handleAuthError(error);
        }
    }
}

export const authService = new AuthService(); 