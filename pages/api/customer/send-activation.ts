import { PublishPersonQuery } from '~/graphcms/index'
import { gcms } from '~/services/gcms'
import axios from 'axios'
import { getActivationToken } from '~/components/libs/auth'

export default async function handler(req, res) {
  const { userID, pwd, sendActivation } = req.body
  await gcms.request(PublishPersonQuery, {
    id: userID,
  })

  let message = ''

  if (sendActivation) {
    const token = await getActivationToken({ id: userID })

    const URL = `${process.env.SITE_URL}/api/customer/activation?id=${userID}&token=${token}`

    message += `
      <p>Para que você consiga acessar a área do cliente do nosso site é necessário que você ative a sua conta clicando no link abaixo:</p>
      <p>${URL}</p>
    `
  }

  if (pwd) {
    message += `
      <p>Abaixo está a sua senha de acesso:</p>
      <p><b style="font-size: 18px; margin: 20px;">${pwd}</b></p>
    `
  }

  res.status(200).json({ msg: message })
}
