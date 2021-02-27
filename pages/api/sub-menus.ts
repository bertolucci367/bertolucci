import axios from 'axios'

export default async (req, res) => {
  const _res = await axios({
    url: `https://api-us-west-2.graphcms.com/v2/ckhwru7ly4xvt01xs07jqaofg/master`,
    method: 'post',
    data: {
      query: `
        query Submenu {
          typologies(orderBy: name_ASC) {
            slug
            name
          }
          materials(orderBy: name_ASC) {
            name
            slug
          }
          designers(orderBy: name_ASC) {
            name
            slug
            photo {
              handle
              height
              width
              alt
            }
          }
          lines(orderBy: name_ASC) {
            name
            slug
          }
        }
      `,
    },
  }).then(r => r.data)
  res.json(_res.data)
}
