import Layout from '~/components/Layout'
import { useState } from 'react'
import { ProfileQuery } from '~/graphcms/index'
import { GraphQLClient } from 'graphql-request'
import { getSession } from 'next-auth/react'

import FormCustomer from '~/components/FormCustomer'
import FormNewPassword from '~/components/FormNewPassword'

const Profile = ({ values, session }) => {
  const { consultant } = values
  const [showChangePwd, setShowChangePwd] = useState(false)

  return (
    <Layout title="minha conta">
      <main className="grid-in-main relative">
        <div className="grid lg:grid-cols-3 h-full gap-x-20">
          <div className="col-start-1 col-span-1 ">
            <section className="w-full self-start mb-20">
              <span className="mt-0 text-14px">consultor(a):</span>
              <h1>{consultant.name}</h1>
            </section>
          </div>

          <div className="col-start-2 col-span-1 mb-20 flex flex-col ">
            <h1 className="w-full">minha conta</h1>
            <FormCustomer
              type="update"
              btnLabel="salvar dados"
              defaultValues={values}
            />

            <div className="mt-20">
              <button
                onClick={() => setShowChangePwd(!showChangePwd)}
                className="text-h3 mb-4 font-medium text-left hover:underline"
              >
                alterar senha
              </button>

              {showChangePwd && <FormNewPassword />}
            </div>
          </div>

          <div className="col-start-3"></div>
        </div>
      </main>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  const gcms = new GraphQLClient(process.env.GRAPHCMS_API)

  const { values } = await gcms.request(ProfileQuery, { id: session.user_id })

  return {
    props: { session, values },
  }
}

export default Profile
