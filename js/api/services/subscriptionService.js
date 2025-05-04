import { httpClient } from '../httpClient.js';
import { ENDPOINTS } from '../config.js';

class SubscriptionService {
    async getPlans() {
        try {
            return await httpClient.get(ENDPOINTS.SUBSCRIPTIONS.PLANS);
        } catch (error) {
            throw new Error(error.message || 'Erro ao buscar planos');
        }
    }

    async subscribe(planId, paymentMethod, paymentDetails) {
        try {
            return await httpClient.post(ENDPOINTS.SUBSCRIPTIONS.SUBSCRIBE, {
                planId,
                paymentMethod,
                paymentDetails
            });
        } catch (error) {
            throw new Error(error.message || 'Erro ao realizar assinatura');
        }
    }

    // Verifica se o usuário tem uma assinatura ativa
    isSubscribed() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.subscription) return false;
        
        const expiresAt = new Date(user.subscription.expiresAt);
        return user.subscription.plan !== 'free' && expiresAt > new Date();
    }

    // Retorna o plano atual do usuário
    getCurrentPlan() {
        const user = JSON.parse(localStorage.getItem('user'));
        return user?.subscription?.plan || 'free';
    }

    // Verifica se o usuário tem acesso a um recurso específico baseado em seu plano
    hasAccess(feature) {
        const planFeatures = {
            free: ['read_novels', 'comment'],
            premium: ['read_novels', 'comment', 'publish_novels', 'ad_free'],
            pro: ['read_novels', 'comment', 'publish_novels', 'ad_free', 'early_access', 'premium_support']
        };

        const currentPlan = this.getCurrentPlan();
        return planFeatures[currentPlan]?.includes(feature) || false;
    }
}

export const subscriptionService = new SubscriptionService(); 