import Link from 'next/link'
import { LogoFooter } from '~/components/Logo'

const Footer = () => {
  return (
    <>
      <div className="hidden grid-in-f1 pb-6 lg:flex justify-center">
        <LogoFooter />
      </div>
      <div 
        data-slot="footer-links"
        className=" bg-white z-50 py-4 grid-in-f1 lg:bg-transparent lg:flex lg:items-center lg:flex-wrap lg:grid-in-f3 ">
        
        <div className="lg:text-right w-full">
          <Link href="/newsletter">
            <a className="block">Newsletter</a>
          </Link>
          <Link href="/tire-suas-duvidas">
            <a className="block">Tire suas dúvidas</a>
          </Link>
          <Link href="/politica-de-privacidade">
            <a className="block">Política de privacidade</a>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Footer
