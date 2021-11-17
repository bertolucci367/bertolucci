import Layout from '~/components/Layout'
import GraphImg from 'graphcms-image'
import { BsDownload } from 'react-icons/bs'
import { gcms } from '~/services/gcms'
import { parseCookies } from 'nookies'
import { USER_TOKEN } from '~/components/libs/constants'
import { redirectsNoUser } from '~/services/auth'
import { ListUL } from '~/components/products/List'
import Card from '~/components/Card'

const query = `
query ProductsAndFiles {
  values: products(
    stage: PUBLISHED
    where: {files_every: {}}
  ) {
    id
    name
    photo(first: 1) {
      handle
      height
      width
      alt
    }

    files {
      id
      name
      asset {
        id
        handle
        height
        width
        alt
        url
      }
    }
  }
}
`

export default function FilesList({ values }) {
  return (
    <Layout title="catálogo">
      <main className="grid-in-l lg:grid-in-main">
        <div className={`mb-36 grid gap-x-20 items-start`}>
          <ul className={ListUL}>
            {values.map(item => (
              <Card
                key={item.slug}
                photo={item.photo}
                title={item.name}
                path={`/`}
                compare={true}
                classNameImage="img-grayscale opacity-50"
              >
                <div className="flex justify-center my-4">
                  <ul>
                    {item.files.map(({ id, name, asset }) => {
                      const { url } = asset[0]
                      return (
                        <li key={id}>
                          <a
                            href={url}
                            target="_blank"
                            className="flex items-center cursor-pointer "
                          >
                            <BsDownload className="text-18px mr-4" />
                            {name}
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </Card>
            ))}
          </ul>
        </div>
      </main>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { [USER_TOKEN]: token } = parseCookies(context)

  if (!token) {
    return redirectsNoUser()
  }

  const { values } = await gcms.request(query)

  return {
    props: { values },
  }
}
