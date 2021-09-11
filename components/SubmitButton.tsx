import { ImSpinner2 } from 'react-icons/im'

export default function SubmitButton({ btnLabel, sending }) {
  return (
    <button type="submit" className="btn group" disabled={sending}>
      <span className={sending ? 'opacity-0' : 'opacity-100'}>{btnLabel}</span>
      <span
        className={`sending absolute inset-0 h-4 w-4 m-auto group-hover:text-black ${
          sending ? '' : 'hidden'
        }`}
      >
        <ImSpinner2 className="animate-spin" />
      </span>
    </button>
  )
}
