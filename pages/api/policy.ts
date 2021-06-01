import axios from 'axios'

export default async (req, res) => {
  const _res = await axios({
    url: process.env.GRAPHCMS_API,
    method: 'post',
    data: {
      query: `
      query setup {
        cookiePolicy: cookiePolicies(first: 1, orderBy: createdAt_DESC, skip: 0) {
          updatedAt
          banner {
            html
          }
        }
      }
      `,
    },
  }).then(r => r.data)

  res.json(_res.data)
}
