import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Calendar } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface TaskCardProps {
  title: string
  description: string
  dueDate: string
  priority: "High" | "Medium" | "Low"
  status: "To Do" | "In Progress" | "Completed" | "On Hold"
  assignee: {
    name: string
    avatar: string
    initials: string
  }
}

export function TaskCard({ title, description, dueDate, priority, status, assignee }: TaskCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-destructive bg-destructive/15 border-destructive/20"
      case "Medium":
        return "text-amber-500 bg-amber-500/15 border-amber-500/20"
      case "Low":
        return "text-primary bg-primary/15 border-primary/20"
      default:
        return "text-muted-foreground bg-muted"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "To Do":
        return "text-slate-500 bg-slate-500/15 border-slate-500/20"
      case "In Progress":
        return "text-blue-500 bg-blue-500/15 border-blue-500/20"
      case "Completed":
        return "text-primary bg-primary/15 border-primary/20"
      case "On Hold":
        return "text-amber-500 bg-amber-500/15 border-amber-500/20"
      default:
        return "text-muted-foreground bg-muted"
    }
  }

  return (
    <Card className="task-card overflow-hidden rounded-xl border-none bg-card/50 shadow-sm hover:bg-card">
      <CardHeader className="p-4 pb-1">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base">{title}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Task menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Edit task</DropdownMenuItem>
              <DropdownMenuItem>Change status</DropdownMenuItem>
              <DropdownMenuItem>Reassign</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Delete task</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-1">
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="outline" className={`rounded-lg px-2 py-1 ${getStatusColor(status)}`}>
            {status}
          </Badge>
          <Badge variant="outline" className={`rounded-lg px-2 py-1 ${getPriorityColor(priority)}`}>
            {priority}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={assignee.avatar || "/placeholder.svg"} alt={assignee.name} />
            <AvatarFallback>{assignee.initials}</AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">{assignee.name}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>{dueDate}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
