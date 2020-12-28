import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import xw from 'xwind'

export default ({ href, children }) => {
  const router = useRouter()
  const {
    props: { className },
  } = children
  let style = {}
  if (router.pathname === href) {
    style = xw`border-b border-solid border-black`
  }

  return (
    <Link href={href}>
      {React.cloneElement(children, { className, style })}
    </Link>
  )
}
