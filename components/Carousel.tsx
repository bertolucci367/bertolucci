import { useEffect, useState, useRef } from 'react'
import xw from 'xwind'
import styled from '@emotion/styled'
import Image from 'next/image'

interface SliderProps {
  slides: any
  close?: boolean
  nav?: boolean
  autoPlay?: boolean
  children?: React.ReactNode
}

const Slider = ({ slides, close, nav, autoPlay, children }: SliderProps) => {
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
    if (!autoPlay) {
      return
    }

    const timer: ReturnType<typeof setTimeout> = setTimeout(goToNext, 5000)
    return function () {
      clearTimeout(timer)
    }
  })

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
            <CloseStyled onClick={handlerClose}>
              <Image
                src="/close.svg"
                layout="fixed"
                height="16"
                width="16"
                alt="close icon"
              />
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

type NavProps = {
  dir?: string
}

const SectionStyled = styled.section([
  xw`relative lg:flex lg:flex-col lg:overflow-hidden`,
  `
    @media (min-width: 1024px) {
      height: calc(100vh - 90px);
    }
  `,
])

const ListWrapStyled = styled.div(xw`flex justify-center`)

const ListStyled = styled.ol(xw`relative flex`)

const NavBtnStyled = styled.a<NavProps>([
  xw`
  flex items-center px-2 z-20
  lg:relative
  `,
])

const CloseStyled = styled.a(xw`absolute top-1 left-0 bg-white z-30`)

const SectionInfoStyled = styled.div({
  ['@media(min-width: 1024px)']: {
    [`:hover`]: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
  },
})

const handlerClose = () => {
  console.log('close')
}

export default Slider
