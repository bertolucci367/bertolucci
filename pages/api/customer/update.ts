import { GraphQLClient } from 'graphql-request'
import { UpdateCustomerQuery } from '~/graphcms/index'
import { sendEmailToBertolucci } from '~/components/libs/sendEmail'

const gcms = new GraphQLClient(process.env.GRAPHCMS_API, {
  headers: {
    authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
  },
})

export default async function handler(req, res) {
  const { id, name, phone, company, newsletter } = req.body

  try {
    await gcms.request(UpdateCustomerQuery, {
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
