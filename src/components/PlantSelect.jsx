import { forwardRef } from 'react'

import InputLabel from './InputLabel'

const PlantSelect = forwardRef((props, ref) => {
  return (
    <div className="flex flex-col gap-1 text-left">
      <InputLabel htmlFor="status">Plant</InputLabel>

      <select
        id="status"
        className="outline-brand-primary placeholder:text-brand-text-gray rounded-lg border border-solid border-[#ECECEC] px-4 py-3 placeholder:text-sm"
        ref={ref}
        {...props}
      >
        <option value="mobile">Mobile Plant</option>
        <option value="fixed">Fixed Plant</option>
      </select>
    </div>
  )
})

PlantSelect.displayName = 'PlantSelect'

export default PlantSelect