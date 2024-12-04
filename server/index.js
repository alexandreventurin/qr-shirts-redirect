import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { database } from './config/database.js';
import redirectRoutes from './routes/redirect.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await database.connect();
    console.log('Database connected successfully');

    app.use(cors({
      origin: process.env.CORS_ORIGIN || '*',
      credentials: true
    }));

    app.use(express.json());
    app.use(express.static(path.join(__dirname, '..', 'dist')));
    app.use('/', redirectRoutes);

    app.get('/health', (req, res) => {
      res.json({ status: 'ok' });
    });

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
    });

    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ error: 'Algo deu errado!' });
    });

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();