import { httpClient } from '../httpClient.js';
import { ENDPOINTS } from '../config.js';

class UserService {
    async getProfile() {
        try {
            return await httpClient.get(ENDPOINTS.USERS.PROFILE);
        } catch (error) {
            throw new Error(error.message || 'Erro ao buscar perfil');
        }
    }

    async updateProfile(userData) {
        try {
            const formData = new FormData();
            
            // Adiciona o nome se fornecido
            if (userData.name) {
                formData.append('name', userData.name);
            }
            
            // Adiciona o avatar se fornecido
            if (userData.avatar) {
                formData.append('avatar', userData.avatar);
            }

            const data = await httpClient.upload(ENDPOINTS.USERS.UPDATE_PROFILE, formData);
            
            // Atualiza os dados do usuário no localStorage
            const currentUser = JSON.parse(localStorage.getItem('user'));
            localStorage.setItem('user', JSON.stringify({
                ...currentUser,
                name: data.name,
                avatar: data.avatar
            }));

            return data;
        } catch (error) {
            throw new Error(error.message || 'Erro ao atualizar perfil');
        }
    }
}

export const userService = new UserService(); 