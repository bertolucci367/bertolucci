import Layout from '~/components/Layout'
import Image from 'next/image'
import React, { useState } from 'react'
import FormCustomer from '~/components/FormCustomer'

const Signup = () => {
  return (
    <Layout title="cadastro">
      <main className="grid-in-main relative">
        <div className="grid lg:grid-cols-4 h-full">
          <div className="col-start-2 col-span-1 flex items-center justify-center px-4 mb-10 lg:mb-0">
            <Image
              src="/logo-circle.jpg"
              layout="fixed"
              height="200"
              width="200"
              alt="logo bertolucci"
            />
          </div>

          <div className="col-start-3 col-span-1 mb-20 flex items-center">
            <div>
              <h1>faça seu cadastro</h1>

              <FormCustomer
                type="create"
                defaultValues={{
                  name: '',
                  phone: '',
                  mail: '',
                  company: '',
                  consultor: '',
                  newsletter: false,
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default Signup
