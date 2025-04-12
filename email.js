import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export async function enviarEmail(tipo, dados) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  });

  const msg = `
    📌 <b>${tipo}</b><br>
    👤 Nome: ${dados.nome}<br>
    🏢 Apto: ${dados.apartamento} / Torre ${dados.torre}<br>
    📞 Telefone: ${dados.telefone}<br>
    📧 Cópia: ${dados.email}<br>
    📝 Descrição: ${dados.descricao}
  `;

  await transporter.sendMail({
    from: \`Bot Australis <${process.env.EMAIL_USER}>\`,
    to: process.env.EMAIL_TO,
    cc: dados.email?.includes('@') ? dados.email : undefined,
    subject: \`Nova solicitação - ${tipo}\`,
    html: msg
  });
}