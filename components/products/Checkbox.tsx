import Image from 'next/image'

const Checkbox = ({ fnChange, name = '', checked }) => (
  <label onClick={e => e.stopPropagation()} className="p-0 flex">
    {!checked && (
      <Image src="/comparar-empty.svg" layout="fixed" height="18" width="18" />
    )}
    {checked && (
      <Image src="/comparar.svg" layout="fixed" height="18" width="18" />
    )}
    <input
      name={name}
      type="checkbox"
      checked={checked}
      onChange={(e: any) => {
        if (fnChange !== undefined) fnChange(e.target.checked)
      }}
      onClick={e => e.stopPropagation()}
      className={`opacity-0 w-0 h-0 pointer-events-none hidden`}
    />
  </label>
)

export default Checkbox
