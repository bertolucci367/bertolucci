import Layout from '~/components/Layout'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import React, { useState } from 'react'
import Checkbox from '~/components/products/Checkbox'

interface IFormInput {
  name: String
  email: string
  phone: string
  company: string
  newsletter: boolean
  nickname: string
}

const Signup = () => {
  const [news, setNews] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = data => {
    console.log(data)
  }

  const handleCheckbox = ({ isChecked }: any) => {
    setNews(isChecked)
    setValue('newsletter', isChecked)
  }

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

              <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="name">*nome</label>
                <input
                  id="name"
                  placeholder="nome"
                  aria-invalid={errors.mail ? 'true' : 'false'}
                  {...register('name', { required: true })}
                />

                <label htmlFor="mail">*e-mail</label>
                <input
                  id="mail"
                  placeholder="e-mail"
                  aria-invalid={errors.name ? 'true' : 'false'}
                  {...register('mail', { required: true })}
                />

                <label htmlFor="phone">*telefone</label>
                <input
                  id="phone"
                  placeholder="telefone"
                  aria-invalid={errors.phone ? 'true' : 'false'}
                  {...register('phone', { required: true })}
                />

                <label htmlFor="company">*empresa</label>
                <input
                  id="company"
                  placeholder="empresa"
                  aria-invalid={errors.company ? 'true' : 'false'}
                  {...register('company', { required: true })}
                />

                <label htmlFor="newsletter" className="flex items-center mt-5">
                  <Checkbox
                    name="newsletter"
                    fnChange={v => handleCheckbox({ isChecked: v })}
                    checked={news}
                  >
                    {' '}
                    quero receber novidades da bertolucci{' '}
                  </Checkbox>
                </label>

                <input
                  type="submit"
                  value="solicitar login"
                  className="btn mt-10"
                />
              </form>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default Signup
