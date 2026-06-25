import { useState } from "react";
import { useEffect } from "react";
import {
  getAllColumns,

} from "../services/ColumnServices"; // importação da conexão colunas

import { getAllTasks } from "../services/TaskServices"; // importação da conexão tarefas

import Sidebar from "./components/Sidebar";
import {
  Kanban,
  KanbanBoard,
  KanbanColumn,
  KanbanColumnContent,
  KanbanColumnHandle,
  KanbanItem,
  KanbanItemHandle,
  KanbanOverlay,
} from "./components/reui/kanban";
import { TaskColumn } from "./components/kanban/TaskColumn";
import "./App.css";


function App() {
  
  const [columns, setColumns] = useState([]);
  const [groupedTasks, setGroupedTasks] = useState({});
    
  const handleCreateTask = (column, task) => {
    setColumns((prev) => ({
      ...prev,
      [column]: [task, ...prev[column]],
    }));
  };

  const handleUpdateTask = (column, taskId, updates) => {
    setColumns((prev) => ({
      ...prev,
      [column]: prev[column].map((task) =>
        task.id === taskId ? { ...task, ...updates } : task,
      ),
    }));
  };

  const handleDeleteTask = (column, taskId) => {
    setColumns((prev) => ({
      ...prev,
      [column]: prev[column].filter((task) => task.id !== taskId),
    }));
  };

  useEffect(() => {
    document.documentElement.classList.add("dark"); // ativa o dark mode
    // Para alternar, use classList.toggle('dark')
  }, []);

  useEffect(() => {
    loadBoard();
  }, []);

async function loadBoard() {
  const [columnsData, tasksData] = await Promise.all([
    getAllColumns(),
    getAllTasks(),

    
   
  ]);

  console.log("Columns Data:", columnsData);
  console.log("Tasks Data:", tasksData);
  setColumns(columnsData);

  const grouped = adaptTasksToKanban(columnsData, tasksData);
  setGroupedTasks(grouped);
}

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
              {columns.map((column) => {
                const columnTasks = groupedTasks[column.id] || [];

                return (
                  <TaskColumn
                    key={column.id}
                    column={column}
                    tasks={columnTasks}
                    onAddTask={handleCreateTask}
                    onUpdateTask={handleUpdateTask}
                    onRemoveTask={handleDeleteTask}
                  />
                );
              })}
            </KanbanBoard>
            <KanbanOverlay className="bg-muted/10 rounded-md border-2 border-dashed" />
          </Kanban>
        </div>
      </div>
    </>
  );
}

export default App;
