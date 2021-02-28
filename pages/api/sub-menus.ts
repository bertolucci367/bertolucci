import axios from 'axios'

export default async (req, res) => {
  const _res = await axios({
    url: process.env.GRAPHCMS_API,
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

  let _subItems: any[] = [..._res.data.lines]

  const dic = {}
  const subLines = []
  _subItems.forEach(item => {
    const char = item.name.charAt(0)
    dic[char] = dic[char] ? [...dic[char], item] : [item]
  })

  for (var [key, value] of Object.entries(dic)) {
    subLines.push({ name: key, title: true })

    const arr: any = value
    arr.map((item: any) => subLines.push(item))
  }

  if (subLines.length > 0) {
    _res.data.lines = subLines
  }

  res.json(_res.data)
}
