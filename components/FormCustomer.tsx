import { useForm } from 'react-hook-form'
import { useState } from 'react'
import axios from 'axios'
import FormMessage from '~/components/FormMessage'
import SubmitButton from './SubmitButton'

import Checkbox from '~/components/products/Checkbox'

type IFormInput = {
  name: string
  mail: string
  phone: string
  company: string
  newsletter: boolean
}

interface FormProps {
  type: 'update' | 'create'
  defaultValues?: IFormInput
  btnLabel: string
}

const FormCustomer = ({ type, defaultValues, btnLabel }: FormProps) => {
  const { newsletter } = defaultValues
  const [news, setNews] = useState(newsletter)
  const [sending, setSending] = useState(false)
  const [msgStatus, setMsgStatus] = useState(0)

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  })

  const updateSubmit = {
    update: async dataForm => {
      delete dataForm.mail

      const { id } = dataForm
      try {
        await axios.post('/api/customer/update', dataForm)
        await axios.post('/api/customer/publish', { id })
        setMsgStatus(200)
      } catch {}
    },

    create: async dataForm => {
      try {
        await axios.post('/api/customer/create', dataForm)
        setMsgStatus(200)
        reset()
        setNews(false)
      } catch {}
    },
  }

  const onSubmit = async data => {
    setSending(true)

    try {
      const submitType = await updateSubmit[type]
      await submitType(data)
    } catch (err) {
    } finally {
      setSending(false)
    }
  }

  const handleCheckbox = ({ isChecked }: any) => {
    setNews(isChecked)
    setValue('newsletter', isChecked)
  }

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      {!sending && msgStatus == 200 && (
        <FormMessage status="success">
          {type == 'update' && 'dados alterada com sucesso!'}
          {type == 'create' && (
            <>
              SUCESSO
              <br />
              <span className="font-medium">
                Em breve um dos nossos consultores entrará em contato.
              </span>
            </>
          )}
        </FormMessage>
      )}

      <div>
        <label htmlFor="name">*nome</label>
        <input
          id="name"
          placeholder="nome"
          aria-invalid={errors.mail ? 'true' : 'false'}
          {...register('name', { required: true })}
        />
      </div>

      <div>
        <label htmlFor="mail">*e-mail</label>
        <input
          id="mail"
          placeholder="e-mail"
          aria-invalid={errors.name ? 'true' : 'false'}
          disabled={type == 'update'}
          {...register('mail', { required: true })}
        />
      </div>

      <div>
        <label htmlFor="phone">*telefone</label>
        <input
          id="phone"
          placeholder="telefone"
          aria-invalid={errors.phone ? 'true' : 'false'}
          {...register('phone', { required: true })}
        />
      </div>

      <div>
        <label htmlFor="company">*empresa</label>
        <input
          id="company"
          placeholder="empresa"
          aria-invalid={errors.company ? 'true' : 'false'}
          {...register('company', { required: true })}
        />
      </div>

      <label htmlFor="newsletter" className="flex items-center mt-5">
        <Checkbox
          name="newsletter"
          fnChange={v => handleCheckbox({ isChecked: v })}
          checked={news}
        >
          {' '}
          quero receber novidades da bertolucci
        </Checkbox>
      </label>

      <div className="text-center">
        <SubmitButton sending={sending} btnLabel={btnLabel} />
      </div>
    </form>
  )
}

export default FormCustomer