import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'

interface SearchProps {
  className?: string
  mobile?: boolean
  onNavigate?: () => void
}

const Search = ({ className = '', mobile = false, onNavigate }: SearchProps) => {
  const router = useRouter()
  const [query, setQuery] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const term = query.trim()
    if (!term) return

    onNavigate?.()
    router.push(`/produtos/busca/${encodeURIComponent(term)}`)
  }

  return (
    <form
      className={`flex items-center ${mobile ? 'mx-4 my-10' : 'mx-4px mb-1'} ${className}`}
      onSubmit={handleSubmit}
      role="search"
    >
      <label className="sr-only" htmlFor={mobile ? 'menu-search-mobile' : 'menu-search'}>
        Buscar produtos
      </label>
      <input
        id={mobile ? 'menu-search-mobile' : 'menu-search'}
        type="search"
        value={query}
        onChange={event => setQuery(event.target.value)}
        placeholder="Buscar"
        aria-label="Buscar produtos"
        className={
          mobile
            ? 'search-input w-full border border-solid border-black px-3 py-2 text-18px outline-none'
            : 'search-input mb-0 -mt-2 w-44 border-b border-solid border-black px-2 py-2 text-14px outline-none'
        }
      />
    </form>
  )
}

export default Search