"use client"

import type React from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

interface Task {
  id: string
  title: string
  description: string
  dueDate: string
  priority: string
  status: string
  assignee: {
    name: string
    avatar: string
    initials: string
  }
}

interface TaskListProps {
  tasks: Task[]
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
  allTasks: Task[]
}

export function TaskList({ tasks, setTasks, allTasks }: TaskListProps) {
  const { toast } = useToast()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

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

  const handleStatusChange = (taskId: string, newStatus: string) => {
    const updatedTasks = allTasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task))
    setTasks(updatedTasks)

    const taskTitle = allTasks.find((task) => task.id === taskId)?.title
    toast({
      title: "Task updated",
      description: `"${taskTitle}" moved to ${newStatus}`,
    })
  }

  const handleDeleteTask = (taskId: string) => {
    const taskTitle = allTasks.find((task) => task.id === taskId)?.title
    const updatedTasks = allTasks.filter((task) => task.id !== taskId)
    setTasks(updatedTasks)

    toast({
      title: "Task deleted",
      description: `"${taskTitle}" has been deleted`,
      variant: "destructive",
    })
  }

  return (
    <div className="space-y-4">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <Card
            key={task.id}
            className="task-card cursor-pointer rounded-xl border-none bg-card/50 shadow-sm hover:bg-card"
          >
            <CardHeader className="p-3 pb-0">
              <div className="flex items-start justify-between">
                <h3 className="font-medium text-sm line-clamp-1">{task.title}</h3>
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
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => handleStatusChange(task.id, "To Do")}>
                      Move to To Do
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleStatusChange(task.id, "In Progress")}>
                      Move to In Progress
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleStatusChange(task.id, "On Hold")}>
                      Move to On Hold
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleStatusChange(task.id, "Completed")}>
                      Move to Completed
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive" onSelect={() => handleDeleteTask(task.id)}>
                      Delete task
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="p-3 pt-2">
              <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>
              <div className="mt-2">
                <Badge
                  variant="outline"
                  className={`rounded-lg px-2 py-0.5 ${getPriorityColor(task.priority)} text-xs`}
                >
                  {task.priority}
                </Badge>
              </div>
            </CardContent>
            <CardFooter className="p-3 pt-0 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} alt={task.assignee.name} />
                  <AvatarFallback className="text-[10px]">{task.assignee.initials}</AvatarFallback>
                </Avatar>
              </div>
              {task.dueDate && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(task.dueDate)}</span>
                </div>
              )}
            </CardFooter>
          </Card>
        ))
      ) : (
        <div className="rounded-xl border border-dashed p-6 text-center bg-muted/30">
          <p className="text-sm text-muted-foreground">No tasks in this column</p>
        </div>
      )}
    </div>
  )
}
