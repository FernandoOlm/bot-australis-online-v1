const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const fs = require('fs');
const path = require('path');

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info');

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const texto = msg.message.conversation?.toLowerCase() || '';

    if (texto.includes('oi')) {
      await sock.sendMessage(msg.key.remoteJid, { text: 'teste online' });
    }
  });
}

startBot().catch(err => console.error('Erro ao iniciar o bot:', err));
