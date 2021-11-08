import Layout from '~/components/Layout'
import { DesignersQuery } from '~/graphcms/index'
import { ListUL } from '~/components/products/List'
import Card from '~/components/Card'
import { gcms } from '~/services/gcms'

const Designers = ({ designers }) => {
  return (
    <Layout title="designers">
      <div data-label="designers" className="grid-in-main">
        <ul className={ListUL}>
          {designers.map(d => (
            <Card
              key={d.slug}
              photo={d.photo}
              path={`/designers/${d.slug}`}
              title={d.name}
            ></Card>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const { values } = await gcms.request(DesignersQuery)

  if (!values) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      designers: values,
    }, // will be passed to the page component as props
  }
}

const _paths = `
query Designers {
  values: designers(where: {NOT: {slug: "null"}}) {
    id
    slug
  }
}
`

export default Designers
