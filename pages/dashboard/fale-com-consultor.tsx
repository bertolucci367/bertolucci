import Layout from '~/components/Layout'
import LayoutLogin from '~/components/LayoutLogin'
import { ConsultantsByUser } from '~/graphcms/index'
import FormConsultant from '~/components/FormConsultant'
import { useContext } from 'react'
import { AuthContext } from '~/components/context/AuthContext'
import { redirectsNoUser } from '~/services/auth'
import { USER_TOKEN } from '~/components/libs/constants'
import { parseCookies } from 'nookies'
import useSWR from 'swr'
import axios from 'axios'
import Image from 'next/image'

const fetchWithUser = async (query, user) => {
  const variables = { id: user.id }
  const res = await axios.post('/api/graphql', { query, variables })
  const { values } = res.data

  return values
}

export default function Talk() {
  const { user } = useContext(AuthContext)

  const { data, error } = useSWR(
    user ? [ConsultantsByUser, user] : null,
    fetchWithUser,
  )

  const clearPhone = (str = '') => {
    const val = str.replace(/\D/gi, '')
    return val
  }

  return (
    <Layout title="fale com consultor">
      <div className="grid-in-main">
        <LayoutLogin>
          <h1>Contate o seu consultor</h1>

          <h2>
            {data?.seller && (
              <a
                href={`https://api.whatsapp.com/send?phone=${clearPhone(
                  data.seller.phone,
                )}`}
                target="_blank"
                className="text-14px "
              >
                <span className="mr-4">Whatsapp</span>
                <Image
                  src="/whatsapp.svg"
                  layout="fixed"
                  height="18"
                  width="18"
                  alt="whatsapp icon"
                />
              </a>
            )}
          </h2>
          <hr className="my-10" />
          <h3 className="mt-10 text-14px">
            <span className="mr-4">E-mail</span>
          </h3>
          <FormConsultant
            user={user}
            consultant={data?.seller}
          ></FormConsultant>
        </LayoutLogin>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { [USER_TOKEN]: token } = parseCookies(context)

  if (!token) {
    return redirectsNoUser()
  }

  return {
    props: {},
  }
}
