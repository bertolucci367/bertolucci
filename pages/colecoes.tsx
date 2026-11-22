import Link from 'next/link'
import { useEffect } from 'react'
import { GraphQLClient } from 'graphql-request'
import Layout from '~/components/Layout'
import { useAppContext } from '~/components/context/AppContext'

const Colecoes = ({ lines }) => {
  const shared = useAppContext()
  const columnCount = 3
  const columnSize = Math.ceil(lines.length / columnCount)
  const columns = Array.from({ length: columnCount }, (_, index) =>
    lines.slice(index * columnSize, (index + 1) * columnSize),
  )

  useEffect(() => {
    shared.addData({ returnToCollections: false })
  }, [])

  const handleCollectionClick = () => {
    shared.addData({ returnToCollections: true })
  }

  return (
    <Layout title="colecoes">
      <main className="grid-in-main">
        <h1 className="sr-only">Coleções</h1>
        <div className="grid grid-cols-3 gap-x-6 px-4 lg:gap-x-10">
          {columns.map((column, index) => (
            <ul key={index}>
              {column.map(line => (
                <li key={line.slug} className="my-1">
                  <Link href={`/produtos/linhas/${line.slug}`} prefetch={false}>
                    <a
                      className="block text-14px font-medium"
                      onClick={handleCollectionClick}
                    >
                      {line.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </main>
    </Layout>
  )
}

export async function getStaticProps() {
  const gcms = new GraphQLClient(process.env.GRAPHCMS_API)
  const { values } = await gcms.request(`
    query Colecoes {
      values: lines(orderBy: name_ASC, where: { NOT: { slug: "null" } }) {
        name
        slug
      }
    }
  `)

  return {
    props: { lines: values },
  }
}

export default Colecoes
