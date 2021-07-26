import Link from 'next/link'
import Image from 'next/image'

export const Logo = () => {
  return (
    <Link href="/">
      <a className={`lg:pt-3.5 hover:cursor-pointer`}>
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
  <Image src="/logo-footer.svg" layout="fixed" height="84" width="33" alt="" />
)
