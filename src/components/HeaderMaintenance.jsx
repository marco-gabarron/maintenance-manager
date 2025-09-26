
function HeaderMaintenance({ subtitle, title }) {
  return (
    <div className="flex w-full justify-between">
      <div>
        <span className="text-xl font-semibold text-brand-primary">
          {subtitle}
        </span>
        <h2 className="text-xs font-semibold">{title}</h2>
      </div>
    </div>
  )
}

export default HeaderMaintenance
