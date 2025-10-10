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
}

export const historyQueryKeys = {
  getHistories: () => ['histories'],
  getHistory: (historyId) => ['history', historyId],
}

export const areaQueryKeys = {
  getAreas: () => ['areas'],
  getOneArea: (areaId) => ['area', areaId],
}
