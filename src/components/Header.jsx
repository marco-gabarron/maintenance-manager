import { useState } from 'react'

import { AddIcon, TrashIcon } from '../assets/icons'
import AddTaskDialog from './AddTaskDialog'
import Button from './Button'

function Header({ subtitle, title }) {
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false)
  return (
    <div className="flex w-full justify-between">
      <div>
        <span className="text-xl font-semibold text-brand-primary">
          {subtitle}
        </span>
        <h2 className="text-xs font-semibold">{title}</h2>
      </div>

      <div className="flex items-center gap-3">
        <Button color="ghost">
          Clear Tasks
          <TrashIcon />
        </Button>
        {/* If something simple, it can be passed like that () => setAddTaskDialogIsOpen(true) */}
        <Button onClick={() => setAddTaskDialogIsOpen(true)}>
          <AddIcon />
          Add New Tasks
        </Button>
        <AddTaskDialog
          isOpen={addTaskDialogIsOpen}
          // If its something more complicated its worth to use like this and create a function up there
          handleClose={() => setAddTaskDialogIsOpen(false)}
        />
      </div>
    </div>
  )
}

export default Header
