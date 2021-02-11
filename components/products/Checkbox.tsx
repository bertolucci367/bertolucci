import xw from 'xwind'
import Image from 'next/image'

const Checkbox = ({ fnChange, name = '', checked }) => (
  <label onClick={(e) => e.stopPropagation()}>
    {!checked && (
      <Image src="/comparar-empty.svg" layout="fixed" height="16" width="16" />
    )}
    {checked && (
      <Image src="/comparar.svg" layout="fixed" height="16" width="16" />
    )}
    <input
      name={name}
      type="checkbox"
      checked={checked}
      onChange={(e: any) => {
        if (fnChange !== undefined) fnChange(e.target.checked)
      }}
      onClick={(e) => e.stopPropagation()}
      css={xw`opacity-0 w-0 h-0 pointer-events-none`}
    />
  </label>
)

export default Checkbox
