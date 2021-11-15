import { PublishPersonQuery } from '~/graphcms/index'
import { gcms } from '~/services/gcms'

export default async function handler(req, res) {
  const { id } = req.body
  const resCMS = await gcms.request(PublishPersonQuery, {
    id,
  })

  res.status(200).end()
}
