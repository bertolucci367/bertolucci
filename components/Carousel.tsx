import { useEffect, useState, useRef } from 'react'
import xw from 'xwind'
import Image from 'next/image'
import Link from 'next/link'

import {
  SectionStyled,
  ListWrapStyled,
  ListStyled,
  NavBtnStyled,
  CloseStyled,
  SectionInfoStyled,
} from '~/components/CarouselStyled'

interface Props {
  slides: any
  close?: string
  nav?: boolean
  children?: React.ReactNode
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
    <SectionStyled>
      <ListWrapStyled>
        <div css={xw`relative flex flex-col w-10`}>
          {close && (
            <CloseStyled>
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
            </CloseStyled>
          )}
          {nav && slides.length > 1 && (
            <NavBtnStyled
              href="#"
              role="button"
              css={xw`justify-end`}
              onClick={goToPrev}
            >
              <Image
                src="/prior.svg"
                layout="fixed"
                height="12"
                width="11"
                alt="anterior icone"
              />
            </NavBtnStyled>
          )}
        </div>
        <ListStyled ref={listRef}>
          {slides.map((s, i) => (
            <li className={i === curr ? 'carousel active' : 'carousel'} key={i}>
              <div css={xw`pointer-events-none h-full w-full overflow-hidden`}>
                {s}
              </div>
            </li>
          ))}
        </ListStyled>

        <div css={xw`w-10`}>
          {nav && slides.length > 1 && (
            <NavBtnStyled
              href="#"
              role="button"
              css={xw`justify-start lg:order-3`}
              onClick={goToNext}
            >
              <Image
                src="/next.svg"
                layout="fixed"
                height="12"
                width="11"
                alt="proximo icone"
              />
            </NavBtnStyled>
          )}
        </div>
      </ListWrapStyled>

      <SectionInfoStyled>
        <div
          style={{ maxWidth: textWrapWidth ? textWrapWidth : 'initial' }}
          css={[xw`mx-auto bg-white pr-2 pb-12`]}
        >
          {children}
        </div>
      </SectionInfoStyled>
    </SectionStyled>
  )
}

export default Carousel
