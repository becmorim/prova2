const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

/**
 * Adiciona uma mensagem de log ao arquivo logs.txt.
 *
 * @param {string} nomeAluno
 * @returns {string} O ID único gerado para o log.
 */
function adicionarLog(nomeAluno) {
    const logId = uuidv4();
    const dataHora = new Date().toLocaleString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).replace(',', '');

    const mensagemLog = `${logId} - ${dataHora} - ${nomeAluno}\n`;

    fs.appendFile('logs.txt', mensagemLog, (err) => {
        if (err) {
            console.error('Erro ao escrever no arquivo logs.txt:', err);
        } else {
            console.log(`Mensagem de log adicionada com sucesso: ${mensagemLog.trim()}`);
        }
    });

    return logId; // Retorna o 
}

if (require.main === module) {
    adicionarLog("João Silva");
    adicionarLog("Maria Oliveira");
    adicionarLog("Pedro Souza");

    setTimeout(() => {
        fs.readFile('logs.txt', 'utf8', (err, data) => {
            if (err) {
                console.error("Erro ao ler o arquivo logs.txt:", err);
            } else {
                console.log("\nConteúdo atual do logs.txt:");
                console.log(data);
            }
        });
    }, 100);
}

module.exports = adicionarLog;