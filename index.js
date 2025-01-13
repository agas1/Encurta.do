const express = require('express');
const shortid = require('shortid');
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const DATABASE = './urls.json';

const loadUrls = async () => {
  try {
    await fs.access(DATABASE);
  } catch {
    await fs.writeFile(DATABASE, '{}');
  }
  const data = await fs.readFile(DATABASE, 'utf8');
  return JSON.parse(data || '{}');
};

const saveUrls = async (data) => {
  try {
    await fs.writeFile(DATABASE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Erro ao salvar no banco de dados:', error);
  }
};

app.post('/encurtar', async (req, res) => {
  const { urlLonga } = req.body;
  if (!urlLonga) {
    return res.status(400).json({ error: 'URL longa é obrigatória!' });
  }

  try {
    new URL(urlLonga);
  } catch {
    return res.status(400).json({ error: 'URL inválida!' });
  }

  const urls = await loadUrls();
  const id = shortid.generate();
  urls[id] = urlLonga;
  await saveUrls(urls);

  res.json({ urlCurta: `http://localhost:3000/${id}` });
});

app.get('/:id', async (req, res) => {
  const { id } = req.params;
  const urls = await loadUrls();
  const urlLonga = urls[id];
  if (!urlLonga) {
    return res.status(404).json({ error: 'URL não encontrada!' });
  }
  res.redirect(urlLonga);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
