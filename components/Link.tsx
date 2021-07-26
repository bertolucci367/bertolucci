import React, { Children } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const isActive = ({ path, href }) => {
  const re = new RegExp(`^${href}`, 'i')
  return re.test(path)
}

const ActiveLink = ({ href, children, activeClassName, ...props }) => {
  const { asPath } = useRouter()
  const child = Children.only(children)
  const childClassName = child.props.className || ''

  // pages/index.js will be matched via props.href
  // pages/about.js will be matched via props.href
  // pages/[slug].js will be matched via props.as
  const className =
    asPath === href || asPath === props.as
      ? `${childClassName} ${activeClassName}`.trim()
      : `pest2 ${childClassName}`

  return (
    <Link href={href} {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  )
}
export default ActiveLink
