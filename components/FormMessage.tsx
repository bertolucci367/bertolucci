import xw from 'xwind'
import { IoMdCheckmarkCircle, IoMdAlert } from 'react-icons/io'

const mstatus = {
  error: xw` bg-red-100 text-red-700 flex items-center py-4 px-6 font-medium mb-5 w-full`,
  'error.field': xw`text-red-700 inline-block`,
  success: xw`bg-green-700 text-white flex items-center py-4 px-6 font-black mb-5 w-full`,
}

const FormMessage = ({ status, children }) => {
  return (
    <div css={mstatus[status]}>
      {status === 'success' && (
        <IoMdCheckmarkCircle css={[xw`mr-4 w-28`, { fontSize: '28px' }]} />
      )}
      {status === 'error' && (
        <IoMdAlert css={[xw`mr-4 w-36`, { fontSize: '28px' }]} />
      )}
      <span css={xw``}>{children}</span>
    </div>
  )
}

export default FormMessage
