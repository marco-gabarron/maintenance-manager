import MaintenanceAreaCard from '../components/MaintenanceAreaCard'
import { useGetAreas } from '../hooks/data/use-get-area'

//Get areas from database

const MaintenanceAreaCards = () => {
  const { data: areas } = useGetAreas()
  return (
    <div>
      <h1 className="my-2 text-xl font-semibold">Areas</h1>
      <div className="grid grid-cols-5 gap-6">
        {/* map through areas from database */}
        {areas?.map((area) => (
          <MaintenanceAreaCard
            key={area.id}
            id={area.id}
            mainText={area.title}
          />
        ))}
      </div>
    </div>
  )
}

export default MaintenanceAreaCards
