import xw from 'xwind'
import { IoMdCheckmarkCircle } from 'react-icons/io'

const mstatus = {
  error: xw`text-red-700 inline-block`,
  success: xw`flex items-center bg-green-700 text-white py-4 px-6 font-black mb-5 w-full`,
}

const FormMessage = ({ status, children }) => {
  return (
    <div css={mstatus[status]}>
      {status === 'success' && (
        <IoMdCheckmarkCircle css={[xw`mr-4`, { fontSize: '28px' }]} />
      )}
      <span css={xw``}>{children}</span>
    </div>
  )
}

export default FormMessage
