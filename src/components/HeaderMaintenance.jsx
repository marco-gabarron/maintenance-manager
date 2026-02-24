import Button from './Button'

function HeaderMaintenance({ subtitle, title, logout }) {
  return (
    <div className="flex w-full justify-between">
      <div>
        <span className="text-xl font-semibold text-brand-primary">
          {subtitle}
        </span>
        <h2 className="text-xs font-semibold">{title}</h2>
      </div>
      <div>
        <Button color="danger" onClick={logout}>
          Log Out
        </Button>
      </div>
    </div>
  )
}

export default HeaderMaintenance
