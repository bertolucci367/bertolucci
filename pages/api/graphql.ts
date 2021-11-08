import { gcms } from '~/services/gcms'

export default async function handler(req, res) {
  const { query, variables } = req.body

  const data = await gcms.request(query, variables)

  res.json(data)
}
