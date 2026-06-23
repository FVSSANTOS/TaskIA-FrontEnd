import { useState } from "react";
import { KanbanItem, KanbanItemHandle } from "@/components/reui/kanban";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Pencil } from "lucide-react";

export function TaskCard({ task, column, onUpdateTask, onRemoveTask }) {
  const [editing, setEditing] = useState(!!task.isEditing);
  const [title, setTitle] = useState(task.title || "");
  const [description, setDescription] = useState(task.description || "");

  function handleSave() {
    onUpdateTask?.(column, task.id, {
      title: title || "Untitled",
      description,
      isEditing: false,
    });
    setEditing(false);
  }

  function handleCancel() {
    if (String(task.id).startsWith("temp-")) {
      onRemoveTask?.(column, task.id);
    } else {
      onUpdateTask?.(column, task.id, { isEditing: false });
      setEditing(false);
    }
  }

  function handleDelete() {
    const ok = window.confirm("Tem certeza que deseja excluir esta task?");
    if (!ok) return;
    onRemoveTask?.(column, task.id);
  }

  function handleEdit() {
    setEditing(true);
  }

  if (editing) {
    return (
      <KanbanItem value={task.id}>
        <KanbanItemHandle>
          <Card className="bg-card border border-border shadow-sm hover:shadow-md transition">
            <CardContent className="p-3 space-y-2">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título"
                className="w-full p-2 border rounded"
              />

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrição (opcional)"
                className="w-full p-2 border rounded h-20"
              />

              <div className="flex justify-end gap-2">
                <Button size="sm" variant="ghost" onClick={handleCancel}>
                  Cancelar
                </Button>
                <Button size="sm" variant="destructive" onClick={handleDelete}>
                  Excluir
                </Button>
                <Button size="sm" onClick={handleSave}>
                  Salvar
                </Button>
              </div>
            </CardContent>
          </Card>
        </KanbanItemHandle>
      </KanbanItem>
    );
  }

  return (
    <KanbanItem value={task.id}>
      <KanbanItemHandle>
        <Card className="bg-card border border-border shadow-sm hover:shadow-md transition">
          <CardContent className=" space-y-2">
            <div className="flex">
              <Badge
                className={`flex ml-auto text-sm font-bold ${
                  task.priority === "high"
                    ? "bg-red-500"
                    : task.priority === "medium"
                      ? "bg-yellow-600"
                      : "bg-green-700"
                }`}
                variant="secondary"
              >
                {task.priority}
              </Badge>
            </div>
            <div className="flex items-center justify-between ">
              <span className="text-sm font-medium">{task.title}</span>

              <div className="flex items-center gap-2">
                <Button
                  size="icon-xs"
                  variant="ghost"
                  onClick={handleDelete}
                  aria-label="Excluir task"
                >
                  <Trash2 size={14} />
                </Button>
                <Button
                  size="icon-xs"
                  variant="ghost"
                  onClick={handleEdit}
                  aria-label="Editar task"
                >
                  <Pencil size={14} />
                </Button>
              </div>
            </div>

            {task.description && (
              <p className="text-xs text-muted-foreground">
                {task.description}
              </p>
            )}
          </CardContent>
        </Card>
      </KanbanItemHandle>
    </KanbanItem>
  );
}
