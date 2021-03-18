import React from 'react'
import Link from 'next/link'

const ListLink = ({ href, children, compare = false }) => {
  if (compare) {
    return React.cloneElement(children)
  }

  return <Link href={href}>{React.cloneElement(children)}</Link>
}

export default ListLink
