import { database } from '../config/database.js';
import { UrlMapping } from '../types/index.js';

export const urlService = {
  async setRedirectUrl(urlCode: string, redirectUrl: string): Promise<boolean> {
    try {
      const db = await database.getDb();
      if (!db.data!.urlMappings) {
        db.data!.urlMappings = {};
      }
      db.data!.urlMappings[urlCode] = redirectUrl;
      await db.write();
      return true;
    } catch (error) {
      console.error('Error setting redirect URL:', error);
      throw error;
    }
  },

  async getRedirectUrl(urlCode: string): Promise<string | undefined> {
    try {
      const db = await database.getDb();
      return db.data!.urlMappings[urlCode];
    } catch (error) {
      console.error('Error getting redirect URL:', error);
      throw error;
    }
  },

  async getAllMappings(): Promise<UrlMapping> {
    try {
      const db = await database.getDb();
      return db.data!.urlMappings || {};
    } catch (error) {
      console.error('Error getting all mappings:', error);
      throw error;
    }
  }
};