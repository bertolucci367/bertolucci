import Link from 'next/link'
import Image from 'next/image'

const Logo = () => {
  return (
    <>
      <Link href="/">
        <a>
          <Image
            src="/logo.svg"
            layout="fixed"
            height="19"
            width="90"
            alt="bertolucci"
          />
        </a>
      </Link>
    </>
  )
}

export default Logo
