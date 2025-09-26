export const taskMutationKeys = {
  add: () => ['add-task'],
  update: (taskId) => ['update-task', taskId],
  delete: (taskId) => ['delete-task', taskId],
}

export const machineMutationKeys = {
  add: () => ['add-machine'],
  update: (machineId) => ['update-machine', machineId],
  delete: (machineId) => ['delete-machine', machineId],
}

export const historyMutationKeys = {
  add: () => ['add-history'],
  update: (historyId) => ['update-history', historyId],
  delete: (historyId) => ['delete-history', historyId],
}