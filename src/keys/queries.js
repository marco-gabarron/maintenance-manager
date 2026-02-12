export const taskQueryKeys = {
  getAll: () => ['tasks'],
  getOne: (taskId) => ['task', taskId],
}

export const pitQueryKeys = {
  getPit: () => ['maintenance'],
}

export const machineQueryKeys = {
  getAllMachines: () => ['machines'],
  getOneMachine: (machineId) => ['machine', machineId],
  getFilteredMachines: (filterKey) => ['machinesFiltered', filterKey],
}

export const historyQueryKeys = {
  getHistories: () => ['histories'],
  getHistory: (historyId) => ['history', historyId],
}

export const areaQueryKeys = {
  getAreas: () => ['areas'],
  getOneArea: (areaId) => ['area', areaId],
}

export const fileQueryKeys = {
  getFile: (fileName, originalSource) => ['file', fileName, originalSource],
}
