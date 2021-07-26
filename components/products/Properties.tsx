const Label = ({ children }) => (
  <strong className="font-medium">{children}</strong>
)

const Value = ({ children }) => <span className="ml-2">{children}</span>

const Properties = ({ product }) => {
  const { height, depth, width, diameter } = product
  return (
    <ul className={`flex flex-wrap`}>
      {height && (
        <li className={`mr-6`}>
          <Label>H</Label>
          <Value>{height} cm</Value>
        </li>
      )}
      {width && (
        <li className={`mr-6`}>
          <Label>L</Label>
          <Value>{width} cm"</Value>
        </li>
      )}

      {diameter && (
        <li className={`mr-6`}>
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
