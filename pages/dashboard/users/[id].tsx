import Layout from '~/components/Layout'
import { redirectsNoUser } from '~/services/auth'
import { JWT_SECRET_KEY, USER_TOKEN } from '~/components/libs/constants'
import { parseCookies } from 'nookies'
import axios from 'axios'
import { jwtVerify } from 'jose'
import { customAlphabet } from 'nanoid'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import FormMessage from '~/components/FormMessage'

type User = {
  id: string
  name: string
  email: string
  role: Array<string>
}

const ChooseSeller = ({ register, sellers, defaultValue = '' }) => {
  return (
    <select
      name="seller"
      id="choole-seeler"
      defaultValue={defaultValue}
      {...register('seller')}
    >
      <option value=""></option>
      {sellers.map(s => (
        <option key={s.id} value={s.id}>
          {s.name}
        </option>
      ))}
    </select>
  )
}

export default function EditUser({
  id,
  name,
  email,
  phone,
  seller,
  company,
  sellers,
  host,
}) {
  const [linkToActive, setLinkToActive] = useState(true)
  const [sending, setSending] = useState(false)
  const [msgStatus, setMsgStatus] = useState(0)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const handleGeneratePassword = e => {
    e.stopPropagation()
    e.preventDefault()
    const nanoid = customAlphabet('123456789abcdef', 6)
    setValue('pwd', nanoid())
  }

  const triggerEmail = async ({ userID, email, name, data }) => {
    try {
      const { pwd, sendActivation } = data

      const { data: emailData } = await axios.post(
        '/api/customer/send-activation',
        {
          userID,
          userEmail: email,
          pwd,
          sendActivation,
        },
      )

      await axios.post('/api/send-email', {
        to: email,
        subject: `Acesso ao Bertolucci.com.br`,
        message: `
          <p>Olá <b>${name}</b>,</p>
          ${emailData.msg}
          <p>Atenciosamente</p>
          <p>
            <img
              src="${host}/logo-slogan.jpeg"
              alt="bertolucci"
              width="190"
            />
          </p>
        `,
      })
    } catch (err) {
      console.log('error: ', err)
    }
  }

  const onSubmit = async data => {
    const confirm = window.confirm('Confirma o envio dos dados?')

    if (!confirm) {
      return
    }

    try {
      const res = await axios.post('/api/customer/edit', {
        userID: id,
        ...data,
      })

      await axios.post('/api/customer/publish', { id })

      triggerEmail({ userID: id, email, name, data })

      setMsgStatus(200)
      // reset()
    } catch (err) {
      setMsgStatus(404)
    } finally {
      setSending(false)
    }
  }

  return (
    <Layout title="usuários">
      <div className="grid-in-main">
        <div className="grid grid-cols-2">
          <div>
            <h1>{name}</h1>
            <p>E-mail: {email}</p>
            <p>Telefone: {phone}</p>
            <p>Empresa: {company}</p>
          </div>

          <div>
            {msgStatus === 200 && (
              <FormMessage status="success">
                dados salvo com sucesso!
              </FormMessage>
            )}
            {msgStatus === 404 && (
              <FormMessage status="error">ops... houve um erro.</FormMessage>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <p>
                Consultor:{' '}
                <ChooseSeller
                  register={register}
                  sellers={sellers}
                  defaultValue={seller?.id}
                />
              </p>
              <p>
                <label htmlFor="pwd" className="flex justify-start ">
                  <span className="flex-1">Senha:</span>
                </label>
                <span className="relative block">
                  <input
                    id="pwd"
                    type="text"
                    {...register('pwd', { required: false })}
                    className="pr-40"
                  />
                  <button
                    className="absolute right-[1px] top-0 bottom-0 bg-gray-200 px-5 my-[1px] leading-none hover:bg-black hover:text-white"
                    onClick={e => handleGeneratePassword(e)}
                  >
                    gerar senha
                  </button>
                </span>
              </p>
              <p className="py-4">
                <label htmlFor="sendActivation" className="flex justify-start ">
                  <span>
                    <input
                      type="checkbox"
                      name="sendActivation"
                      id="sendActivation"
                      onChange={() => setLinkToActive(!linkToActive)}
                      className="w-10"
                      {...register('sendActivation', { required: false })}
                    />
                  </span>
                  <span className="flex-1">
                    Enviar link de ativação para o usuário?
                  </span>
                </label>
              </p>
              <p>
                <input
                  type="submit"
                  value={sending ? 'salvando...' : 'salvar'}
                  disabled={sending}
                />
              </p>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

const query = `
  query Person($id: ID!) {
    person: person (stage: DRAFT, where: { id: $id }) {
      id
      name
      email
      company
      newsletter
      phone
      seller {
        id
        name
      }
    }

    sellers: people(
      stage: PUBLISHED,
      where: { role_contains_all: seller },
      orderBy: name_ASC
    ) {
      id
      name
      email
    }
  }
  `

export async function getServerSideProps(context) {
  const { [USER_TOKEN]: token } = parseCookies(context)
  const { id } = context.query

  if (!token) {
    return redirectsNoUser()
  }

  const verified = await jwtVerify(
    token,
    new TextEncoder().encode(JWT_SECRET_KEY),
  )

  const _user = verified.payload.user as User

  if (!_user.role.includes('seller')) {
    return {
      notFound: true,
    }
  }

  const variables = { id }
  const host = process.env.SITE_URL

  const args = {
    query,
    variables,
  }

  const { data } = await axios.post(`${host}/api/graphql`, args)

  const _props = {
    ...data.person,
    sellers: data.sellers,
    host: process.env.SITE_URL,
  }

  return {
    props: _props,
  }
}
