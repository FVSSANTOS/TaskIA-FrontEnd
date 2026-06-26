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
  const [columnsTasks, setColumnsTasks] = useState({});

  useEffect(() => {
    async function loadData() {
      const [columns, tasks] = await Promise.all([
        getAllColumns(),
        getAllTasks(),
      ]);

      setResponseColumn(columns);
      setResponseTasks(tasks);

      const adaptedTasks = adaptTasksToKanban(columns, tasks);
      setColumnsTasks(adaptedTasks);
    }

    loadData();
  }, []);

  useEffect(() => {
    console.log("responseColumns:", responseColumns);
    console.log("responseTasks:", responseTasks);
  }, [responseColumns, responseTasks]);
  
  

  const handleCreateTask = (column, task) => {

    setColumnsTasks((prev) => ({
      ...prev,
      [column]: [task, ...prev[column]],
    }));
  };

  useEffect(() => {
    console.log("ColumnsTasks:", columnsTasks);
  },[columnsTasks])

  const handleUpdateTask = (column, taskId, updates) => {
    console.log("column",column);
    console.log("updates",updates);
    if (taskId == 0){
      updates.id = Date.now();
      const newTask = createTask(updates).then(
      setColumnsTasks((prev) => ({
      ...prev,
      [column]: prev[column].map((task) =>
        task.id === taskId ? { ...task, ...updates} : task,
      ),
    }))
    );
    }
    else{
      const updatedTask = updateTask(taskId, updates).then(
      setColumnsTasks((prev) => ({
      ...prev,
      [column]: prev[column].map((task) =>
        task.id === taskId ? { ...task, ...updates} : task,
      ),
    }))

      )
    }

    
  };

  const handleDeleteTask = (column, taskId) => {
    const deletedTask = deleteTask(taskId).then(
      setColumnsTasks((prev) => ({
      ...prev,
      [column]: prev[column].filter((task) => task.id !== taskId),
    }))
    );
    
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
            value={columnsTasks}
            onValueChange={setColumnsTasks}
            getItemValue={(item) => item.id}
          >
            <KanbanBoard className="grid grid-cols-3 gap-6 p-6">
              {responseColumns.map((responseColumns) => (
                <TaskColumn
                  key={responseColumns.id}
                  value={responseColumns.id}
                  titulo={responseColumns.title}
                  tasks={columnsTasks[responseColumns.id] || []}
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
