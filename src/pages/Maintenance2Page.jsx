import Sidebar from '../components/Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeftIcon, ChevronRightIcon } from '../assets/icons'

import { useQuery } from '@tanstack/react-query'

import { pitQueryKeys } from '../keys/queries'
import { api } from '../lib/axios'
import MachineCard from '../components/MachineCard'


const useGetPit = () => {
  return useQuery({
    queryKey: pitQueryKeys.getPit(),
    queryFn: async () => {
      const { data: pit } = await api.get('/maintenance')
      return pit
    },
  })
}


const Maintenance2Page = () => {
    const { categorie } = useParams()
    const { data: pit } = useGetPit()
  const navigate = useNavigate()

const pitMaintenance = pit?.filter((area) => area.area === categorie)
const mobilePit = pitMaintenance?.filter((machine) => machine.plant === 'mobile')
const fixedPit = pitMaintenance?.filter((machine) => machine.plant === 'fixed')

    const handleBackClick = () => {
    navigate(-1)
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        <div>
            <button
              onClick={handleBackClick}
              className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary"
            >
              <ArrowLeftIcon />
            </button>

            {/* Left Side */}
            <div className="flex items-center gap-1 text-xs">
              <Link to="/maintenance" className="cursor-pointer text-brand-text-gray">
                Maintenance
              </Link>
              <ChevronRightIcon className="text-brand-text-gray" />
              <span className="font-semibold text-brand-primary">
                {categorie}
              </span>
            </div>
            
            <h1 className="mt-2 text-xl font-semibold">Machines</h1>
          </div>

        <div className='grid grid-cols-2 gap-16'>
            <div className='text-center'>
                <h1 className='text-xl font-semibold my-2'>Mobile Plant:</h1>
                <div className="grid grid-cols-2 gap-2">
                {mobilePit?.map((machine) => (
                    <MachineCard id={machine.id} mainText={machine.title} area={categorie} />
                ))}
                </div>
            </div>
   
            <div className='text-center'>
                <h1 className='text-xl font-semibold my-2'>Fixed Plant:</h1>
                
                <div className="grid grid-cols-2 gap-2">
                    {fixedPit?.map((machine) => (
                         <MachineCard id={machine.id} mainText={machine.title} area={categorie} />
                    ))}
                </div>
            </div>

        </div>
      </div>
      </div>
  )
}

export default Maintenance2Page