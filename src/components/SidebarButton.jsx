import { NavLink } from 'react-router-dom'
import { tv } from 'tailwind-variants'

const SidebarButton = ({ children, href }) => {
  const sideBarButton = tv({
    base: 'flex items-center gap-2 px-6 py-3',
    variants: {
      mode: {
        selected: 'rounded-lg bg-[#E6F7F8] text-brand-primary',
        unselected: 'text-#35383E',
      },
    },
    defaultVariants: {
      variant: 'unselected',
    },
  })
  // const getVariantClasses = () => {
  //   if (variant === 'unselected') {
  //     return 'text-#35383E'
  //   }

  //   if (variant === 'selected') {
  //     return 'rounded-lg bg-[#E6F7F8] text-brand-primary'
  //   }
  // }
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        sideBarButton({ mode: isActive ? 'selected' : 'unselected' })
      }
      //className={`flex items-center gap-2 px-6 py-3 ${getVariantClasses()}`}
    >
      {children}
    </NavLink>
  )
}

export default SidebarButton
