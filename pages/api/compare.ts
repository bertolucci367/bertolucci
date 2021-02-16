// import { NextApiRequest, NextApiResponse } from 'next'

export default async (req, res) => {
  if (req.query.slug) {
    const _res = await req.query.slug.split(',').map(async id => {
      return await fetch(`http://bertolucci.com.br/api/produtos/${id}.json`)
        .then(resp => resp.json())
        .then(({ products }) => products[0])
    })

    Promise.all(_res).then(values => {
      res.json(values)
    })

    return
  }
  res.json([])
}
