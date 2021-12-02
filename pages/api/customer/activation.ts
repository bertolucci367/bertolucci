import bcrypt from 'bcrypt'
import { gcms } from '~/services/gcms'
import { UpdatePersonQuery, PublishPersonQuery } from '~/graphcms/index'

export default async function handler(req, res) {
  const { id, token } = req.query

  if (!id || !token) {
    return res.status(404).json({
      error: {
        code: 'not_found',
        messgae:
          "The requested endpoint was not found or doesn't support this method.",
      },
    })
  }

  try {
    const { values: client } = await gcms.request(
      `
    query User($id: ID!) {
      values: person(where: {id: $id}) {
        id
        email
      }
    }
    `,
      {
        id,
      },
    )

    if (!client) {
      return res.status(401).json({
        error: {
          code: 'not_access',
          messgae: 'You cannot permission.',
        },
      })
    }

    // const siteToken = await getActivationToken({ id })
    const text = `${id}${process.env.ACTIVATION_KEY}`
    const match = await bcrypt.compare(text, token) // text, hash

    if (!match) {
      return res.status(401).json({
        error: {
          code: 'not_access',
          messgae: 'You cannot permission.',
        },
      })
    }

    // update database
    await gcms.request(UpdatePersonQuery, {
      id,
      input: { activeLogin: true },
    })

    await gcms.request(PublishPersonQuery, {
      id,
    })
  } catch (err) {
    console.log(err)
  }

  res.redirect(307, `${process.env.SITE_URL}/login?msg=active`)
}
