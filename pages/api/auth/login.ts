import bcrypt from 'bcrypt'
import { GraphQLClient } from 'graphql-request'
import { setUserCookie } from '~/components/libs/auth'

const gcms = new GraphQLClient(process.env.GRAPHCMS_API, {
  headers: {
    authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
  },
})

const _query = `
query Customer($email: String!) {
  values: customer (where: { email: $email }, stage: PUBLISHED) {
    email
    password
    name
    id
  }
}
`

export default async (req, res) => {
  const { email, password } = req.body

  const { values: customer } = await gcms.request(_query, {
    email,
  })

  // Compare password
  const match = await bcrypt.compare(password, customer?.password) // text, hash

  if (!match) {
    res.status(401).end('email or password wrong')
  } else {
    const { id, name, email } = customer
    const user = { id, name, email, role: 'user' }

    await setUserCookie(req, res, user)

    res.json({ user })
  }
}
