import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import xw from 'xwind'
import styled from '@emotion/styled'
import Image from 'next/image'

const Title = styled.h2(xw`font-medium text-13px`)

const FieldWrap = styled.div([
  xw`text-left text-13px`,
  {
    ['input, textarea']: xw`border border-solid border-black w-full px-2 py-1`,
    ['label']: xw`mt-4 block font-medium`,
  },
])

interface IFormInput {
  name: String
  nickname: string
  email: string
  to: string
  message: string
}

const CompareForm = () => {
  const router = useRouter()

  if (router.asPath !== '/produtos/comparar') {
    return <></>
  }

  const { register, handleSubmit } = useForm<IFormInput>()

  const onSubmit = (data: IFormInput) => {
    console.log(data)
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
              name="nome"
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
              name="e-mail"
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
