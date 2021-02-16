import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import xw from 'xwind'

const ListLink = ({ href, children, compare }) => {
  const router = useRouter()

  if (compare) {
    return React.cloneElement(children)
  }

  return <Link href={href}>{React.cloneElement(children)}</Link>
}

export default ListLink
