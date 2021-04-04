import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import xw from 'xwind'
import styled from '@emotion/styled'
import Image from 'next/image'
import { useAppContext } from '~/components/context/AppContext'

const Title = styled.h2(xw`font-medium text-13px mb-10`)

const FieldWrap = styled.div()

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

  const { register, handleSubmit } = useForm<IFormInput>()

  const onSubmit = (data: IFormInput) => {
    const items = shared.compare.map(o => o.name)
    const _data = { ...data, products: items, url: router.asPath }
    fetch('/api/send-compare-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(_data),
    })
  }

  return (
    <div css={[xw`sticky text-center hidden h-full lg:flex items-center`]}>
      <div css={xw`w-full`}>
        <Title>
          <div>
            <Image
              src="/email.svg"
              layout="fixed"
              height="11"
              width="15"
              alt="close icon"
            />
          </div>
          <span>enviar por e-mail</span>{' '}
        </Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldWrap>
            <label htmlFor="form-name">*Meu nome:</label>
            <input
              id="form-name"
              name="name"
              placeholder="nome"
              type="text"
              required
              ref={register({ required: true })}
            />
            <input
              css={xw`hidden`}
              id="form-nickname"
              name="nickname"
              type="text"
              ref={register}
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
              ref={register({ required: true })}
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
              ref={register}
            />
          </FieldWrap>
          <FieldWrap>
            <label htmlFor="form-message">Mensagem:</label>
            <textarea
              id="form-message"
              name="message"
              placeholder="digite sua mensagem"
              rows={5}
              ref={register}
            ></textarea>
          </FieldWrap>
          <FieldWrap>
            <input name="commit" type="submit" value="Enviar" />
          </FieldWrap>
        </form>
      </div>
    </div>
  )
}

export default CompareForm
