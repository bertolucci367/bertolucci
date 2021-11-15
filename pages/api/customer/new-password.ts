import bcrypt from 'bcrypt'
import { PersonByEmailQuery, UpdatePersonQuery } from '~/graphcms/index'
import { gcms } from '~/services/gcms'

export default async function handler(req, res) {
  const { id, password, current, email } = req.body

  // Get customer data
  const { values: customer } = await gcms.request(PersonByEmailQuery, {
    email,
  })

  // Compare password
  const match = await bcrypt.compare(current, customer.password) // text, hash

  if (!match) {
    res.status(401).end('password wrong')
  }

  try {
    // Generate new hash
    const hash = await bcrypt.hash(password, 12)

    // update database
    await gcms.request(UpdatePersonQuery, {
      id,
      input: { password: hash },
    })

    res.status(200).end()
  } catch (err) {
    console.error(err)
  }
}
