import Layout from '~/components/Layout'
import { useState } from 'react'
import { ProfileQuery } from '~/graphcms/index'
import { gcms } from '~/services/gcms'

import FormCustomer from '~/components/FormCustomer'
import FormNewPassword from '~/components/FormNewPassword'
import { JWT_SECRET_KEY, USER_TOKEN } from '~/components/libs/constants'
import { parseCookies } from 'nookies'
import { redirectsNoUser } from '~/services/auth'
import { jwtVerify } from 'jose'

type User = {
  id: string
  name: string
  email: string
  role: Array<string>
}

const Profile = ({ values, consultant }) => {
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
            {values && (
              <FormCustomer
                type="update"
                btnLabel="salvar dados"
                defaultValues={values}
              />
            )}

            <div className="mt-20">
              <button
                onClick={() => setShowChangePwd(!showChangePwd)}
                className="text-h3 mb-4 font-medium text-left hover:underline"
              >
                alterar senha
              </button>

              {showChangePwd && (
                <FormNewPassword userID={values.id} email={values.email} />
              )}
            </div>
          </div>

          <div className="col-start-3"></div>
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

  const verified = await jwtVerify(
    token,
    new TextEncoder().encode(JWT_SECRET_KEY),
  )

  const _user = verified.payload.user as User
  const { values } = await gcms.request(ProfileQuery, { id: _user.id })
  const { seller: consultant } = values

  return {
    props: { values, consultant },
  }
}

export default Profile
