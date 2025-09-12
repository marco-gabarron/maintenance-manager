import PropTypes from 'prop-types'
import { tv } from 'tailwind-variants'

const Button = ({
  children,
  color = 'primary',
  size = 'small',
  className,
  ...rest
}) => {
  const button = tv({
    base: 'flex items-center justify-center gap-2 rounded-md px-3 font-semibold transition hover:opacity-75',
    variants: {
      color: {
        primary: 'bg-brand-primary text-white',
        ghost: 'bg-transparent text-brand-dark-gray',
        secondary: 'bg-brand-light-gray text-brand-dark-blue',
        danger: 'bg-brand-danger text-brand-white',
      },
      size: {
        small: 'py-1 text-xs',
        large: 'py-2 text-sm',
      },
      disabled: {
        true: 'cursor-not-allowed opacity-50 hover:opacity-50',
      },
    },
    defaultVariants: {
      color: 'primary',
      size: 'small',
    },
  })
  // const getVariantClasses = () => {
  //   if (variant === 'primary') {
  //     return 'bg-brand-primary text-white'
  //   }
  //   if (variant === 'secondary') {
  //     return 'bg-brand-light-gray text-brand-dark-blue'
  //   }
  //   if (variant === 'ghost') {
  //     return 'bg-transparent text-brand-dark-gray'
  //   }
  // }

  // const getSizeClasses = () => {
  //   if (size === 'small') {
  //     return 'py-1 text-xs'
  //   }
  //   if (size === 'medium') {
  //     return 'py-2 text-sm'
  //   }
  //   if (size === 'large') {
  //     return 'py-3 text-xl'
  //   }
  // }

  return (
    <button
      //${className}
      className={button({
        color: color,
        size: size,
        disabled: rest.disabled,
        className,
      })}
      {...rest}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['primary', 'ghost', 'secondary', 'danger']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string,
}

export default Button
