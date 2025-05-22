const express = require('express');
const adicionarLog = require('./logWriter'); // Importa a função

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Bem-vindo à sua API REST com Express!');
});

// ---

## Nova Rota para Logs

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

app.listen(PORT, () => {
  console.log(`Servidor Express rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
});