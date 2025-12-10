// import { useGetFilteredMachines } from '@/hooks/data/use-get-filteredmachines'

import { DataTable } from './ui/data-table'

const columns = [
  {
    accessorKey: 'area',
    header: 'Area',
  },
  {
    accessorKey: 'machine_type',
    header: 'Machine Type',
  },
  {
    accessorKey: 'model',
    header: 'Model',
  },
  {
    accessorKey: 'manufacturer',
    header: 'Manufacturer',
  },
  {
    accessorKey: 'year',
    header: 'Year',
  },
  {
    accessorKey: 'hours',
    header: 'Hours',
  },
  {
    accessorKey: 'mileage',
    header: 'Mileage',
  },
  {
    accessorKey: 'serial_number',
    header: 'Serial Number',
  },
]

const SummaryTable = ({ data }) => {
  if (!data) {
    return <div>Loading...</div>
  }
  return <DataTable columns={columns} data={data} />
}

export default SummaryTable
