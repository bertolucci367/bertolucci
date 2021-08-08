import Link from 'next/link'
import Image from 'next/image'

interface Props {
  className?: string
}

export const Logo = ({ className }: Props) => {
  return (
    <Link href="/">
      <a className={`hover:cursor-pointer ${className}`}>
        <Image
          src="/logo.svg"
          layout="fixed"
          height="19"
          width="90"
          alt="bertolucci"
          loading="eager"
        />
      </a>
    </Link>
  )
}

export const LogoFooter = () => (
  <Image
    src="/logo-footer.svg"
    layout="fixed"
    height="84"
    width="33"
    alt="Bertolucci dedicada ao brasil desde 1956"
  />
)
