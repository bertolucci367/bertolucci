import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { useAppContext } from '~/components/context/AppContext'
import { useState } from 'react'
import FormMessage from '~/components/FormMessage'
import { useEffect } from 'react'

const Title = ({ children }) => (
  <h2 className="font-medium text-13px mb-10">{children}</h2>
)

const FieldWrap = ({ children, className = '' }) => (
  <div className={className}>{children}</div>
)

interface IFormInput {
  name: String
  nickname: string
  email: string
  to: string
  message: string
  ddd: string
  phone: string
  city: string
  state: string
}

const CompareForm = ({ className = '' }) => {
  const router = useRouter()
  const shared = useAppContext()

  const reg = /\/produtos\/comparar/

  if (!reg.test(router.pathname)) {
    return <></>
  }

  const [sending, setSending] = useState(false)
  const [msgStatus, setMsgStatus] = useState(0)
  const [msg, setMsg] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data: IFormInput) => {
    const items = shared.compare.map(o => `${o.name} (${o.code})`)
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

    if (res.status == 200) {
      reset()
    }
  }

  useEffect(() => {
    const text =
      'Olá, \npor gentileza, gostaria de solicitar consulta para as seguintes luminárias que estão na página.'

    setMsg(text)
  }, [])

  return (
    <div className="text-center">
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
        <span>enviar pedido de consulta</span>
      </Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        {msgStatus === 200 && (
          <FormMessage status="success">enviado com sucesso</FormMessage>
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
          <div className="flex space-x-5">
            <div className="w-1/3">
              <label htmlFor="form-ddd">*DDD:</label>
              <input
                id="form-ddd"
                name="ddd"
                placeholder="ddd"
                type="text"
                required
                maxLength={3}
                {...register('ddd', { required: true })}
              />
            </div>
            <div>
              <label htmlFor="form-phone">*Telefone:</label>
              <input
                id="form-phone"
                name="phone"
                placeholder="telefone"
                type="text"
                required
                {...register('phone', { required: true })}
              />
            </div>
          </div>

          {errors.ddd && errors.ddd.type === 'required' && (
            <FormMessage status="error">{errors.ddd.message}</FormMessage>
          )}

          {errors.phone && errors.phone.type === 'required' && (
            <FormMessage status="error">{errors.phone.message}</FormMessage>
          )}
        </FieldWrap>
        <FieldWrap>
          <div className="flex space-x-5">
            <div className="w-1/3">
              <label htmlFor="form-state">*Estado:</label>
              <input
                id="form-state"
                name="state"
                placeholder="UF"
                type="text"
                required
                maxLength={2}
                className="uppercase"
                {...register('state', { required: true })}
              />
            </div>
            <div>
              <label htmlFor="form-city">*Cidade:</label>
              <input
                id="form-city"
                name="city"
                placeholder="cidade"
                type="text"
                required
                {...register('city', { required: true })}
              />
            </div>
          </div>

          {errors.state && errors.state.type === 'required' && (
            <FormMessage status="error">{errors.state.message}</FormMessage>
          )}

          {errors.city && errors.city.type === 'required' && (
            <FormMessage status="error">{errors.city.message}</FormMessage>
          )}
        </FieldWrap>
        <FieldWrap>
          <label htmlFor="form-message">Mensagem:</label>
          <textarea
            id="form-message"
            name="message"
            placeholder="digite sua mensagem"
            rows={6}
            defaultValue={msg}
            {...register('message')}
          ></textarea>
        </FieldWrap>
        <FieldWrap>
          <input name="commit" type="submit" value="Enviar" />
        </FieldWrap>
      </form>
    </div>
  )
}

export default CompareForm
