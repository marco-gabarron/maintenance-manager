import { forwardRef } from 'react'

import InputLabel from './InputLabel'

const ServiceFrequencySelect = forwardRef((props, ref) => {
  return (
    <div className="flex flex-col gap-1 text-left">
      <InputLabel htmlFor="service_frequency">Service Frequency</InputLabel>

      <select
        id="service_frequency"
        className="rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-brand-primary placeholder:text-sm placeholder:text-brand-text-gray"
        ref={ref}
        {...props}
      >
        <option value="1month">1 Month</option>
        <option value="3months">3 Months</option>
        <option value="6months">6 Months</option>
        <option value="9months">9 Months</option>
        <option value="12months">12 Months</option>
      </select>
    </div>
  )
})

ServiceFrequencySelect.displayName = 'ServiceFrequencySelect'

export default ServiceFrequencySelect
