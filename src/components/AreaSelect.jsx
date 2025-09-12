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

const AreaSelect = forwardRef((props, ref) => {
  return (
    <div className="flex flex-col gap-1 text-left">
      <InputLabel htmlFor="area">Area</InputLabel>

      <select
        id="area"
        className="outline-brand-primary placeholder:text-brand-text-gray rounded-lg border border-solid border-[#ECECEC] px-4 py-3 placeholder:text-sm"
        ref={ref}
        {...props}
      >
        <option value="Pit">Pit</option>
        <option value="Concrete">Concrete</option>
        <option value="Blocks">Blocks</option>
        <option value="Precast">Precast</option>
        <option value="Yard">Yard</option>
      </select>
    </div>
  )
})

AreaSelect.displayName = 'AreaSelect'

export default AreaSelect
