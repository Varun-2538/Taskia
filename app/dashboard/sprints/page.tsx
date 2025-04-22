"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Plus, Calendar, BarChart, ArrowRight, MoreHorizontal } from "lucide-react"
import { SprintBoard } from "@/components/sprint-board"
import { useToast } from "@/hooks/use-toast"

// Sample sprint data
const sprints = [
  {
    id: "1",
    name: "Sprint 1: Core Task Management",
    startDate: "2025-03-15",
    endDate: "2025-03-29",
    status: "Completed",
    progress: 100,
    tasks: {
      total: 25,
      completed: 25,
    },
  },
  {
    id: "2",
    name: "Sprint 2: Enhanced Collaboration & Notifications",
    startDate: "2025-04-01",
    endDate: "2025-04-15",
    status: "Completed",
    progress: 100,
    tasks: {
      total: 20,
      completed: 20,
    },
  },
  {
    id: "3",
    name: "Sprint 3: Advanced Features",
    startDate: "2025-04-15",
    endDate: "2025-04-29",
    status: "In Progress",
    progress: 60,
    tasks: {
      total: 22,
      completed: 13,
    },
  },
]

// Sample tasks for the current sprint
const sprintTasks = [
  {
    id: "1",
    title: "Implement client view",
    description: "Create a view for clients to see project progress",
    status: "In Progress",
    priority: "High",
    assignee: {
      name: "John Doe",
      avatar: "/placeholder-user.jpg",
      initials: "JD",
    },
  },
  {
    id: "2",
    title: "Design productivity analytics dashboard",
    description: "Create wireframes for the analytics dashboard",
    status: "In Progress",
    priority: "Medium",
    assignee: {
      name: "Sarah Johnson",
      avatar: "/placeholder-user.jpg",
      initials: "SJ",
    },
  },
  {
    id: "3",
    title: "Implement Google Calendar integration",
    description: "Add ability to sync tasks with Google Calendar",
    status: "To Do",
    priority: "Medium",
    assignee: {
      name: "Mike Peterson",
      avatar: "/placeholder-user.jpg",
      initials: "MP",
    },
  },
  {
    id: "4",
    title: "Create API endpoints for analytics",
    description: "Develop backend API for productivity analytics",
    status: "Completed",
    priority: "High",
    assignee: {
      name: "Alex Miller",
      avatar: "/placeholder-user.jpg",
      initials: "AM",
    },
  },
  {
    id: "5",
    title: "User testing for client view",
    description: "Conduct user testing sessions for the client view",
    status: "To Do",
    priority: "Low",
    assignee: {
      name: "John Doe",
      avatar: "/placeholder-user.jpg",
      initials: "JD",
    },
  },
  {
    id: "6",
    title: "Fix calendar sync issues",
    description: "Resolve issues with calendar event syncing",
    status: "On Hold",
    priority: "High",
    assignee: {
      name: "Mike Peterson",
      avatar: "/placeholder-user.jpg",
      initials: "MP",
    },
  },
]

export default function SprintsPage() {
  const [currentSprint, setCurrentSprint] = useState(sprints[2])
  const [tasks, setTasks] = useState(sprintTasks)
  const { toast } = useToast()

  const handleTaskStatusChange = (taskId: string, newStatus: string) => {
    const updatedTasks = tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task))
    setTasks(updatedTasks)

    const taskTitle = tasks.find((task) => task.id === taskId)?.title
    toast({
      title: "Task updated",
      description: `"${taskTitle}" moved to ${newStatus}`,
    })
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Sprint Board</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              {new Date(currentSprint.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })} -
              {new Date(currentSprint.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </Button>
            <Button className="rounded-xl shadow-sm transition-all hover:shadow">
              <Plus className="mr-2 h-4 w-4" />
              New Sprint
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sprints.map((sprint) => (
            <Card
              key={sprint.id}
              className={`rounded-xl shadow-sm ${sprint.id === currentSprint.id ? "border-primary" : "border-none"}`}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div>
                    <CardTitle className="text-base">{sprint.name}</CardTitle>
                    <CardDescription>
                      {new Date(sprint.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })} -
                      {new Date(sprint.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </CardDescription>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      sprint.status === "Completed"
                        ? "text-primary bg-primary/15 border-primary/20 rounded-lg px-2 py-0.5"
                        : sprint.status === "In Progress"
                          ? "text-blue-500 bg-blue-500/15 border-blue-500/20 rounded-lg px-2 py-0.5"
                          : "text-slate-500 bg-slate-500/15 border-slate-500/20 rounded-lg px-2 py-0.5"
                    }
                  >
                    {sprint.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>{sprint.progress}%</span>
                  </div>
                  <Progress value={sprint.progress} className="h-2 rounded-full bg-muted" />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>
                      Tasks: {sprint.tasks.completed}/{sprint.tasks.total}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant={sprint.id === currentSprint.id ? "default" : "outline"}
                  className="w-full"
                  onClick={() => setCurrentSprint(sprint)}
                >
                  {sprint.id === currentSprint.id ? "Current Sprint" : "View Sprint"}
                  {sprint.id !== currentSprint.id && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Sprint Burndown</CardTitle>
              <CardDescription>Tracking progress for {currentSprint.name}</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center">
                <BarChart className="mx-auto h-16 w-16 text-muted-foreground/50" />
                <p className="mt-2 text-sm text-muted-foreground">
                  Sprint burndown chart visualization would appear here
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sprint Summary</CardTitle>
              <CardDescription>Overview of current sprint status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Start Date</p>
                    <p className="font-medium">
                      {new Date(currentSprint.startDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">End Date</p>
                    <p className="font-medium">
                      {new Date(currentSprint.endDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Team Velocity</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold">18</p>
                    <Badge variant="outline" className="text-emerald-500 bg-emerald-50">
                      +2 from last sprint
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Task Breakdown</p>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="rounded-xl bg-slate-100 p-2 shadow-sm">
                      <p className="text-lg font-bold">{tasks.filter((t) => t.status === "To Do").length}</p>
                      <p className="text-xs text-muted-foreground">To Do</p>
                    </div>
                    <div className="rounded-xl bg-blue-100 p-2 shadow-sm">
                      <p className="text-lg font-bold">{tasks.filter((t) => t.status === "In Progress").length}</p>
                      <p className="text-xs text-muted-foreground">In Progress</p>
                    </div>
                    <div className="rounded-xl bg-amber-100 p-2 shadow-sm">
                      <p className="text-lg font-bold">{tasks.filter((t) => t.status === "On Hold").length}</p>
                      <p className="text-xs text-muted-foreground">On Hold</p>
                    </div>
                    <div className="rounded-xl bg-primary/10 p-2 shadow-sm">
                      <p className="text-lg font-bold">{tasks.filter((t) => t.status === "Completed").length}</p>
                      <p className="text-xs text-muted-foreground">Completed</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="board">
          <TabsList className="rounded-xl p-1">
            <TabsTrigger value="board" className="rounded-lg">
              Board
            </TabsTrigger>
            <TabsTrigger value="list" className="rounded-lg">
              List
            </TabsTrigger>
          </TabsList>
          <TabsContent value="board" className="mt-4">
            <SprintBoard tasks={tasks} onTaskStatusChange={handleTaskStatusChange} />
          </TabsContent>
          <TabsContent value="list" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Sprint Tasks</CardTitle>
                <CardDescription>All tasks for {currentSprint.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div key={task.id} className="flex items-start justify-between border-b pb-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={`mt-1 h-2 w-2 rounded-full ${
                            task.status === "Completed"
                              ? "bg-emerald-500"
                              : task.status === "In Progress"
                                ? "bg-blue-500"
                                : task.status === "On Hold"
                                  ? "bg-amber-500"
                                  : "bg-slate-500"
                          }`}
                        />
                        <div>
                          <p className="font-medium">{task.title}</p>
                          <p className="text-sm text-muted-foreground">{task.description}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className={
                                task.priority === "High"
                                  ? "text-destructive bg-destructive/10"
                                  : task.priority === "Medium"
                                    ? "text-amber-500 bg-amber-500/10"
                                    : "text-emerald-500 bg-emerald-500/10"
                              }
                            >
                              {task.priority}
                            </Badge>
                            <Badge
                              variant="outline"
                              className={
                                task.status === "Completed"
                                  ? "text-emerald-500 bg-emerald-500/10"
                                  : task.status === "In Progress"
                                    ? "text-blue-500 bg-blue-500/10"
                                    : task.status === "On Hold"
                                      ? "text-amber-500 bg-amber-500/10"
                                      : "text-slate-500 bg-slate-500/10"
                              }
                            >
                              {task.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} alt={task.assignee.name} />
                          <AvatarFallback>{task.assignee.initials}</AvatarFallback>
                        </Avatar>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
