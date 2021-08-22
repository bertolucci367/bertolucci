import { IoMdCheckmarkCircle, IoMdAlert } from 'react-icons/io'

const mstatus = {
  error: `bg-red-100 text-red-700 flex items-center py-4 px-6 font-medium mb-5 w-full`,
  'error.field': `text-red-700 inline-block`,
  success: `bg-green-700 text-white flex items-center py-4 px-6 font-black mb-5 w-full`,
}

const FormMessage = ({ status, children }) => {
  return (
    <div className={mstatus[status]}>
      {status === 'success' && (
        <IoMdCheckmarkCircle style={{ fontSize: '28px' }} className={`mr-4`} />
      )}
      {status === 'error' && (
        <IoMdAlert style={{ fontSize: '28px' }} className={`mr-4`} />
      )}
      <span>{children}</span>
    </div>
  )
}

export default FormMessage
