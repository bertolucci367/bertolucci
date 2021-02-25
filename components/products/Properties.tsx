import xw from 'xwind'
import styled from '@emotion/styled'

const Label = styled.label(xw`font-medium`)
const Value = styled.span(xw`ml-2`)

const Properties = ({ product }) => {
  const { height, depth, width, diameter } = product
  return (
    <ul css={xw`flex flex-wrap`}>
      {height && (
        <li css={xw`mr-6`}>
          <Label>H</Label>
          <Value>{height} cm</Value>
        </li>
      )}
      {width && (
        <li css={xw`mr-6`}>
          <Label>L</Label>
          <Value>{width} cm"</Value>
        </li>
      )}

      {diameter && (
        <li css={xw`mr-6`}>
          <Label>P</Label>
          <Value>{diameter} cm"</Value>
        </li>
      )}
      {depth && (
        <li>
          <Label>Ø</Label>
          <Value>{depth} cm"</Value>
        </li>
      )}
    </ul>
  )
}

export default Properties
