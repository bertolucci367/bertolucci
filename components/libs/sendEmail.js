import fetch from 'node-fetch'

const SENDGRID_API = process.env.SENDGRID_API
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
            <p>
              ${message}
            </p>
            <p>
              <b>Nome:</b> ${name}<br/>
              <b>Telefone:</b> ${phone}<br/>
              <b>E-mail:</b> ${email}
            </p>
          `,
        },
      ],
    }),
  })
}

export const sendCompare = async ({ name, email, message, products, url }) => {
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
          subject: `pedido de consulta | ${name}`,
        },
      ],
      from: {
        email: MAIL_FROM,
      },
      content: [
        {
          type: 'text/html',
          value: `
            <p>${message}</p>

            <b>Nome:</b> ${name}<br/>
            <b>E-mail:</b> ${email}<br/>

            <p><b>Produtos selecionados no site:</b></p>
            <ul>${products.map(val => `<li>${val}</li>`).join('')}</ul>
            <p><b>URL:</b> ${url}</p>
          `,
        },
      ],
    }),
  })
}

export const sendEmailToBertolucci = async ({ subject, message }) => {
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
          subject,
        },
      ],
      from: {
        email: MAIL_FROM,
      },
      content: [
        {
          type: 'text/html',
          value: message,
        },
      ],
    }),
  })
}
