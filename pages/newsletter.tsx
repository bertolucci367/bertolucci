import Layout from '~/components/Layout'
import { LogoFooter } from '~/components/Logo'
import { useForm, SubmitHandler } from 'react-hook-form'
import axios from 'axios'
import { useState } from 'react'

interface IFormInput {
  email: String
}

const Newsletter = () => {
  const { register, handleSubmit, reset } = useForm<IFormInput>()
  const [showMsg, setShowMsg] = useState(false)
  const [sending, setSending] = useState(false)

  const onSubmit: SubmitHandler<IFormInput> = async form => {
    setSending(true)
    setShowMsg(false)

    try {
      const res = await axios.post('/api/newsletter', { ...form })
      reset({ email: '' })
      setShowMsg(true)
    } finally {
      setSending(false)
    }
  }

  return (
    <Layout showCookie={false}>
      <div className="grid-in-main text-center">
        <h1 className="sr-only">Newsletter</h1>
        <div className="my-20">
          <LogoFooter />
        </div>

        <h2 className="text-h2">Fique por dentro das nossas novidades!</h2>
        <h3 className="text-h3">
          Não se preocupe, nós também não gostamos de spam.
        </h3>

        {showMsg && (
          <h4 className="bg-green-700 text-white p-4 m-10 mb-0 text-18px ">
            <span className="font-medium">TUDO CERTO!</span>
            <br />
            Em breve te enviaremos novidades.
          </h4>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="my-20 px-10 text-14px max-w-[520px] mx-auto"
        >
          <label>e-mail</label>
          <input
            {...register('email')}
            type="email"
            className="text-14px"
            required
          />
          <input
            type="submit"
            value={sending ? 'enviando...' : 'OK'}
            disabled={sending}
          />
        </form>
      </div>
    </Layout>
  )
}

export default Newsletter
