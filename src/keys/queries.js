export const taskQueryKeys = {
  getAll: () => ['tasks'],
  getOne: (taskId) => ['task', taskId],
}

export const pitQueryKeys = {
  getPit: () => ['maintenance'],
}

export const machineQueryKeys = {
  getAll: () => ['machines'],
  getOne: (machineId) => ['machine', machineId],
}