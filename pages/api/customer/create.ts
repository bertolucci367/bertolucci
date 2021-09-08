import { GraphQLClient } from 'graphql-request'
import { CreateCustomerQuery } from '~/graphcms/index'
import { sendEmailToBertolucci } from '~/components/libs/sendEmail'

const gcms = new GraphQLClient(process.env.GRAPHCMS_API, {
  headers: {
    authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
  },
})

export default async function handler(req, res) {
  const { id, name, mail, phone, company, newsletter } = req.body

  try {
    await gcms.request(CreateCustomerQuery, {
      id,
      input: { name, mail, phone, company, newsletter },
    })

    const profile = {
      subject: `${name} se cadastrou no site`,
      message: `
      <b>Nome:</b> ${name}<br/>
      <b>E-mail:</b> ${mail}<br/>
      <b>Telefone:</b> ${phone}<br/>
      <b>Empresa:</b> ${company}<br/>
      <b>Newsletter:</b> ${newsletter ? 'Sim' : 'Não'}<br/>
    `,
    }

    await sendEmailToBertolucci(profile)

    res.status(200).end()
  } catch (err) {
    console.log(err)
  }
}
