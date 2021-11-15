import bcrypt from 'bcrypt'
import { gcms } from '~/services/gcms'
import { UpdateUserQuery } from '~/graphcms/index'

export default async function handler(req, res) {
  const { userID, pwd, sendActivation, seller: sellerID } = req.body

  try {
    // Generate new hash
    const hash = await bcrypt.hash(pwd, 12)

    // { "seller": { "connect": { "id": "" } } }
    let data = {}

    if (pwd && pwd.length > 0) {
      data = { ...data, password: hash }
    }

    if (sellerID && sellerID.length > 0) {
      data = { ...data, seller: { connect: { id: sellerID } } }
    } else {
      data = { ...data, seller: { disconnect: true } }
    }

    // update database
    await gcms.request(UpdateUserQuery, {
      id: userID,
      input: data,
    })

    res.status(200).end()
  } catch (err) {
    console.error(err)
  }
}
