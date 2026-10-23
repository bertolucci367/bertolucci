import { useCallback, useEffect, useRef, useState } from 'react'
import Layout from '~/components/Layout'

// Adicione as novas imagens aqui
const slidesMobile = [
  { src: '/imgs/home/colecao-70-anos.jpeg', alt: 'Coleção 70 Anos' },
  { src: '/imgs/home/colecao-1.jpeg', alt: 'Coleção 1' },
  { src: '/imgs/home/colecao-2.jpeg', alt: 'Coleção 2' },
  { src: '/imgs/home/colecao-3.jpeg', alt: 'Coleção 3' },
]

const slidesDesktop = [
  { src: '/imgs/home/colecao-70-anos-desktop.jpeg', alt: 'Coleção 70 Anos' },
  { src: '/imgs/home/colecao-1-desktop.jpeg', alt: 'Coleção 1' },
]

const LOCK_MS = 900

// null até montar no cliente, para não baixar as imagens do breakpoint errado
const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null)
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(mql.matches)
    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [])
  return isDesktop
}

const Index = ({ data }) => {
  const isDesktop = useIsDesktop()
  const slides = isDesktop ? slidesDesktop : slidesMobile
  const [current, setCurrent] = useState(0)
  const prevRef = useRef(0)
  const prev = prevRef.current
  useEffect(() => {
    prevRef.current = current
  }, [current])
  const locked = useRef(false)
  const touchStart = useRef<number | null>(null)

  const go = useCallback((dir: number) => {
    if (locked.current) return
    setCurrent((c) => {
      const next = c + dir
      if (next < 0 || next >= slides.length) return c
      locked.current = true
      setTimeout(() => (locked.current = false), LOCK_MS)
      return next
    })
  }, [slides])

  useEffect(() => {
    prevRef.current = 0
    setCurrent(0)
  }, [isDesktop])

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 10) return
      go(e.deltaY > 0 ? 1 : -1)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') go(1)
      if (e.key === 'ArrowUp' || e.key === 'PageUp') go(-1)
    }
    window.addEventListener('wheel', onWheel)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
    }
  }, [go])

  return (
    <Layout>
      <div
        className="fixed inset-x-0 top-[70px] bottom-[83px] overflow-hidden 
                 bg-black lg:top-[9rem] lg:bottom-[116px]
                 max-w-layout mx-auto"
        onTouchStart={(e) => (touchStart.current = e.touches[0].clientY)}
        onTouchEnd={(e) => {
          if (touchStart.current === null) return
          const diff = touchStart.current - e.changedTouches[0].clientY
          touchStart.current = null
          if (Math.abs(diff) > 50) go(diff > 0 ? 1 : -1)
        }}
      >
        {isDesktop !== null &&
          slides.map((slide, i) => (
            <img
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                i === current
                  ? 'z-[2] opacity-100'
                  : i === prev
                    ? 'z-[1] opacity-100'
                    : 'z-0 opacity-0'
              }`}
            />
          ))}

        <div className="absolute right-4 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-3">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              aria-label={`Ir para ${slide.alt}`}
              onClick={() => setCurrent(i)}
              className={`h-3 w-3 rounded-full border border-white transition-colors ${
                i === current ? 'bg-white' : 'bg-transparent'
              }`}
            />
          ))}
        </div>
      </div>
    </Layout>
  )
}


export default Index
