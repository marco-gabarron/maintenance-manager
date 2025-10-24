import { forwardRef } from 'react'

import InputLabel from './InputLabel'

const StatusSelect = forwardRef((props, ref) => {
  return (
    <div className="flex flex-col gap-1 text-left">
      <InputLabel htmlFor="status">Status</InputLabel>

      <select
        id="status"
        className="rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-brand-primary placeholder:text-sm placeholder:text-brand-text-gray"
        ref={ref}
        {...props}
      >
        <option value="active">Active</option>
        <option value="inactive(replaced)">Inactive (Replaced)</option>
        <option value="inactive(breakdown)">Inactive (Breakdown)</option>
        <option value="inactive(scrapped)">Inactive (Scrapped)</option>
      </select>
    </div>
  )
})

StatusSelect.displayName = 'StatusSelect'

export default StatusSelect
