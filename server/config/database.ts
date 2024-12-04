import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import { DatabaseData, DatabaseInstance } from '../types/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbDir = join(__dirname, '..', 'db');
const dbFile = join(dbDir, 'data.json');

const defaultData: DatabaseData = {
  urlMappings: {
    'XK9P2M': 'https://instagram.com/joao',
    'LN5R7T': 'https://linkedin.com/in/maria'
  }
};

class Database {
  private db: DatabaseInstance | null = null;

  async connect(): Promise<boolean> {
    try {
      await fs.mkdir(dbDir, { recursive: true });
      
      try {
        await fs.access(dbFile);
      } catch {
        await fs.writeFile(dbFile, JSON.stringify(defaultData, null, 2));
      }

      const adapter = new JSONFile<DatabaseData>(dbFile);
      this.db = new Low(adapter) as DatabaseInstance;
      
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

  async getDb(): Promise<DatabaseInstance> {
    if (!this.db) {
      await this.connect();
    }
    return this.db!;
  }
}

export const database = new Database();