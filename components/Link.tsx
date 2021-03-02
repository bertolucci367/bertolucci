import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import xw from 'xwind'

const isActive = ({ path, href }) => {
  const re = new RegExp(`^${href}`, 'i')
  return re.test(path)
}

const ActiveLink = ({ href, active, children }) => {
  const router = useRouter()
  const {
    props: { className },
  } = children
  let style = {}

  if (isActive({ path: router.pathname, href })) {
    style = xw`border-b border-solid border-black`
  }

  return (
    <Link href={href}>
      {React.cloneElement(children, { className, style })}
    </Link>
  )
}

export default ActiveLink
