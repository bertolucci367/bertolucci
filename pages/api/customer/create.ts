import { CreatePersonQuery } from '~/graphcms/index'
import { sendEmailToBertolucci } from '~/components/libs/sendEmail'
import { gcms } from '~/services/gcms'

export default async function handler(req, res) {
  const { id, name, email, phone, company, newsletter } = req.body

  const profile = {
    subject: '',
    message: `
    <b>Nome:</b> ${name}<br/>
    <b>E-mail:</b> ${email}<br/>
    <b>Telefone:</b> ${phone}<br/>
    <b>Empresa:</b> ${company}<br/>
    <b>Newsletter:</b> ${newsletter ? 'Sim' : 'Não'}<br/>
  `,
  }

  try {
    await gcms.request(CreatePersonQuery, {
      id,
      input: { name, email, phone, company, newsletter, role: ['user'] },
    })

    profile.subject = `${name} se cadastrou no site`
  } catch (err) {
    profile.subject = `Ops... tentativa de cadastro de ${name}`
    profile.message = `
    ${profile.message}
    <p>${err.message}</p>
    `
  }

  await sendEmailToBertolucci(profile)
  res.status(200).end()
}
