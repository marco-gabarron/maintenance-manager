import { forwardRef } from 'react'

import InputLabel from './InputLabel'

const AreaSelect = forwardRef((props, ref) => {
  return (
    <div className="flex flex-col gap-1 text-left">
      <InputLabel htmlFor="area_id">Area</InputLabel>

      <select
        id="area_id"
        className="rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-brand-primary placeholder:text-sm placeholder:text-brand-text-gray"
        ref={ref}
        {...props}
      >
        <option value="1">Pit</option>
        <option value="2">Blocks</option>
        <option value="3">Ready-Mix</option>
        <option value="4">Precast</option>
        <option value="5">Yard</option>
      </select>
    </div>
  )
})

AreaSelect.displayName = 'AreaSelect'

export default AreaSelect
