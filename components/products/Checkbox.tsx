const Checkbox = ({ fnChange, name = '', checked }) => (
  <label>
    <input
      name={name}
      type="checkbox"
      checked={checked}
      onChange={(e: any) => {
        if (fnChange !== undefined) fnChange(e.target.checked)
      }}
      onClick={(e) => e.stopPropagation()}
    />
  </label>
)

export default Checkbox
