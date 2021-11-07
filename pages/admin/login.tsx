import Layout from '~/components/Layout'
import LayoutLogin from '~/components/LayoutLogin'
import FormLogin from '~/components/FormLogin'

const Login = ({ csrfToken }) => {
  return (
    <Layout title="entrar">
      <main className="grid-in-l lg:grid-in-main">
        <LayoutLogin>
          <div>
            <h1>entrar</h1>
            <FormLogin redirectTo="/admin" role="admin" />
          </div>
        </LayoutLogin>
      </main>
    </Layout>
  )
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  return {
    props: {},
  }
}

export default Login
