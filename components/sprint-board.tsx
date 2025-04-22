"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Task {
  id: string
  title: string
  description: string
  status: string
  priority: string
  assignee: {
    name: string
    avatar: string
    initials: string
  }
}

interface SprintBoardProps {
  tasks: Task[]
  onTaskStatusChange: (taskId: string, newStatus: string) => void
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

export function SprintBoard({ tasks, onTaskStatusChange }: SprintBoardProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div className="space-y-4">
        <h3 className="font-semibold flex items-center">
          <div className="mr-2 h-2 w-2 rounded-full bg-slate-500" />
          To Do
          <Badge className="ml-2 bg-slate-100 text-slate-500 hover:bg-slate-100 rounded-full">
            {tasks.filter((task) => task.status === "To Do").length}
          </Badge>
        </h3>
        {tasks
          .filter((task) => task.status === "To Do")
          .map((task) => (
            <Card
              key={task.id}
              className="task-card cursor-pointer rounded-xl border-none bg-card/50 shadow-sm hover:bg-card"
            >
              <CardHeader className="p-3 pb-0">
                <div className="flex items-start justify-between">
                  <h4 className="font-medium text-sm">{task.title}</h4>
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
                      <DropdownMenuItem onSelect={() => onTaskStatusChange(task.id, "In Progress")}>
                        Move to In Progress
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => onTaskStatusChange(task.id, "On Hold")}>
                        Move to On Hold
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => onTaskStatusChange(task.id, "Completed")}>
                        Move to Completed
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="p-3 pt-2">
                <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className={`rounded-lg px-2 py-0.5 ${getPriorityColor(task.priority)} text-xs`}
                  >
                    {task.priority}
                  </Badge>
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} alt={task.assignee.name} />
                    <AvatarFallback>{task.assignee.initials}</AvatarFallback>
                  </Avatar>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold flex items-center">
          <div className="mr-2 h-2 w-2 rounded-full bg-blue-500" />
          In Progress
          <Badge className="ml-2 bg-blue-100 text-blue-500 hover:bg-blue-100 rounded-full">
            {tasks.filter((task) => task.status === "In Progress").length}
          </Badge>
        </h3>
        {tasks
          .filter((task) => task.status === "In Progress")
          .map((task) => (
            <Card
              key={task.id}
              className="task-card cursor-pointer rounded-xl border-none bg-card/50 shadow-sm hover:bg-card"
            >
              <CardHeader className="p-3 pb-0">
                <div className="flex items-start justify-between">
                  <h4 className="font-medium text-sm">{task.title}</h4>
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
                      <DropdownMenuItem onSelect={() => onTaskStatusChange(task.id, "To Do")}>
                        Move to To Do
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => onTaskStatusChange(task.id, "On Hold")}>
                        Move to On Hold
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => onTaskStatusChange(task.id, "Completed")}>
                        Move to Completed
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="p-3 pt-2">
                <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className={`rounded-lg px-2 py-0.5 ${getPriorityColor(task.priority)} text-xs`}
                  >
                    {task.priority}
                  </Badge>
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} alt={task.assignee.name} />
                    <AvatarFallback>{task.assignee.initials}</AvatarFallback>
                  </Avatar>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold flex items-center">
          <div className="mr-2 h-2 w-2 rounded-full bg-amber-500" />
          On Hold
          <Badge className="ml-2 bg-amber-100 text-amber-500 hover:bg-amber-100 rounded-full">
            {tasks.filter((task) => task.status === "On Hold").length}
          </Badge>
        </h3>
        {tasks
          .filter((task) => task.status === "On Hold")
          .map((task) => (
            <Card
              key={task.id}
              className="task-card cursor-pointer rounded-xl border-none bg-card/50 shadow-sm hover:bg-card"
            >
              <CardHeader className="p-3 pb-0">
                <div className="flex items-start justify-between">
                  <h4 className="font-medium text-sm">{task.title}</h4>
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
                      <DropdownMenuItem onSelect={() => onTaskStatusChange(task.id, "To Do")}>
                        Move to To Do
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => onTaskStatusChange(task.id, "In Progress")}>
                        Move to In Progress
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => onTaskStatusChange(task.id, "Completed")}>
                        Move to Completed
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="p-3 pt-2">
                <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className={`rounded-lg px-2 py-0.5 ${getPriorityColor(task.priority)} text-xs`}
                  >
                    {task.priority}
                  </Badge>
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} alt={task.assignee.name} />
                    <AvatarFallback>{task.assignee.initials}</AvatarFallback>
                  </Avatar>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold flex items-center">
          <div className="mr-2 h-2 w-2 rounded-full bg-emerald-500" />
          Completed
          <Badge className="ml-2 bg-emerald-100 text-emerald-500 hover:bg-emerald-100 rounded-full">
            {tasks.filter((task) => task.status === "Completed").length}
          </Badge>
        </h3>
        {tasks
          .filter((task) => task.status === "Completed")
          .map((task) => (
            <Card
              key={task.id}
              className="task-card cursor-pointer rounded-xl border-none bg-card/50 shadow-sm hover:bg-card"
            >
              <CardHeader className="p-3 pb-0">
                <div className="flex items-start justify-between">
                  <h4 className="font-medium text-sm">{task.title}</h4>
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
                      <DropdownMenuItem onSelect={() => onTaskStatusChange(task.id, "To Do")}>
                        Move to To Do
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => onTaskStatusChange(task.id, "In Progress")}>
                        Move to In Progress
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => onTaskStatusChange(task.id, "On Hold")}>
                        Move to On Hold
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="p-3 pt-2">
                <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className={`rounded-lg px-2 py-0.5 ${getPriorityColor(task.priority)} text-xs`}
                  >
                    {task.priority}
                  </Badge>
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} alt={task.assignee.name} />
                    <AvatarFallback>{task.assignee.initials}</AvatarFallback>
                  </Avatar>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  )
}
