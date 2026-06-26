import { useEffect, useState } from "react";
import { KanbanItem, KanbanItemHandle } from "@/components/reui/kanban";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog } from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { Pencil } from "lucide-react";

export function TaskCard({ task, column, onUpdateTask, onRemoveTask }) {
  const [isEditing, setIsEditing] = useState(!!task.isEditing);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState(task.title || "");
  const [description, setDescription] = useState(task.description || "");
  const [createdAt, setCreatedAt] = useState(task.createdAt || new Date().toISOString());

  useEffect(() => {
    setIsEditing(!!task.isEditing);
    setTitle(task.title || "");
    setDescription(task.description || "");
    setCreatedAt(task.createdAt || new Date().toISOString());
  }, [task]);

  function formatCreatedAt(value) {
    try {
      return new Date(value).toLocaleString([], {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return value;
    }
  }

  function formatDateFull(value) {
    try {
      return new Date(value).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    } catch {
      return value;
    }
  }

  function handleSave() {

    const updates = {
      title: title || "Untitled",
      description,
      createdAt: task.createdAt || createdAt,
      createdBy: task.createdBy || "Current User",
      assignedTo: task.assignedTo || "Current User",
      updatedAt: new Date().toISOString(),
      isEditing: false,
    };
    if(String(task.id).startsWith("temp-")){
      updates.id = task.id.replace("temp-", "");
    }
    
    onUpdateTask?.(column, task.id, updates);
    setIsEditing(false);
  }

  function handleCancel() {
    if (String(task.id).startsWith("temp-")) {
      onRemoveTask?.(column, task.id);
      return;
    }

    onUpdateTask?.(column, task.id, { isEditing: false });
    setIsEditing(false);
  }

  function handleDelete() {
    const ok = window.confirm("Tem certeza que deseja excluir esta task?");
    if (!ok) return;
    onRemoveTask?.(column, task.id);
  }

  function handleEdit() {
    setIsEditing(true);
  }

  if (isEditing) {
    return (
      <KanbanItem value={task.id}>
        <KanbanItemHandle>
          <Card className="bg-card border border-border shadow-sm hover:shadow-md transition">
            <CardContent className="p-3 space-y-3">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => e.stopPropagation()}
                placeholder="Título"
                className="w-full p-2 border rounded"
              />

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onKeyDown={(e) => e.stopPropagation()}
                placeholder="Descrição (opcional)"
                className="w-full p-2 border rounded h-20"
              />

              <input
                value={formatCreatedAt(createdAt)}
                readOnly
                className="w-full p-2 border rounded bg-slate-100 text-slate-600"
                aria-label="Data de criação"
                style={{ display: "none" }}
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
    <>
      <KanbanItem value={task.id}>
        <KanbanItemHandle>
          <Card 
            className="bg-card border border-border shadow-sm hover:shadow-md transition cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <CardContent className="p-3 space-y-2">
              {/* Prioridade e Esforço (IA) */}
              <div className="flex items-center justify-between gap-2">
                {task.effort ? (
                  <Badge variant="outline" className="text-xs flex items-center gap-1 font-mono text-muted-foreground bg-muted/40">
                    ⏱️ {task.effort}
                  </Badge>
                ) : (
                  <div></div>
                )}
                <Badge
                  className={`flex ml-auto text-xs font-bold text-white ${
                    task.priority === "Alta" || task.priority === "high"
                      ? "bg-red-500"
                      : task.priority === "Média" || task.priority === "medium"
                      ? "bg-yellow-500"
                      : "bg-green-600"
                  }`}
                  variant="secondary"
                >
                  {task.priority}
                </Badge>
              </div>

              {/* Título e Ações */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium flex-1 truncate">{task.title}</span>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Button
                    size="icon-xs"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete();
                    }}
                    aria-label="Excluir task"
                  >
                    <Trash2 size={14} />
                  </Button>
                  <Button
                    size="icon-xs"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit();
                    }}
                    aria-label="Editar task"
                  >
                    <Pencil size={14} />
                  </Button>
                </div>
              </div>

              {/* Criador e Data de Criação */}
              <div className="flex items-center gap-2 justify-between">
                {/* Criador */}
                {task.createdBy && (
                  <div className="flex items-center gap-1 flex-1 min-w-0">
                    <Avatar className="size-5 flex-shrink-0">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${task.createdBy}`} alt={task.createdBy} />
                      <AvatarFallback className="text-xs">{task.createdBy?.[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground truncate" title={task.createdBy}>{task.createdBy}</span>
                  </div>
                )}

                {/* Data de Criação */}
                <Badge variant="outline" className="text-xs whitespace-nowrap flex-shrink-0">
                  {formatDateFull(createdAt)}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </KanbanItemHandle>
      </KanbanItem>

      {/* Modal com Descrição */}
      <Dialog 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={task.title}
      >
        <div className="space-y-6">
          {/* Descrição */}
          {task.description ? (
            <div>
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">Descrição</h3>
              <p className="text-base text-foreground whitespace-pre-wrap leading-relaxed">{task.description}</p>
            </div>
          ) : (
            <p className="text-base text-muted-foreground italic">Sem descrição</p>
          )}

          {/* Metadados */}
          <div className="pt-6 border-t border-border space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground font-medium">Prioridade</span>
              <Badge className={`text-xs font-semibold px-3 py-1 text-white ${
                task.priority === "Alta" || task.priority === "high"
                  ? "bg-red-500"
                  : task.priority === "Média" || task.priority === "medium"
                  ? "bg-yellow-500"
                  : "bg-green-600"
              }`}>
                {task.priority}
              </Badge>
            </div>
            {task.effort && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground font-medium">Esforço Estimado (IA)</span>
                <span className="text-base font-semibold font-mono flex items-center gap-1">⏱️ {task.effort}</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground font-medium">Criador</span>
              <span className="text-base font-semibold">{task.createdBy || "Desconhecido"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground font-medium">Data de Criação</span>
              <span className="text-base font-semibold">{formatDateFull(createdAt)}</span>
            </div>
            {task.assignedTo && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground font-medium">Responsável</span>
                <span className="text-base font-semibold">{task.assignedTo}</span>
              </div>
            )}
          </div>
        </div>
      </Dialog>
    </>
  );
}
