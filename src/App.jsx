import { useState } from "react";
import { useEffect } from "react";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../services/TaskServices"; // importação da conexão
import {getAllColumns} from "../services/ColumnServices";
import adaptTasksToKanban from "../services/adapter";
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
  const [responseTasks, setResponseTasks] = useState([]);
  const [responseColumns, setResponseColumn] = useState([]);
  const [columns, setColumns] = useState({});

  useEffect(()=>{
    const dados = async () =>{
      const [tasks,columns] = await Promise.all([getAllTasks(),getAllColumns()])
      setResponseColumn(columns)
      setResponseTasks(tasks)
    }
    dados();
  }, []);

  useEffect(() => {
    const response = adaptTasksToKanban(responseColumns, responseTasks)
    setColumns(response);
  
  }, [responseColumns, responseTasks]);
  
  

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
              {Object.entries(columns).map(([key, {titulo, tasks}]) => (
                <TaskColumn
                  key={key}
                  value={titulo}
                  tasks={tasks}
                  onAddTask={handleCreateTask}
                  onUpdateTask={handleUpdateTask}
                  onRemoveTask={handleDeleteTask}
                />
              ))}
            </KanbanBoard>
            <KanbanOverlay className="bg-muted/10 rounded-md border-2 border-dashed" />
          </Kanban>
        </div>
      </div>
    </>
  );
}

export default App;
