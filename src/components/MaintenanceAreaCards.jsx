import MaintenanceAreaCard from '../components/MaintenanceAreaCard'

const MaintenanceAreaCards = () => {

  return (
    <div className="grid grid-cols-5 gap-6">
      <MaintenanceAreaCard
        mainText='Pit'
        secondaryText="Excavator, Dumper, Loading Shovel, Generator, Jaw, Barmax VSI, ConeCrusher"
      />
      <MaintenanceAreaCard
        mainText='Concrete'
        secondaryText="Mixer, Loading Shovel. Mini-Digger, Powerwasher"
      />
      <MaintenanceAreaCard
        mainText='Blocks'
        secondaryText="Mixer, Block, Strapper, Strapper Head, Forklift"
      />
      <MaintenanceAreaCard
        mainText='Precast'
        secondaryText="Forklift, Megacast, Pallet Handler"
      />
       <MaintenanceAreaCard
        mainText='Yard'
        secondaryText="Forklift, Compressor"
      />
       <MaintenanceAreaCard
        mainText='Archived'
        secondaryText="Status: Not Active"
      />
    </div>
      )
}

export default MaintenanceAreaCards