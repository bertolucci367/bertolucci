import { getSession } from 'next-auth/react'

export const isAuthroized = async ({ context, role }) => {
  const data = await getSession(context)
  return role == data?.role
}
