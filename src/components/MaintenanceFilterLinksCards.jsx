import MaintenanceFilterLinksCard from '../components/MaintenanceFilterLinksCard'
// import { useGetAreas } from '../hooks/data/use-get-area'

//Get areas from database

const filters = [
  {
    key: 'archived',
    title: 'Archived List',
    status: 'Inactives',
  },
  {
    key: 'summary',
    title: 'Summary List',
    status: 'All Machines List',
  },
  {
    key: 'braketest',
    title: 'Brake Test List',
    status: 'Brake Test Required',
  },
]

const MaintenanceFilterLinksCards = () => {
  //   const { data: areas } = useGetAreas()
  return (
    <div>
      <h1 className="my-2 text-xl font-semibold">Filters</h1>
      <div className="grid grid-cols-5 gap-6">
        <MaintenanceFilterLinksCard
          key={'archivedList'}
          filterKey={'archivedList'}
          mainText={'Archived'}
          statusText={'Archived Machines'}
        />
        {/* map through areas from database */}
        {filters?.map((filter) => (
          <MaintenanceFilterLinksCard
            key={filter.key}
            filterKey={filter.key}
            mainText={filter.title}
            statusText={filter.status}
          />
        ))}
      </div>
    </div>
  )
}

export default MaintenanceFilterLinksCards
