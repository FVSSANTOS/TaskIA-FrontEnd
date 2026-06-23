
import { KanbanColumn, KanbanColumnContent, KanbanColumnHandle } from "@/components/reui/kanban"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GripVerticalIcon } from "lucide-react"
import { TaskCard } from "./TaskCard"

const COLUMN_TITLES = {
  backlog: "Backlog",
  inProgress: "In Progress",
  review: "Review",
  done: "Done",
}

export function TaskColumn({ value, tasks }) {
  return (
    <KanbanColumn value={value}>
      
      {/* COLUMN WRAPPER */}
      <Card className="mb-2.5">

        {/* HEADER */}
        <CardHeader className="flex flex-row items-center justify-between">
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">
              {COLUMN_TITLES[value]}
            </span>

            <Badge variant="outline">
              {tasks.length}
            </Badge>
          </div>

          <KanbanColumnHandle
            render={(props) => (
              <Button {...props} size="icon-xs" variant="ghost">
                <GripVerticalIcon />
              </Button>
            )}
          />

        </CardHeader>

        {/* CONTENT */}
        <CardContent>
          <KanbanColumnContent
            value={value}
            className="flex flex-col gap-2.5"
          >
            
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}

          </KanbanColumnContent>
        </CardContent>

      </Card>
    </KanbanColumn>
  )
}