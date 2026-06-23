import { KanbanItem, KanbanItemHandle } from "@/components/reui/kanban"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function TaskCard({ task }) {
  return (
    <KanbanItem value={task.id}>
      <KanbanItemHandle>
        <Card className="bg-card border border-border shadow-sm hover:shadow-md transition">
          <CardContent className="p-3 space-y-2">
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {task.title}
              </span>

              <Badge variant="secondary">
                {task.priority}
              </Badge>
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
  )
}