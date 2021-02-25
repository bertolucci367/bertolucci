import styled from '@emotion/styled'
import xw from 'xwind'

type NavProps = {
  dir?: string
}

export const SectionStyled = styled.section([
  xw`relative lg:flex lg:flex-col lg:overflow-hidden`,
  `
    @media (orientation: landscape) {
      height: calc(100vh - 40px);
    }

    @media (min-width: 1024px) {
      height: calc(100vh - 90px);
    }
  `,
])

export const ListWrapStyled = styled.div(xw`flex justify-center`)

export const ListStyled = styled.ol(xw`relative flex`)

export const NavBtnStyled = styled.a<NavProps>([
  xw`
  flex items-center z-20 h-full w-10 mb-4 px-2
  lg:relative
  `,
])

export const CloseStyled = styled.div(xw`bg-white z-30 self-end px-2`)

export const SectionInfoStyled = styled.div({
  ['@media(min-width: 1024px)']: {
    [`:hover`]: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
  },
})
