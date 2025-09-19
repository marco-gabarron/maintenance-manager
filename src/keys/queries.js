export const taskQueryKeys = {
  getAll: () => ['tasks'],
  getOne: (taskId) => ['task', taskId],
}

export const pitQueryKeys = {
  getPit: () => ['maintenance'],
}

export const machineQueryKeys = {
  getHistories: (machineId) => ['histories', machineId],
  getHistory: (historyId) => ['history', historyId],
  getAll: () => ['machines'],
  getOne: (machineId) => ['machine', machineId],
}