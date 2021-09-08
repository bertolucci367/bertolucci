import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import axios from 'axios'
import bcrypt from 'bcrypt'

export default NextAuth({
  pages: {
    signIn: '/login',
    newUser: '/cadastro', // New users will be directed here on first sign in (leave the property out if not of interest)
    signOut: '/',
    error: '/login', // Error code passed in query string as ?error=
  },

  // Configure one or more authentication providers
  providers: [
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',

      async authorize(credentials, req) {
        try {
          if (!credentials.email || !credentials.password) {
            return null
          }

          const { values } = await getCustomer(credentials.email)

          if (!values) {
            return null
          }

          const { password, id, name, mail: email } = values

          const match = await bcrypt.compare(credentials.password, password)

          return match ? { id, name, email } : null
        } catch (e) {
          const errorMessage = e.response.data.message
          // Redirecting to the login page with error message          in the URL
          throw new Error(errorMessage + '&email=' + credentials.email)
        }
      },
    }),
  ],

  jwt: {
    // secret: jwtSecret,
    encryption: true,
    signingKey: process.env.NEXTAUTH_SIGNIN_KEY,
    encryptionKey: process.env.NEXTAUTH_ENCRYPTION_KEY,
  },

  callbacks: {
    async session(session, user) {
      session.user_id = user.sub
      return session
    },
  },
})

const getCustomer = async mail => {
  return await axios({
    url: process.env.GRAPHCMS_API,
    method: 'post',
    data: {
      query: `
        query Customer($mail: String!) {
          values: customer (where: { mail: $mail }, stage: PUBLISHED) {
            mail
            password
            name
            id
          }
        }
      `,
      variables: {
        mail,
      },
    },
  })
    .then(r => r.data)
    .then(({ data }) => data)
}
