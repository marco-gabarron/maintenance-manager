import { forwardRef } from 'react'

import InputLabel from './InputLabel'

// const TimeSelect = (props) => {
//   return (
//     <div className="flex flex-col gap-1 text-left">
//       <InputLabel htmlFor="time">Time</InputLabel>

//       <select
//         id="time"
//         className="rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-brand-primary placeholder:text-sm placeholder:text-brand-text-gray"
//         {...props}
//       >
//         <option value="morning">Morning</option>
//         <option value="afternoon">Afternoon</option>
//         <option value="evening">Evening</option>
//       </select>
//     </div>
//   )
// }

const ServiceFrequencySelect = forwardRef((props, ref) => {
  return (
    <div className="flex flex-col gap-1 text-left">
      <InputLabel htmlFor="serviceFrequency">Service Frequency</InputLabel>

      <select
        id="serviceFrequency"
        className="outline-brand-primary placeholder:text-brand-text-gray rounded-lg border border-solid border-[#ECECEC] px-4 py-3 placeholder:text-sm"
        ref={ref}
        {...props}
      >
        <option value="1month">1 Month</option>
        <option value="3month">3 Months</option>
        <option value="6month">6 Months</option>
        <option value="9month">9 Months</option>
        <option value="12month">12 Months</option>
      </select>
    </div>
  )
})

ServiceFrequencySelect.displayName = 'ServiceFrequencySelect'

export default ServiceFrequencySelect
