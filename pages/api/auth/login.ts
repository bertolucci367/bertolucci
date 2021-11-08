import bcrypt from 'bcrypt'
import { GraphQLClient } from 'graphql-request'
import { setUserCookie } from '~/components/libs/auth'

const gcms = new GraphQLClient(process.env.GRAPHCMS_API, {
  headers: {
    authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
  },
})

const _query = `
query Person($email: String!) {
  values: person (where: { email: $email }, stage: PUBLISHED) {
    id
    name
    email
    password
    role
  }
}
`

export default async function handler(req, res) {
  const { email, password } = req.body

  const { values: person } = await gcms.request(_query, {
    email,
  })

  // Compare password
  const match = await bcrypt.compare(password, person?.password) // text, hash

  if (!match) {
    res.status(401).end('email or password wrong')
  } else {
    const { id, name, email, role } = person
    const user = { id, name, email, role }

    await setUserCookie(req, res, user)

    res.json({ user })
  }
}
