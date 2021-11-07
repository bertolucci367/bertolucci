import { GraphQLClient } from 'graphql-request'

const gcms = new GraphQLClient(process.env.GRAPHCMS_API)

export default async function handler(req, res) {
  const { query, variables } = req.body

  const data = await gcms.request(query, variables)

  res.json(data)
}
