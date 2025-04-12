const { default: makeWASocket, useSingleFileAuthState } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const P = require('pino');
const fs = require('fs');

const { state, saveState } = useSingleFileAuthState('./auth_info.json');

async function startBot() {
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
    logger: P({ level: 'silent' }),
  });

  sock.ev.on('creds.update', saveState);

  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (!messages || type !== 'notify') return;

    const msg = messages[0];
    const sender = msg.key.remoteJid;
    const texto = msg.message?.conversation || msg.message?.extendedTextMessage?.text || '';

    console.log(`[${new Date().toISOString()}] Mensagem recebida de ${sender}: ${texto}`);

    if (texto.toLowerCase().includes('oi')) {
      await sock.sendMessage(sender, { text: '✅ Teste online: bot está funcionando!' });
    }
  });
}

startBot();
