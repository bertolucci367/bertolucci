import { FormEvent, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { FiSearch } from 'react-icons/fi'

interface SearchProps {
  className?: string
  mobile?: boolean
  onNavigate?: () => void
}

const Search = ({ className = '', mobile = false, onNavigate }: SearchProps) => {
  const router = useRouter()
  const isSearchPage = router.pathname === '/produtos/busca/[q]'
  const [query, setQuery] = useState(() =>
    isSearchPage && typeof router.query.q === 'string' ? router.query.q : '',
  )
  const [expanded, setExpanded] = useState(() => !mobile && isSearchPage)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onSearchPage = router.pathname === '/produtos/busca/[q]'
    setExpanded(!mobile && onSearchPage)
    setQuery(
      onSearchPage && typeof router.query.q === 'string' ? router.query.q : '',
    )
  }, [mobile, router.pathname, router.query.q])

  useEffect(() => {
    if (expanded) inputRef.current?.focus()
  }, [expanded])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const term = query.trim()
    if (!term) return

    onNavigate?.()
    router.push(`/produtos/busca/${encodeURIComponent(term)}`)
  }

  return (
    <form
      className={`flex items-center ${
        mobile
          ? 'mx-4 my-10'
          : `mx-4px mb-1 -mt-2 overflow-hidden transition-all duration-300 ease-in-out ${
              expanded ? 'w-48' : 'w-8'
            }`
      } ${className}`}
      onSubmit={handleSubmit}
      role="search"
    >
      <label className="sr-only" htmlFor={mobile ? 'menu-search-mobile' : 'menu-search'}>
        Buscar produtos
      </label>
      {!mobile && (
        <button
          type="button"
          aria-label={expanded ? 'Fechar busca' : 'Abrir busca'}
          aria-expanded={expanded}
          aria-controls="menu-search"
          onClick={() => setExpanded(!expanded)}
          className="-mt-2 mr-1 pt-1 flex h-10 w-8 flex-shrink-0 items-center justify-center"
        >
          <FiSearch aria-hidden="true" size={18} />
        </button>
      )}
      <input
        ref={inputRef}
        id={mobile ? 'menu-search-mobile' : 'menu-search'}
        type="search"
        value={query}
        onChange={event => setQuery(event.target.value)}
        placeholder="Buscar"
        aria-label="Buscar produtos"
        aria-hidden={!mobile && !expanded}
        tabIndex={mobile || expanded ? 0 : -1}
        disabled={!mobile && !expanded}
        className={
          mobile
            ? 'search-input w-full border border-solid border-black px-3 py-2 text-18px outline-none'
            : `search-input mb-0 min-w-0 flex-1 border-b border-solid border-black py-2 text-14px outline-none transition-all duration-300 ease-in-out ${
                expanded ? 'px-2 opacity-100' : 'px-0 opacity-0'
              }`
        }
      />
    </form>
  )
}

export default Search