import { UpdatePersonQuery } from '~/graphcms/index'
import { sendEmailToBertolucci } from '~/components/libs/sendEmail'
import { gcms } from '~/services/gcms'

export default async function handler(req, res) {
  const { id, name, phone, company, newsletter } = req.body

  try {
    await gcms.request(UpdatePersonQuery, {
      id,
      input: { name, phone, company, newsletter },
    })

    const profile = {
      subject: 'atualização de perfil',
      message: `
      <b>Nome:</b> ${name}<br/>
      <b>Telefone:</b> ${phone}<br/>
      <b>Empresa:</b> ${company}<br/>
      <b>Newsletter:</b> ${newsletter ? 'Sim' : 'Não'}<br/>
    `,
    }

    await sendEmailToBertolucci(profile)
  } catch (err) {
    console.log(err)
  }

  res.status(200).end()
}
