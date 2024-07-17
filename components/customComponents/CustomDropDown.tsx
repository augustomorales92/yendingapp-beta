import React, { useState } from 'react'
import { Option, Select, Checkbox, Typography } from '@material-tailwind/react'

interface Values {
  label: string
  value: string
}

type CustomDropDownsProps = {
  name: string
  label: string
  values?: Values[]
  type: string
  initialValue?: string | boolean
}
const CustomDropDowns = ({ name, label, values, type, initialValue }: CustomDropDownsProps) => {
  const [value, setValue] = useState(initialValue)

  const handleChange = (e: { target: any }) => {
    const { name, type, value, checked } = e.target

    const fieldValue = type === 'checkbox' ? checked : value
    setValue(fieldValue)
  }

  return (
    <>
      {type === 'checkbox' ? (
        <Checkbox
          label={
            <Typography
              color="blue-gray"
              className="flex font-medium text-white"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {label}
            </Typography>
          }
          id="show_interest"
          color="gray"
          type="checkbox"
          name={name}
          onChange={handleChange}
          checked={!!value}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          crossOrigin={undefined}
        />
      ) : (
        <Select
          label={label}
          color="gray"
          id={name}
          name={name}
          value={value as string}
          className={`${value ? 'text-white' : 'text-secondary'}`}
          onChange={(value) => handleChange({ target: { name, value } })}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {values?.map((value, i) => (
            <Option key={`value_${i}`} value={value.value}>
              {value.label}
            </Option>
          ))}
        </Select>
      )}
      <input type="hidden" name={name} value={value as string} />
    </>
  )
}

export default CustomDropDowns
