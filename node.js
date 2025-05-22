const express = require('express');
const fs = require('fs'); 
const adicionarLog = require('./logWriter'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Bem-vindo à sua API REST com Express!');
});

app.post('/logs', (req, res) => {
  const { nomeAluno } = req.body;

  if (!nomeAluno) {
    return res.status(400).json({ message: 'O nome do aluno é obrigatório no corpo da requisição.' });
  }

  const idGerado = adicionarLog(nomeAluno);

  res.status(200).json({
    message: 'Log registrado com sucesso!',
    id: idGerado,
    nomeAluno: nomeAluno
  });
});

app.get('/logs/:id', (req, res) => {
  const logIdToFind = req.params.id; // Pega o ID da URL

  fs.readFile('logs.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo logs.txt:', err);
      // Se o arquivo não existir, retorna 404 Not Found ou 500 Internal Server Error
      if (err.code === 'ENOENT') {
        return res.status(404).json({ message: 'Arquivo de logs não encontrado.' });
      }
      return res.status(500).json({ message: 'Erro interno do servidor ao ler os logs.' });
    }
    const lines = data.split('\n');
    let foundLog = null;

    for (const line of lines) {
      if (line.includes(logIdToFind)) {
        foundLog = line;
        break; // Encontrou, pode sair do loop
      }
    }

    if (foundLog) {
      return res.status(200).json({
        message: 'Log encontrado com sucesso!',
        log: foundLog.trim() 
      });
    } else {
      // Se não encontrou o log
      return res.status(404).json({
        message: `Log com ID '${logIdToFind}' não encontrado.`
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor Express rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
});