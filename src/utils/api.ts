import { storage } from './storage';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = {
  async updateRedirectUrl(urlCode: string, redirectUrl: string) {
    try {
      const response = await fetch(`${API_URL}/api/redirect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ urlCode, redirectUrl }),
      });

      if (!response.ok) {
        throw new Error('Falha ao atualizar URL');
      }

      // Atualiza o storage local também
      const userData = storage.getUserData(urlCode);
      if (userData) {
        storage.saveUserData(urlCode, userData.email, userData.urlCode, redirectUrl);
      }

      return true;
    } catch (error) {
      console.error('Error updating redirect URL:', error);
      throw error;
    }
  }
};