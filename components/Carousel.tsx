import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  slides: any
  close?: string
  nav?: boolean
  children?: React.ReactNode
}

const NavBtn = ({ children, click, klass }) => {
  return (
    <a
      href="#"
      role="button"
      className={`flex items-center z-20 h-full w-10 mb-4 px-2 lg:relative ${klass}`}
      onClick={click}
    >
      {children}
    </a>
  )
}

const Carousel = ({ slides, close, nav, children }: Props) => {
  const [curr, setCurr] = useState(0)
  const [textWrapWidth, setTextWrapWidth] = useState(null)
  const { length } = slides
  const listRef = useRef(null)

  const goToNext = () => {
    setCurr(curr >= length - 1 ? 0 : curr + 1)
  }

  const goToPrev = () => {
    setCurr(curr === 0 ? length - 1 : curr - 1)
  }

  const getTextWrapWidth = () => listRef.current.clientWidth

  const recursiveWidth = w => {
    if (w > 0) return

    const _w = getTextWrapWidth()

    setTimeout(() => {
      setTextWrapWidth(_w)
      recursiveWidth(_w)
    }, 10)
  }

  useEffect(() => {
    if (length === 1) {
      setCurr(0)
    }
  }, [length])

  useEffect(() => {
    setTextWrapWidth(getTextWrapWidth())
  }, [curr, listRef?.current?.clientWidth])

  useEffect(() => {
    const handleResize = () => setTextWrapWidth(getTextWrapWidth())
    handleResize()
    window.addEventListener('resize', handleResize)

    recursiveWidth(getTextWrapWidth())

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!Array.isArray(slides) || length <= 0) {
    return null
  }

  return (
    <div className="relative lg:flex lg:flex-col lg:overflow-hidden">
      <div className="flex justify-center">
        <div className={`relative flex flex-col w-10`}>
          {close && (
            <div className="bg-white z-30 self-end px-2">
              <Link href={close}>
                <a>
                  <Image
                    src="/close.svg"
                    layout="fixed"
                    height="16"
                    width="16"
                    alt="close icon"
                  />
                </a>
              </Link>
            </div>
          )}
          {nav && slides.length > 1 && (
            <NavBtn click={goToPrev} klass="justify-end">
              <Image
                src="/prior.svg"
                layout="fixed"
                height="12"
                width="11"
                alt="anterior icone"
              />
            </NavBtn>
          )}
        </div>
        <ol className="relative flex" ref={listRef}>
          {slides.map((s, i) => (
            <li className={i === curr ? 'carousel active' : 'carousel'} key={i}>
              <div className={`h-full w-full overflow-hidden`}>{s}</div>
            </li>
          ))}
        </ol>

        <div className={`w-10`}>
          {nav && slides.length > 1 && (
            <NavBtn click={goToNext} klass="justify-start lg:order-3">
              <Image
                src="/next.svg"
                layout="fixed"
                height="12"
                width="11"
                alt="proximo icone"
              />
            </NavBtn>
          )}
        </div>
      </div>

      <div
        style={{ maxWidth: textWrapWidth ? textWrapWidth : 'initial' }}
        className={`mx-auto`}
      >
        {children}
      </div>
    </div>
  )
}

export default Carousel
