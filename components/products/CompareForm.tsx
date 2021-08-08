import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { useAppContext } from '~/components/context/AppContext'
import { useState } from 'react'
import FormMessage from '~/components/FormMessage'

const Title = ({ children }) => (
  <h2 className="font-medium text-13px mb-10">{children}</h2>
)

const FieldWrap = ({ children }) => <div>{children}</div>

interface IFormInput {
  name: String
  nickname: string
  email: string
  to: string
  message: string
}

const CompareForm = () => {
  const router = useRouter()
  const shared = useAppContext()

  const reg = /\/produtos\/comparar/

  if (!reg.test(router.pathname)) {
    return <></>
  }

  const [sending, setSending] = useState(false)
  const [msgStatus, setMsgStatus] = useState(0)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data: IFormInput) => {
    const items = shared.compare.map(o => o.name)
    const _data = { ...data, products: items, url: router.asPath }
    setSending(true)
    setMsgStatus(0)
    const res = await fetch('/api/send-compare-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(_data),
    })

    setSending(false)
    setMsgStatus(res.status)
  }

  return (
    <>
      <Title>
        <div>
          <Image
            src="/email.svg"
            layout="fixed"
            height="11"
            width="15"
            alt="email icon"
          />
        </div>
        <span>enviar por e-mail</span>
      </Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        {msgStatus === 200 && (
          <FormMessage status="success">sucesso!</FormMessage>
        )}
        {msgStatus === 404 && (
          <FormMessage status="error">
            ops... tente mais tarde ou entre em contato por telefone.
          </FormMessage>
        )}
        <FieldWrap>
          <label htmlFor="form-name">*Meu nome:</label>
          <input
            id="form-name"
            name="name"
            placeholder="nome"
            type="text"
            required
            {...register('name', { required: true })}
          />
          {errors.name && errors.name.type === 'required' && (
            <FormMessage status="error">{errors.name.message}</FormMessage>
          )}
          <input
            className={`hidden`}
            id="form-nickname"
            name="nickname"
            type="text"
          />
        </FieldWrap>
        <FieldWrap>
          <label htmlFor="form-email">*Meu e-mail:</label>
          <input
            id="form-email"
            name="email"
            placeholder="e-mail"
            type="email"
            required
            {...register('email', { required: true })}
          />
        </FieldWrap>
        <FieldWrap>
          <label htmlFor="form-to">*Para:</label>
          <input
            id="form-to"
            name="to"
            type="email"
            required
            defaultValue="bertolucci@bertolucci.com.br"
          />
        </FieldWrap>
        <FieldWrap>
          <label htmlFor="form-message">Mensagem:</label>
          <textarea
            id="form-message"
            name="message"
            placeholder="digite sua mensagem"
            rows={5}
          ></textarea>
        </FieldWrap>
        <FieldWrap>
          <input name="commit" type="submit" value="Enviar" />
        </FieldWrap>
      </form>
    </>
  )
}

export default CompareForm
