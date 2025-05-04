import { API_CONFIG } from './config.js';

class HttpClient {
    constructor(baseURL = API_CONFIG.BASE_URL) {
        this.baseURL = baseURL;
    }

    // Obtém o token de autenticação
    getAuthToken() {
        return localStorage.getItem('token');
    }

    // Monta os headers da requisição
    getHeaders(customHeaders = {}) {
        const headers = { ...API_CONFIG.HEADERS, ...customHeaders };
        const token = this.getAuthToken();
        
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        return headers;
    }

    // Trata as respostas da API
    async handleResponse(response) {
        const contentType = response.headers.get('content-type');
        let data;

        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            data = await response.text();
        }

        if (!response.ok) {
            // Se a API retornar um objeto de erro
            if (typeof data === 'object' && data.error) {
                throw {
                    status: response.status,
                    message: data.error.message || 'Erro desconhecido',
                    code: data.error.code
                };
            }
            // Se a API retornar apenas uma mensagem de erro
            throw {
                status: response.status,
                message: typeof data === 'string' ? data : 'Erro desconhecido',
                code: 'API001'
            };
        }

        return data;
    }

    // Métodos HTTP
    async get(endpoint, params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const url = `${this.baseURL}${endpoint}${queryString ? `?${queryString}` : ''}`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: this.getHeaders(),
                credentials: 'include'
            });

            return this.handleResponse(response);
        } catch (error) {
            if (error.name === 'TypeError') {
                throw new Error('Erro de conexão. Verifique sua internet ou tente novamente mais tarde.');
            }
            throw error;
        }
    }

    async post(endpoint, data = {}, customHeaders = {}) {
        const url = `${this.baseURL}${endpoint}`;
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: this.getHeaders(customHeaders),
                body: JSON.stringify(data),
                credentials: 'include'
            });

            return this.handleResponse(response);
        } catch (error) {
            if (error.name === 'TypeError') {
                throw new Error('Erro de conexão. Verifique sua internet ou tente novamente mais tarde.');
            }
            throw error;
        }
    }

    async put(endpoint, data = {}) {
        const url = `${this.baseURL}${endpoint}`;
        
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: this.getHeaders(),
                body: JSON.stringify(data),
                credentials: 'include'
            });

            return this.handleResponse(response);
        } catch (error) {
            if (error.name === 'TypeError') {
                throw new Error('Erro de conexão. Verifique sua internet ou tente novamente mais tarde.');
            }
            throw error;
        }
    }

    async delete(endpoint) {
        const url = `${this.baseURL}${endpoint}`;
        
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: this.getHeaders(),
                credentials: 'include'
            });

            return this.handleResponse(response);
        } catch (error) {
            if (error.name === 'TypeError') {
                throw new Error('Erro de conexão. Verifique sua internet ou tente novamente mais tarde.');
            }
            throw error;
        }
    }

    // Método especial para upload de arquivos
    async upload(endpoint, formData) {
        const url = `${this.baseURL}${endpoint}`;
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: this.getHeaders({
                    'Content-Type': undefined // Deixa o navegador definir o content-type correto para FormData
                }),
                body: formData,
                credentials: 'include'
            });

            return this.handleResponse(response);
        } catch (error) {
            if (error.name === 'TypeError') {
                throw new Error('Erro de conexão. Verifique sua internet ou tente novamente mais tarde.');
            }
            throw error;
        }
    }
}

export const httpClient = new HttpClient(); 