import fetch from 'node-fetch'

const SENDGRID_API = 'https://api.sendgrid.com/v3/mail/send'
const SENDGRID_API_KEY = process.env.SENDGRID_KEY
const MAIL_TO = process.env.MAIL_TO
const MAIL_FROM = process.env.MAIL_FROM

export const sendContact = async ({ name, email, phone, message }) => {
  await fetch(SENDGRID_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${SENDGRID_API_KEY}`,
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [
            {
              email: MAIL_TO,
            },
          ],
          subject: `Nova mensagem de ${name}`,
        },
      ],
      from: {
        email: MAIL_FROM,
      },
      content: [
        {
          type: 'text/html',
          value: `
            <p><b>Mensagem:</b><br/>
              ${message}
            </p>
            <br/>
            <b>Nome:</b> ${name}<br/>
            <b>Telefone:</b> ${phone}<br/>
            <b>E-mail:</b> ${email}
          `,
        },
      ],
    }),
  })
}

export const sendCompare = async ({
  name,
  email,
  to,
  message,
  products,
  url,
}) => {
  await fetch(SENDGRID_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${SENDGRID_API_KEY}`,
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [
            {
              email: MAIL_TO,
            },
          ],
          subject: `Produtos selecionados | Bertolucci`,
        },
      ],
      from: {
        email: MAIL_FROM,
      },
      content: [
        {
          type: 'text/html',
          value: `
            <p><b>Para:</b> ${to}<p/>
            <p><b>Mensagem:</b><br/>
              ${message}
            </p>
            <p><b>Produtos selecionados:</b></p>
            <ul>${products.map(name => `<li>${name}</li>`).join('')}</ul>

            <br/>
            <b>Nome:</b> ${name}<br/>
            <b>E-mail:</b> ${email}<br/>
            <b>URL:</b> ${url}
          `,
        },
      ],
    }),
  })
}
