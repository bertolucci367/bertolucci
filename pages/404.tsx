import Link from 'next/link'
import Layout from '~/components/Layout'

function NotFound() {
  return (
    <Layout title="Página não encontrada">
      <div className="grid-in-main min-h-[50vh] flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-18px font-semibold mb-3">
          404 — Página não encontrada
        </h1>
        <p className="text-14px mb-6">
          A página que você tentou acessar não existe ou foi movida.
        </p>
        <Link href="/">
          <a className="inline-block bg-black text-white px-4 py-2 text-14px rounded">
            Voltar para a página inicial
          </a>
        </Link>
      </div>
    </Layout>
  )
}

export default NotFound
