import { GraphQLClient } from 'graphql-request'

const gcms = new GraphQLClient(process.env.GRAPHCMS_API)

export default async function handler(req, res) {
  const { email } = req.body

  await gcms.request(
    `
    mutation createNewsletter($mail: String!) {
      upsertNewsletter(where: { email: $mail }
      upsert: {
        create: { email: $mail }
        update: { email: $mail }
      }) {
        email
      }
    }
  `,
    { mail: email },
  )

  res.status(200).end()
}
