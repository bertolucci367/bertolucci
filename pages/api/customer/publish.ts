import { GraphQLClient } from 'graphql-request'
import { PublishCustomerQuery } from '~/graphcms/index'

const gcms = new GraphQLClient(process.env.GRAPHCMS_API, {
  headers: {
    authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
  },
})

export default async function handler(req, res) {
  const { id } = req.body
  const resCMS = await gcms.request(PublishCustomerQuery, {
    id,
  })

  res.status(200).end()
}
