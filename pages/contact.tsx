import xw from 'xwind'
import { useForm } from 'react-hook-form'

function Contact({}) {
  const { register, handleSubmit, watch, errors } = useForm()
  const onSubmit = (data) => {
    console.log(data)
  }
  console.log(watch('example'))
  return (
    <div>
      <div css={xw`bg-red-900 w-full h-96`}></div>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          css={xw`bg-blue-900 w-full h-96`}
        >
          <label>Example</label>
          <input name="example" defaultValue="test" ref={register} />
          <label>ExampleRequired</label>
          <input
            name="exampleRequired"
            ref={register({ required: true, maxLength: 10 })}
          />
          {errors.exampleRequired && <p>This field is required</p>}
          <input type="submit" />
        </form>
      </div>
    </div>
  )
}

export default Contact
