import axios from 'axios'

export default async (req, res) => {
  const { slugs } = req.query

  if (!slugs || slugs === '') {
    res.json([])
    return
  }

  const _res = await axios({
    url: process.env.GRAPHCMS_API,
    method: 'post',
    data: {
      variables: { id: slugs.split(',') },
      query: `
        query Search($id: [String!]) {
          products(where: {slug_in: $id}) {
            id
            name
            code
            slug
            designer {
              name
            }
            photo {
              handle
              height
              width
              alt
            }
            lines {
              id
              slug
              name
            }
          }
        }
      `,
    },
  }).then(r => r.data)

  res.json(_res.data)
}
