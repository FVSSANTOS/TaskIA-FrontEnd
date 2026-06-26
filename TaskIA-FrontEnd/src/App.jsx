import { useState } from "react";
import { useEffect } from "react";
import {
  getAll,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../services/apiServices"; // importação da conexão

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
  const [columns, setColumns] = useState({
    backlog: [],
    inProgress: [],
    done: [],
  });

  useEffect(() => {
    document.documentElement.classList.add("dark"); // ativa o dark mode
    
    async function fetchTasks() {
      try {
        const tasks = await getAll();
        const grouped = {
          backlog: [],
          inProgress: [],
          done: [],
        };
        tasks.forEach((task) => {
          const col = task.columnID || "backlog";
          if (grouped[col]) {
            grouped[col].push(task);
          } else {
            grouped[col] = [task];
          }
        });
        setColumns(grouped);
      } catch (err) {
        console.error("Erro ao obter tasks do backend:", err);
      }
    }
    fetchTasks();
  }, []);

  const handleCreateTask = (column, task) => {
    setColumns((prev) => ({
      ...prev,
      [column]: [task, ...prev[column]],
    }));
  };

  const handleUpdateTask = (column, taskId, updates) => {
    if (String(taskId).startsWith("temp-")) {
      const cleanId = String(taskId).replace("temp-", "");
      const taskToCreate = {
        ...updates,
        id: cleanId,
        columnID: column,
      }; 
      createTask(taskToCreate)
        .then((savedTask) => {
          setColumns((prev) => ({
            ...prev,
            [column]: prev[column].map((task) =>
              task.id === taskId ? savedTask : task
            ),
          }));
        })
        .catch((err) => {
          console.error("Erro ao criar task no backend:", err);
        });
    } else {
      const taskToUpdate = {
        ...updates,
        columnID: column,
      };
      updateTask(taskId, taskToUpdate)
        .then((savedTask) => {
          setColumns((prev) => ({
            ...prev,
            [column]: prev[column].map((task) =>
              task.id === taskId ? savedTask : task
            ),
          }));
        })
        .catch((err) => {
          console.error("Erro ao atualizar task no backend:", err);
        });
    }
  };

  const handleDeleteTask = (column, taskId) => {
    if (String(taskId).startsWith("temp-")) {
      setColumns((prev) => ({
        ...prev,
        [column]: prev[column].filter((task) => task.id !== taskId),
      }));
      return;
    }

    deleteTask(taskId)
      .then(() => {
        setColumns((prev) => ({
          ...prev,
          [column]: prev[column].filter((task) => task.id !== taskId),
        }));
      })
      .catch((err) => {
        console.error("Erro ao deletar task no backend:", err);
      });
  };

  const handleColumnsChange = (newColumns) => {
    setColumns(newColumns);

    Object.entries(newColumns).forEach(([colKey, taskList]) => {
      taskList.forEach((task) => {
        if (task.columnID !== colKey) {
          const updatedTask = { ...task, columnID: colKey };
          updateTask(task.id, updatedTask)
            .then((savedTask) => {
              setColumns((prev) => ({
                ...prev,
                [colKey]: prev[colKey].map((t) =>
                  t.id === task.id ? { ...t, columnID: colKey } : t
                ),
              }));
            })
            .catch((err) => {
              console.error(`Erro ao sincronizar drag-and-drop para a task ${task.id}:`, err);
            });
        }
      });
    });
  };

  return (
    <>
      <div className="grid h-screen grid-cols-[auto_1fr] grid-rows-1 [grid-template-areas:'sidebar_main']">
        <Sidebar className="[grid-area:sidebar] w-64 bg-gray-100 dark:bg-gray-800" />

        <div className="[grid-area:main] overflow-auto p-4">
          <Kanban
            value={columns}
            onValueChange={handleColumnsChange}
            getItemValue={(item) => item.id}
          >
            <KanbanBoard className="grid grid-cols-3 gap-6 p-6">
              {Object.entries(columns).map(([key, tasks]) => (
                <TaskColumn
                  key={key}
                  value={key}
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
