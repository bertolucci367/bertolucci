import Layout from '~/components/Layout'
import GraphImg from 'graphcms-image'
import { GraphQLClient } from 'graphql-request'
import { CatalogQuery } from '~/graphcms/index'
import { BsDownload } from 'react-icons/bs'

export default function Catalogo({ values }) {
  return (
    <Layout title="catálogo">
      <main className="grid-in-l lg:grid-in-main">
        <ul className="flex justify-center">
          {values.map(item => (
            <li key={item.id} className="w-[200px] text-center">
              <h2>{item.name}</h2>
              {item.photo && (
                <GraphImg
                  image={item.photo}
                  alt={item.photo.alt}
                  fit="crop"
                  className=""
                />
              )}

              <div className="flex justify-center my-4">
                {item.file.map(f => (
                  <a
                    key={f.id}
                    href={f.url}
                    target="_blank"
                    className="flex items-center flex-col"
                  >
                    baixar
                    <BsDownload className="text-18px" />
                  </a>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const gcms = new GraphQLClient(process.env.GRAPHCMS_API)
  const { values } = await gcms.request(CatalogQuery)

  if (!values) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      values,
    }, // will be passed to the page component as props
  }
}
