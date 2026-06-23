import { useState } from 'react'
import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Sidebar from './components/Sidebar'
import {
  Kanban,
  KanbanBoard,
  KanbanColumn,
  KanbanColumnContent,
  KanbanColumnHandle,
  KanbanItem,
  KanbanItemHandle,
  KanbanOverlay,
} from "./components/reui/kanban"
import { TaskColumn } from "./components/kanban/TaskColumn"
import './App.css'


function App() {
  const [count, setCount] = useState(0)
  const [columns, setColumns] = useState({
    backlog: [
      { id: "1", title: "Add authentication", priority: "high" },
      { id: "2", title: "Create API", priority: "medium" },
    ],
    inProgress: [
      { id: "3", title: "Build Kanban UI", priority: "high" },
    ],
    done: [
      { id: "4", title: "Setup project", priority: "low" },
    ],
  })

  useEffect(() => {
    document.documentElement.classList.add('dark') // ativa o dark mode
    // Para alternar, use classList.toggle('dark')
  }, [])

  return (
    <>
  <div className="grid h-screen grid-cols-[auto_1fr] grid-rows-1 [grid-template-areas:'sidebar_main']">
    <Sidebar className="[grid-area:sidebar] w-64 bg-gray-100 dark:bg-gray-800" />
    
    <div className="[grid-area:main] overflow-auto p-4">
      <Kanban
        value={columns}
        onValueChange={setColumns}
        getItemValue={(item) => item.id}
      >
        <KanbanBoard className="grid grid-cols-3 gap-6 p-6">
          {Object.entries(columns).map(([key, tasks]) => (
            <TaskColumn key={key} value={key} tasks={tasks} />
          ))}
        </KanbanBoard>
         <KanbanOverlay className="bg-muted/10 rounded-md border-2 border-dashed" />
      </Kanban>
    </div>
  </div>
</>
  )
}

export default App
