import Image from 'next/image'

interface Props {
  name: string
  fnChange: any
  className?: string
  checked: boolean
  children?: React.ReactNode
}

const Checkbox = ({
  fnChange,
  name = '',
  className,
  checked,
  children,
}: Props) => (
  <label className={`flex ${className}`} onClick={e => e.stopPropagation()}>
    <div className="self-auto w-auto mr-2">
      {!checked && (
        <Image
          src="/comparar-empty.svg"
          layout="fixed"
          height="16"
          width="16"
        />
      )}
      {checked && (
        <Image src="/comparar.svg" layout="fixed" height="16" width="16" />
      )}
    </div>
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

    {children}
  </label>
)

export default Checkbox
