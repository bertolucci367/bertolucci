import { jwtVerify } from 'jose'
import { JWT_SECRET_KEY } from '~/components/libs/constants'

export default async (req, res) => {
  const { token } = req.body

  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET_KEY),
    )

    const { payload } = verified

    res.json({ payload })
  } catch (error) {
    res.status(401).json({ message: 'Your token has expired.' })
  }
}
