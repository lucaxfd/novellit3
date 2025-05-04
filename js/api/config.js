// Configurações da API
export const API_CONFIG = {
    BASE_URL: 'https://9f80-2804-219c-316-1300-67a3-7022-b82e-463c.ngrok-free.app',
    TIMEOUT: 8000, // 8 segundos
    HEADERS: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
    GOOGLE_CLIENT_ID: '123456789-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com' // Substitua pelo seu Client ID real
};

// Endpoints da API
export const ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/user/register',
        FORGOT_PASSWORD: '/auth/forgot-password',
        GOOGLE: '/auth/google',
        GOOGLE_CALLBACK: '/auth/google/callback'
    },
    NOVELS: {
        CREATE: '/novels',
        LIST: '/novels',
        DETAIL: (id) => `/novels/${id}`,
        UPDATE: (id) => `/novels/${id}`,
        DELETE: (id) => `/novels/${id}`,
        PAGES: (id) => `/novels/${id}/pages`
    },
    USERS: {
        REGISTER: '/user/register',
        PROFILE: '/users/profile',
        UPDATE_PROFILE: '/users/profile'
    },
    SUBSCRIPTIONS: {
        PLANS: '/subscriptions/plans',
        SUBSCRIBE: '/subscriptions/subscribe'
    },
    ADMIN: {
        DASHBOARD: '/admin/dashboard',
        USERS: {
            LIST: '/admin/users',
            UPDATE: (id) => `/admin/users/${id}`,
            DELETE: (id) => `/admin/users/${id}`,
            BLOCK: (id) => `/admin/users/${id}/block`,
            UNBLOCK: (id) => `/admin/users/${id}/unblock`
        },
        NOVELS: {
            LIST: '/admin/novels',
            APPROVE: (id) => `/admin/novels/${id}/approve`,
            REJECT: (id) => `/admin/novels/${id}/reject`,
            DELETE: (id) => `/admin/novels/${id}/delete`
        },
        REPORTS: {
            USERS: '/admin/reports/users',
            NOVELS: '/admin/reports/novels',
            REVENUE: '/admin/reports/revenue'
        }
    }
};

// Códigos de erro
export const ERROR_CODES = {
    AUTH001: 'Credenciais inválidas',
    AUTH002: 'Token expirado',
    AUTH003: 'Token inválido',
    VAL001: 'Dados inválidos. Verifique as informações fornecidas',
    API001: 'Erro do servidor',
    ADM001: 'Acesso negado - Permissão de administrador necessária'
}; 