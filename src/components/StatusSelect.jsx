import { forwardRef } from 'react'

import InputLabel from './InputLabel'

const StatusSelect = forwardRef((props, ref) => {
  return (
    <div className="flex flex-col gap-1 text-left">
      <InputLabel htmlFor="status">Status</InputLabel>

      <select
        id="status"
        className="outline-brand-primary placeholder:text-brand-text-gray rounded-lg border border-solid border-[#ECECEC] px-4 py-3 placeholder:text-sm"
        ref={ref}
        {...props}
      >
        <option value="active">Active</option>
        <option value="inactiveSold">Inactive (Sold)</option>
        <option value="inactiveTraded">Inactive (Traded)</option>
        <option value="inactiveScrapped">Inactive (Scrapped)</option>
      </select>
    </div>
  )
})

StatusSelect.displayName = 'StatusSelect'

export default StatusSelect
