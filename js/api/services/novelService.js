import { httpClient } from '../httpClient.js';
import { ENDPOINTS } from '../config.js';

class NovelService {
    async createNovel(novelData) {
        try {
            // Cria um FormData para enviar arquivos
            const formData = new FormData();
            
            // Adiciona os campos de texto
            formData.append('title', novelData.title);
            formData.append('synopsis', novelData.synopsis);
            formData.append('genre', novelData.genre);
            formData.append('chapter', novelData.chapter);
            
            // Adiciona as tags como JSON
            formData.append('tags', JSON.stringify(novelData.tags));
            
            // Adiciona a imagem de capa se existir
            if (novelData.cover) {
                formData.append('cover', novelData.cover);
            }

            return await httpClient.upload(ENDPOINTS.NOVELS.CREATE, formData);
        } catch (error) {
            throw new Error(error.message || 'Erro ao criar novel');
        }
    }

    async getNovels(params = {}) {
        try {
            return await httpClient.get(ENDPOINTS.NOVELS.LIST, params);
        } catch (error) {
            throw new Error(error.message || 'Erro ao buscar novels');
        }
    }

    async getNovelById(id) {
        try {
            return await httpClient.get(ENDPOINTS.NOVELS.DETAIL(id));
        } catch (error) {
            throw new Error(error.message || 'Erro ao buscar novel');
        }
    }

    async updateNovel(id, novelData) {
        try {
            const formData = new FormData();
            
            // Adiciona os campos que foram fornecidos
            if (novelData.title) formData.append('title', novelData.title);
            if (novelData.synopsis) formData.append('synopsis', novelData.synopsis);
            if (novelData.genre) formData.append('genre', novelData.genre);
            if (novelData.chapter) formData.append('chapter', novelData.chapter);
            if (novelData.tags) formData.append('tags', JSON.stringify(novelData.tags));
            if (novelData.cover) formData.append('cover', novelData.cover);

            return await httpClient.upload(ENDPOINTS.NOVELS.DETAIL(id), formData);
        } catch (error) {
            throw new Error(error.message || 'Erro ao atualizar novel');
        }
    }

    async deleteNovel(id) {
        try {
            return await httpClient.delete(ENDPOINTS.NOVELS.DETAIL(id));
        } catch (error) {
            throw new Error(error.message || 'Erro ao deletar novel');
        }
    }
}

export const novelService = new NovelService(); 