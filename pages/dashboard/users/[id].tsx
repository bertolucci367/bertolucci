import Layout from '~/components/Layout'
import { redirectsNoUser } from '~/services/auth'
import { JWT_SECRET_KEY, USER_TOKEN } from '~/components/libs/constants'
import { parseCookies } from 'nookies'
import axios from 'axios'
import { jwtVerify } from 'jose'
import { customAlphabet } from 'nanoid'
import { useState } from 'react'

type User = {
  id: string
  name: string
  email: string
  role: Array<string>
}

const ChooseSeller = ({ sellers, selected = '' }) => {
  return (
    <select name="seller" id="choole-seeler">
      <option value=""></option>
      {sellers.map(s => (
        <option value={s.id} selected={selected === s.id}>
          {s.name}
        </option>
      ))}
    </select>
  )
}

export default function EditUser({
  name,
  email,
  phone,
  seller,
  company,
  sellers,
}) {
  const defaultChoose = seller ? seller.id : ''

  const [pwd, setPWD] = useState('')
  const [linkToActive, setLinkToActive] = useState(true)
  const [newPWD, setNewPWD] = useState(true)

  const handleGeneratePassword = () => {
    const nanoid = customAlphabet('123456789abcdef', 6)
    setPWD(nanoid())
  }

  return (
    <Layout title="usuários">
      <div className="grid-in-main">
        <h1>{name}</h1>
        <p>E-mail: {email}</p>
        <p>Telefone: {phone}</p>
        <p>Empresa: {company}</p>
        <p>
          Consultor: <ChooseSeller sellers={sellers} selected={defaultChoose} />
        </p>
        <p>
          <label htmlFor="newPWD" className="flex justify-start ">
            <span>
              <input
                type="checkbox"
                name="newPWD"
                id="newPWD"
                checked={newPWD}
                onClick={() => setNewPWD(!newPWD)}
                className="w-10"
              />
            </span>
            <span className="flex-1">Gerar nova senha?</span>
          </label>
        </p>
        <p>
          <input type="text" value={pwd} />
          <button onClick={handleGeneratePassword}>Gerar senha</button>
        </p>
        <p>
          <label htmlFor="activate" className="flex justify-start ">
            <span>
              <input
                type="checkbox"
                name="activate"
                id="activate"
                checked={linkToActive}
                onClick={() => setLinkToActive(!linkToActive)}
                className="w-10"
              />
            </span>
            <span className="flex-1">Enviar link de ativação</span>
          </label>
        </p>
      </div>
    </Layout>
  )
}

const query = `
  query Person($id: ID!) {
    person: person (where: { id: $id }) {
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
      where: { role: seller },
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

  const { data } = await axios.post(`${host}/api/graphql`, {
    query,
    variables,
  })

  return {
    props: { ...data.person, sellers: data.sellers },
  }
}
