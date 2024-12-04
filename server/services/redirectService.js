import { database } from '../config/database.js';

export const redirectService = {
  async setRedirectUrl(urlCode, redirectUrl) {
    try {
      const db = await database.getDb();
      db.data.urlMappings[urlCode] = redirectUrl;
      await db.write();
      return true;
    } catch (error) {
      console.error('Error setting redirect URL:', error);
      throw error;
    }
  },

  async getRedirectUrl(urlCode) {
    try {
      const db = await database.getDb();
      return db.data.urlMappings[urlCode];
    } catch (error) {
      console.error('Error getting redirect URL:', error);
      throw error;
    }
  },

  async getAllMappings() {
    try {
      const db = await database.getDb();
      return db.data.urlMappings;
    } catch (error) {
      console.error('Error getting all mappings:', error);
      throw error;
    }
  }
};