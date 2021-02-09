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
  close?: boolean
  nav?: boolean
  children?: React.ReactNode
}

// const handleClose = () => {
//   console.log('close')
//   ()
// }

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

  useEffect(() => {
    if (length === 1) {
      setCurr(0)
    }
  }, [length])

  useEffect(() => {
    setTextWrapWidth(listRef.current.clientWidth)
  }, [curr, listRef?.current?.clientWidth])

  useEffect(() => {
    function handleResize() {
      setTextWrapWidth(listRef.current.clientWidth)
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!Array.isArray(slides) || length <= 0) {
    return null
  }

  return (
    <SectionStyled>
      <ListWrapStyled>
        <div css={xw`relative flex items-center`}>
          {close && (
            <CloseStyled>
              <Link href={`/produtos/linhas/ju/P920`}>
                <Image
                  src="/close.svg"
                  layout="fixed"
                  height="16"
                  width="16"
                  alt="close icon"
                />
              </Link>
            </CloseStyled>
          )}
          {nav && (
            <NavBtnStyled
              href="#"
              role="button"
              css={xw`left-0`}
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

        {nav && (
          <NavBtnStyled
            href="#"
            role="button"
            css={xw`right-0 lg:order-3`}
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
      </ListWrapStyled>

      <SectionInfoStyled>
        <div
          style={{ maxWidth: textWrapWidth ? textWrapWidth : 'auto' }}
          css={xw`mx-auto`}
        >
          {children}
        </div>
      </SectionInfoStyled>
    </SectionStyled>
  )
}

export default Carousel
