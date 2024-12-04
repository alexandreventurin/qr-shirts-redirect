// Database abstraction layer
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbFile = join(__dirname, 'data.json');

// Initialize with default data
const defaultData = {
  urlMappings: {
    'XK9P2M': 'https://instagram.com/joao',
    'LN5R7T': 'https://linkedin.com/in/maria'
  }
};

const adapter = new JSONFile(dbFile);
const db = new Low(adapter);

// Initialize database with default data if empty
await db.read();
db.data ||= defaultData;
await db.write();

export const dbStorage = {
  async setRedirectUrl(urlCode, redirectUrl) {
    await db.read();
    db.data.urlMappings[urlCode] = redirectUrl;
    await db.write();
    return true;
  },

  async getRedirectUrl(urlCode) {
    await db.read();
    return db.data.urlMappings[urlCode];
  },

  async getAllMappings() {
    await db.read();
    return db.data.urlMappings;
  }
};