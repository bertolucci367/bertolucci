import Layout from '~/components/Layout'
import React from 'react'
import LayoutLogin from '~/components/LayoutLogin'
import FormCustomer from '~/components/FormCustomer'

const Signup = () => {
  return (
    <Layout title="cadastro">
      <main className="grid-in-main relative">
        <LayoutLogin>
          <div className="w-full">
            <h1>faça seu cadastro</h1>

            <FormCustomer
              btnLabel="solicitar login"
              type="create"
              defaultValues={{
                name: '',
                phone: '',
                email: '',
                company: '',
                newsletter: false,
              }}
            />
          </div>
        </LayoutLogin>
      </main>
    </Layout>
  )
}

export default Signup
