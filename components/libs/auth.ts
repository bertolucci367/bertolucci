import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import { SignJWT, jwtVerify } from 'jose'
import { USER_TOKEN, JWT_SECRET_KEY } from './constants'
import { jsonResponse } from './utils'
import { setCookie } from 'nookies'
import bcrypt from 'bcrypt'

type User = {
  id: string
  name: string
  email: string
  role: Array<string>
}

interface UserJwtPayload {
  jti: string
  iat: number
  exp: number
}

/**
 * Verifies the user's JWT token and returns the payload if
 * it's valid or a response if it's not.
 */
export async function verifyAuth(request: NextRequest) {
  const token = request.cookies[USER_TOKEN]

  if (!token) {
    return jsonResponse(401, { error: { message: 'Missing user token' } })
  }

  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET_KEY),
    )

    return verified.payload as UserJwtPayload
  } catch (err) {
    return jsonResponse(401, { error: { message: 'Your token has expired.' } })
  }
}

/**
 * Adds the user token cookie to a response.
 */
export async function setUserCookie(
  request: NextRequest,
  response: NextResponse,
  user: User,
) {
  const cookie = request.cookies[USER_TOKEN]

  if (!cookie) {
    const token = await new SignJWT({ user })
      .setProtectedHeader({ alg: 'HS256' })
      .setJti(nanoid())
      .setIssuedAt()
      .setExpirationTime('2h')
      .sign(new TextEncoder().encode(JWT_SECRET_KEY))

    setCookie({ res: response }, USER_TOKEN, token, {
      maxAge: 60 * 60 * 2, // 1 hour
      path: '/',
    })
  }

  return response
}

export async function getActivationToken({ id }) {
  const text = `${id}${process.env.ACTIVATION_KEY}`
  const hash = await bcrypt.hash(text, 12)
  return hash
}
