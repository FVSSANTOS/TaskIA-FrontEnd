import { useCallback, useEffect, useState } from "react";
import { getAllColumns } from "../services/columnServices";
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../services/TaskServices";
import { adaptTasksToKanban } from "../services/Adapter";
import Sidebar from "./components/Sidebar";
import { Kanban, KanbanBoard, KanbanOverlay } from "./components/reui/kanban";
import { TaskColumn } from "./components/kanban/TaskColumn";
import "./App.css";

function App() {
  const [columns, setColumns] = useState([]);
  const [groupedTasks, setGroupedTasks] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadBoard = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const [columnsData, tasksData] = await Promise.all([
        getAllColumns(),
        getAllTasks(),
      ]);

      setColumns(columnsData || []);
      setGroupedTasks(adaptTasksToKanban(columnsData || [], tasksData || []));
    } catch (loadError) {
      console.error("Error loading board:", loadError);
      setError(
        "Não foi possível carregar o quadro. Verifique a conexão com o backend.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    loadBoard();
  }, [loadBoard]);

  const handleCreateTask = useCallback((columnId) => {
    const id = `temp-${Date.now()}`;
    const task = {
      id,
      title: "",
      description: "",
      priority: "low",
      columnId,
      createdBy: "Você",
      assignedTo: "Você",
      createdAt: new Date().toISOString(),
      updatedAt: null,
      isEditing: true,
    };

    setGroupedTasks((prev) => ({
      ...prev,
      [columnId]: [task, ...(prev[columnId] || [])],
    }));
  }, []);

  const handleUpdateTask = useCallback(async (columnId, taskId, updates) => {
    if (String(taskId).startsWith("temp-")) {
      const payload = {
        ...updates,
        columnId,
        title: updates.title || "Nova tarefa",
        description: updates.description || "",
        createdBy: updates.createdBy || "Você",
        assignedTo: updates.assignedTo || "Você",
        createdAt: updates.createdAt || new Date().toISOString(),
      };

      if (updates.priority !== undefined) {
        payload.priority = updates.priority;
      }

      try {
        const createdTask = await createTask(payload);
        setGroupedTasks((prev) => ({
          ...prev,
          [columnId]: (prev[columnId] || []).map((task) =>
            task.id === taskId ? createdTask : task,
          ),
        }));
      } catch (createError) {
        console.error("Error creating task:", createError);
        setError("Não foi possível criar a tarefa. Tente novamente.");
      }

      return;
    }

    try {
      const updatedTask = await updateTask(taskId, {
        ...updates,
        columnId,
      });

      setGroupedTasks((prev) => ({
        ...prev,
        [columnId]: (prev[columnId] || []).map((task) =>
          task.id === taskId ? updatedTask : task,
        ),
      }));
    } catch (updateError) {
      console.error("Error updating task:", updateError);
      setError("Não foi possível atualizar a tarefa. Tente novamente.");
    }
  }, []);

  const handleDeleteTask = useCallback(async (columnId, taskId) => {
    if (String(taskId).startsWith("temp-")) {
      setGroupedTasks((prev) => ({
        ...prev,
        [columnId]: (prev[columnId] || []).filter((task) => task.id !== taskId),
      }));
      return;
    }

    try {
      await deleteTask(taskId);
      setGroupedTasks((prev) => ({
        ...prev,
        [columnId]: (prev[columnId] || []).filter((task) => task.id !== taskId),
      }));
    } catch (deleteError) {
      console.error("Error deleting task:", deleteError);
      setError("Não foi possível excluir a tarefa. Tente novamente.");
    }
  }, []);

  const handleMoveTask = useCallback(
    ({ activeContainer, activeIndex, overContainer, overIndex }) => {
      setGroupedTasks((prev) => {
        const sourceTasks = [...(prev[activeContainer] || [])];
        const targetTasks = [...(prev[overContainer] || [])];
        const [movedTask] = sourceTasks.splice(activeIndex, 1);

        if (!movedTask) {
          return prev;
        }

        const movedTaskWithColumn = {
          ...movedTask,
          columnId: overContainer,
        };

        targetTasks.splice(overIndex, 0, movedTaskWithColumn);

        const next = {
          ...prev,
          [activeContainer]: sourceTasks,
          [overContainer]: targetTasks,
        };

        if (
          activeContainer !== overContainer &&
          !String(movedTask.id).startsWith("temp-")
        ) {
          updateTask(movedTask.id, movedTaskWithColumn).catch((moveError) => {
            console.error("Error moving task:", moveError);
            setError("Falha ao mover a tarefa. Tente novamente.");
          });
        }

        return next;
      });
    },
    [],
  );

  return (
    <div className="grid h-screen grid-cols-[auto_1fr] grid-rows-1 [grid-template-areas:'sidebar_main']">
      <Sidebar className="[grid-area:sidebar] w-64 bg-gray-100 dark:bg-gray-800" />

      <main className="[grid-area:main] overflow-auto p-4">
        {error && (
          <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex min-h-[320px] items-center justify-center rounded-3xl border border-dashed border-muted p-8 text-sm font-medium text-muted-foreground">
            Carregando quadro...
          </div>
        ) : (
          <Kanban
            value={groupedTasks}
            onValueChange={setGroupedTasks}
            getItemValue={(item) => item.id}
            onMove={handleMoveTask}
          >
            <KanbanBoard className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
        )}
      </main>
    </div>
  );
}

export default App;
