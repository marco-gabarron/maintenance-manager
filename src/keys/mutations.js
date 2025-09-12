export const taskMutationKeys = {
  add: () => ['add-task'],
  update: (taskId) => ['update-task', taskId],
  delete: (taskId) => ['delete-task', taskId],
}

export const machineMutationKeys = {
  add: () => ['add-machine'],
  update: (taskId) => ['update-machine', taskId],
  delete: (taskId) => ['delete-machine', taskId],
}