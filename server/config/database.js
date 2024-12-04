import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbDir = join(__dirname, '..', 'db');
const dbFile = join(dbDir, 'data.json');

const defaultData = {
  urlMappings: {
    'XK9P2M': 'https://instagram.com/joao',
    'LN5R7T': 'https://linkedin.com/in/maria'
  }
};

class Database {
  constructor() {
    this.db = null;
  }

  async connect() {
    try {
      await fs.mkdir(dbDir, { recursive: true });
      
      try {
        await fs.access(dbFile);
      } catch {
        await fs.writeFile(dbFile, JSON.stringify(defaultData, null, 2));
      }

      const adapter = new JSONFile(dbFile);
      this.db = new Low(adapter);
      
      await this.db.read();
      
      if (!this.db.data) {
        this.db.data = defaultData;
        await this.db.write();
      }
      
      console.log('Database initialized successfully');
      return true;
    } catch (error) {
      console.error('Database initialization failed:', error);
      throw error;
    }
  }

  async getDb() {
    if (!this.db) {
      await this.connect();
    }
    return this.db;
  }
}

export const database = new Database();