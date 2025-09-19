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

const ServiceSelect = forwardRef((props, ref) => {
  return (
    <div className="flex flex-col gap-1 text-left">
      <InputLabel htmlFor="service">Minor / Major</InputLabel>

      <select
        id="service"
        className="outline-brand-primary placeholder:text-brand-text-gray rounded-lg border border-solid border-[#ECECEC] px-4 py-3 placeholder:text-sm"
        ref={ref}
        {...props}
      >
        <option value="minor">Minor</option>
        <option value="major">Major</option>
      </select>
    </div>
  )
})

ServiceSelect.displayName = 'ServiceSelect'

export default ServiceSelect