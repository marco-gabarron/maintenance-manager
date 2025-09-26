import PropTypes from 'prop-types'
import { forwardRef } from 'react'

import InputErrorMessage from './InputErrorMessage'
import InputLabel from './InputLabel'

//Required when Ref required to be passed to a child component inside a component, in this case Input component to input html
const DescriptionTextArea = forwardRef(({ label, errorMessage, ...rest }, ref) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>

      <textarea
        className="rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-brand-primary placeholder:text-sm placeholder:text-brand-text-gray"
        ref={ref}
        {...rest}
      />
      {errorMessage && <InputErrorMessage>{errorMessage}</InputErrorMessage>}
    </div>
  )
})

DescriptionTextArea.displayName = 'DescriptionTextArea'
DescriptionTextArea.propTypes = {
  label: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
}

export default DescriptionTextArea
