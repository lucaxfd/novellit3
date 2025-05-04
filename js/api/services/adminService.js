import { httpClient } from '../httpClient.js';
import { ENDPOINTS } from '../config.js';

class AdminService {
    // Dashboard
    async getDashboardStats() {
        try {
            return await httpClient.get(ENDPOINTS.ADMIN.DASHBOARD);
        } catch (error) {
            throw new Error(error.message || 'Erro ao buscar estatísticas do dashboard');
        }
    }

    // Gerenciamento de Usuários
    async getUsers(params = {}) {
        try {
            return await httpClient.get(ENDPOINTS.ADMIN.USERS.LIST, params);
        } catch (error) {
            throw new Error(error.message || 'Erro ao buscar usuários');
        }
    }

    async updateUser(userId, userData) {
        try {
            return await httpClient.put(ENDPOINTS.ADMIN.USERS.UPDATE(userId), userData);
        } catch (error) {
            throw new Error(error.message || 'Erro ao atualizar usuário');
        }
    }

    async deleteUser(userId) {
        try {
            return await httpClient.delete(ENDPOINTS.ADMIN.USERS.DELETE(userId));
        } catch (error) {
            throw new Error(error.message || 'Erro ao deletar usuário');
        }
    }

    async blockUser(userId) {
        try {
            return await httpClient.post(ENDPOINTS.ADMIN.USERS.BLOCK(userId));
        } catch (error) {
            throw new Error(error.message || 'Erro ao bloquear usuário');
        }
    }

    async unblockUser(userId) {
        try {
            return await httpClient.post(ENDPOINTS.ADMIN.USERS.UNBLOCK(userId));
        } catch (error) {
            throw new Error(error.message || 'Erro ao desbloquear usuário');
        }
    }

    // Gerenciamento de Novels
    async getNovels(params = {}) {
        try {
            return await httpClient.get(ENDPOINTS.ADMIN.NOVELS.LIST, params);
        } catch (error) {
            throw new Error(error.message || 'Erro ao buscar novels');
        }
    }

    async approveNovel(novelId) {
        try {
            return await httpClient.post(ENDPOINTS.ADMIN.NOVELS.APPROVE(novelId));
        } catch (error) {
            throw new Error(error.message || 'Erro ao aprovar novel');
        }
    }

    async rejectNovel(novelId, reason) {
        try {
            return await httpClient.post(ENDPOINTS.ADMIN.NOVELS.REJECT(novelId), { reason });
        } catch (error) {
            throw new Error(error.message || 'Erro ao rejeitar novel');
        }
    }

    async deleteNovel(novelId) {
        try {
            return await httpClient.delete(ENDPOINTS.ADMIN.NOVELS.DELETE(novelId));
        } catch (error) {
            throw new Error(error.message || 'Erro ao deletar novel');
        }
    }

    // Relatórios
    async getUsersReport(params = {}) {
        try {
            return await httpClient.get(ENDPOINTS.ADMIN.REPORTS.USERS, params);
        } catch (error) {
            throw new Error(error.message || 'Erro ao gerar relatório de usuários');
        }
    }

    async getNovelsReport(params = {}) {
        try {
            return await httpClient.get(ENDPOINTS.ADMIN.REPORTS.NOVELS, params);
        } catch (error) {
            throw new Error(error.message || 'Erro ao gerar relatório de novels');
        }
    }

    async getRevenueReport(params = {}) {
        try {
            return await httpClient.get(ENDPOINTS.ADMIN.REPORTS.REVENUE, params);
        } catch (error) {
            throw new Error(error.message || 'Erro ao gerar relatório de receita');
        }
    }

    // Verificação de permissões
    isAdmin() {
        const user = JSON.parse(localStorage.getItem('user'));
        return user?.role === 'admin';
    }

    checkAdminAccess() {
        if (!this.isAdmin()) {
            throw new Error('Acesso negado - Você não tem permissão de administrador');
        }
    }
}

export const adminService = new AdminService(); 