import Layout from '~/components/Layout'
import LayoutLogin from '~/components/LayoutLogin'
import { getSession } from 'next-auth/client'
import { GraphQLClient } from 'graphql-request'
import { ConsultantsByUser } from '~/graphcms/index'
import FormConsultant from '~/components/FormConsultant'

export default function Talk({ session, consultant }) {
  const { phone } = consultant

  const whatsapp = phone.replace(/\D/gi, '')

  return (
    <Layout title="fale com consultor">
      <div className="grid-in-main">
        <LayoutLogin>
          <h1>Contate o seu consultor</h1>

          <h2>
            <a
              href={`https://api.whatsapp.com/send?phone=${whatsapp}`}
              target="_blank"
              className="text-14px"
            >
              Whatsapp
            </a>
          </h2>
          <hr className="my-10" />
          <h3 className="mt-10 text-14px">E-mail</h3>
          <FormConsultant
            user={session.user}
            consultant={consultant}
          ></FormConsultant>
        </LayoutLogin>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  const gcms = new GraphQLClient(process.env.GRAPHCMS_API)

  const { values } = await gcms.request(ConsultantsByUser, {
    id: session.user_id,
  })

  return {
    props: { session, consultant: values.consultant },
  }
}
