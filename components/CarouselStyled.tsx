import styled from '@emotion/styled'
import xw from 'xwind'

type NavProps = {
  dir?: string
}

export const SectionStyled = styled.section([
  xw`relative lg:flex lg:flex-col lg:overflow-hidden`,
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
  animation: 'all .4s ease-in-out',
})
