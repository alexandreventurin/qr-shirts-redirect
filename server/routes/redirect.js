import express from 'express';
import { urlService } from '../services/urlService.js';

const router = express.Router();

router.get('/:urlCode', async (req, res) => {
  try {
    const { urlCode } = req.params;
    const redirectUrl = await urlService.getRedirectUrl(urlCode);
    
    if (!redirectUrl) {
      return res.status(404).json({ error: 'Código não encontrado ou link não configurado' });
    }
    
    res.redirect(redirectUrl);
  } catch (error) {
    console.error('Error handling redirect:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.post('/api/redirect', express.json(), async (req, res) => {
  try {
    const { urlCode, redirectUrl } = req.body;
    
    if (!urlCode || !redirectUrl) {
      return res.status(400).json({ error: 'Código da URL e URL de redirecionamento são obrigatórios' });
    }

    await urlService.setRedirectUrl(urlCode, redirectUrl);
    res.json({ success: true });
  } catch (error) {
    console.error('Error updating redirect:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

export default router;