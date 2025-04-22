"use client"

import type React from "react"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Search, Filter, ArrowUpDown, CheckCircle2, Clock, PauseCircle } from "lucide-react"
import { TaskList } from "@/components/task-list"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample task data
const initialTasks = [
  {
    id: "1",
    title: "Update documentation",
    description: "Add new API endpoints to the documentation",
    dueDate: "2025-04-22",
    priority: "High",
    status: "In Progress",
    assignee: {
      name: "John Doe",
      avatar: "/placeholder-user.jpg",
      initials: "JD",
      email: "john.doe@example.com",
    },
  },
  {
    id: "2",
    title: "Fix login issues",
    description: "Investigate and fix login issues on mobile devices",
    dueDate: "2025-04-23",
    priority: "Medium",
    status: "To Do",
    assignee: {
      name: "John Doe",
      avatar: "/placeholder-user.jpg",
      initials: "JD",
      email: "john.doe@example.com",
    },
  },
  {
    id: "3",
    title: "Implement voice commands",
    description: "Add voice command functionality for task creation",
    dueDate: "2025-04-25",
    priority: "Low",
    status: "To Do",
    assignee: {
      name: "John Doe",
      avatar: "/placeholder-user.jpg",
      initials: "JD",
      email: "john.doe@example.com",
    },
  },
  {
    id: "4",
    title: "Design new dashboard",
    description: "Create wireframes for the new dashboard layout",
    dueDate: "2025-04-24",
    priority: "Medium",
    status: "In Progress",
    assignee: {
      name: "Sarah Johnson",
      avatar: "/placeholder-user.jpg",
      initials: "SJ",
      email: "sarah.johnson@example.com",
    },
  },
  {
    id: "5",
    title: "Optimize database queries",
    description: "Improve performance of main dashboard queries",
    dueDate: "2025-04-26",
    priority: "High",
    status: "To Do",
    assignee: {
      name: "Mike Peterson",
      avatar: "/placeholder-user.jpg",
      initials: "MP",
      email: "mike.peterson@example.com",
    },
  },
  {
    id: "6",
    title: "User testing",
    description: "Conduct user testing for the new features",
    dueDate: "2025-04-28",
    priority: "Medium",
    status: "To Do",
    assignee: {
      name: "Alex Miller",
      avatar: "/placeholder-user.jpg",
      initials: "AM",
      email: "alex.miller@example.com",
    },
  },
]

// Sample team members data
const teamMembers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/placeholder-user.jpg",
    initials: "JD",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    avatar: "/placeholder-user.jpg",
    initials: "SJ",
  },
  {
    id: "3",
    name: "Mike Peterson",
    email: "mike.peterson@example.com",
    avatar: "/placeholder-user.jpg",
    initials: "MP",
  },
  {
    id: "4",
    name: "Alex Miller",
    email: "alex.miller@example.com",
    avatar: "/placeholder-user.jpg",
    initials: "AM",
  },
]

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [priorityFilter, setPriorityFilter] = useState("All")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("board")
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    status: "To Do",
    assignee: {
      id: "",
      name: "",
      email: "",
      avatar: "/placeholder-user.jpg",
      initials: "",
    },
  })
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewTask((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewTask((prev) => ({ ...prev, [name]: value }))
  }

  const handleAssigneeChange = (value: string) => {
    const selectedMember = teamMembers.find((member) => member.id === value)
    if (selectedMember) {
      setNewTask((prev) => ({
        ...prev,
        assignee: {
          id: selectedMember.id,
          name: selectedMember.name,
          email: selectedMember.email,
          avatar: selectedMember.avatar,
          initials: selectedMember.initials,
        },
      }))
    }
  }

  const handleCreateTask = () => {
    if (!newTask.title) {
      toast({
        title: "Error",
        description: "Task title is required",
        variant: "destructive",
      })
      return
    }

    if (!newTask.assignee.id) {
      toast({
        title: "Error",
        description: "Please assign this task to a team member",
        variant: "destructive",
      })
      return
    }

    const id = (tasks.length + 1).toString()
    const task = {
      id,
      ...newTask,
      assignee: {
        ...newTask.assignee,
      },
    }

    setTasks([...tasks, task])
    setIsDialogOpen(false)
    setNewTask({
      title: "",
      description: "",
      dueDate: "",
      priority: "Medium",
      status: "To Do",
      assignee: {
        id: "",
        name: "",
        email: "",
        avatar: "/placeholder-user.jpg",
        initials: "",
      },
    })

    toast({
      title: "Task created",
      description: `"${task.title}" has been assigned to ${task.assignee.name}.`,
    })
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "All" || task.status === statusFilter
    const matchesPriority = priorityFilter === "All" || task.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl shadow-sm transition-all hover:shadow">
                <Plus className="mr-2 h-4 w-4" />
                New Task
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-xl sm:rounded-2xl">
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
                <DialogDescription>Add a new task to your project. Fill in the details below.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Task title"
                    value={newTask.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Task description"
                    value={newTask.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input
                      id="dueDate"
                      name="dueDate"
                      type="date"
                      value={newTask.dueDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select value={newTask.priority} onValueChange={(value) => handleSelectChange("priority", value)}>
                      <SelectTrigger id="priority">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={newTask.status} onValueChange={(value) => handleSelectChange("status", value)}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="To Do">To Do</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="On Hold">On Hold</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="assignee">Assign To</Label>
                  <Select onValueChange={handleAssigneeChange}>
                    <SelectTrigger id="assignee">
                      <SelectValue placeholder="Select team member" />
                    </SelectTrigger>
                    <SelectContent>
                      {teamMembers.map((member) => (
                        <SelectItem key={member.id} value={member.id}>
                          {member.name} ({member.email})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  className="rounded-xl shadow-sm transition-all hover:shadow"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button className="rounded-xl shadow-sm transition-all hover:shadow" onClick={handleCreateTask}>
                  Create Task
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              className="rounded-xl pl-9 transition-all focus-visible:ring-2 focus-visible:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px] rounded-xl">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Status</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="To Do">To Do</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="On Hold">On Hold</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[140px] rounded-xl">
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="h-4 w-4" />
                  <span>Priority</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Priorities</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="board" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="rounded-xl p-1">
            <TabsTrigger value="board" className="rounded-lg">
              Board
            </TabsTrigger>
            <TabsTrigger value="assigned" className="rounded-lg">
              Assigned Tasks
            </TabsTrigger>
          </TabsList>

          <TabsContent value="board" className="mt-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
                    <CheckCircle2 className="h-4 w-4 text-slate-500" />
                  </div>
                  <h2 className="font-semibold">To Do</h2>
                  <div className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium">
                    {filteredTasks.filter((task) => task.status === "To Do").length}
                  </div>
                </div>
                <TaskList
                  tasks={filteredTasks.filter((task) => task.status === "To Do")}
                  setTasks={setTasks}
                  allTasks={tasks}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                    <Clock className="h-4 w-4 text-blue-500" />
                  </div>
                  <h2 className="font-semibold">In Progress</h2>
                  <div className="ml-auto rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-500">
                    {filteredTasks.filter((task) => task.status === "In Progress").length}
                  </div>
                </div>
                <TaskList
                  tasks={filteredTasks.filter((task) => task.status === "In Progress")}
                  setTasks={setTasks}
                  allTasks={tasks}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100">
                    <PauseCircle className="h-4 w-4 text-amber-500" />
                  </div>
                  <h2 className="font-semibold">On Hold</h2>
                  <div className="ml-auto rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-500">
                    {filteredTasks.filter((task) => task.status === "On Hold").length}
                  </div>
                </div>
                <TaskList
                  tasks={filteredTasks.filter((task) => task.status === "On Hold")}
                  setTasks={setTasks}
                  allTasks={tasks}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <h2 className="font-semibold">Completed</h2>
                  <div className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-500">
                    {filteredTasks.filter((task) => task.status === "Completed").length}
                  </div>
                </div>
                <TaskList
                  tasks={filteredTasks.filter((task) => task.status === "Completed")}
                  setTasks={setTasks}
                  allTasks={tasks}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="assigned" className="mt-4">
            <AssignedTasksView tasks={filteredTasks} setTasks={setTasks} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

function AssignedTasksView({ tasks, setTasks }) {
  // Group tasks by assignee
  const tasksByAssignee = tasks.reduce((acc, task) => {
    const assigneeEmail = task.assignee.email
    if (!acc[assigneeEmail]) {
      acc[assigneeEmail] = {
        assignee: task.assignee,
        tasks: [],
      }
    }
    acc[assigneeEmail].tasks.push(task)
    return acc
  }, {})

  return (
    <div className="space-y-8">
      {Object.values(tasksByAssignee).map((group: any) => (
        <div key={group.assignee.email} className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full overflow-hidden border-2 border-primary">
              <img
                src={group.assignee.avatar || "/placeholder.svg"}
                alt={group.assignee.name}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder-user.jpg"
                }}
              />
            </div>
            <div>
              <h2 className="font-semibold text-lg">{group.assignee.name}</h2>
              <p className="text-sm text-muted-foreground">{group.assignee.email}</p>
            </div>
            <div className="ml-auto rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              {group.tasks.length} {group.tasks.length === 1 ? "task" : "tasks"}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {group.tasks.map((task) => (
              <AssignedTaskCard key={task.id} task={task} setTasks={setTasks} allTasks={tasks} />
            ))}
          </div>
        </div>
      ))}

      {Object.keys(tasksByAssignee).length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-muted p-6">
            <CheckCircle2 className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-medium">No assigned tasks found</h3>
          <p className="mt-2 text-sm text-muted-foreground">There are no tasks matching your current filters.</p>
        </div>
      )}
    </div>
  )
}

function AssignedTaskCard({ task, setTasks, allTasks }) {
  const { toast } = useToast()

  const getPriorityColor = (priority) => {
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

  const getStatusColor = (status) => {
    switch (status) {
      case "To Do":
        return "text-slate-500 bg-slate-500/15 border-slate-500/20"
      case "In Progress":
        return "text-blue-500 bg-blue-500/15 border-blue-500/20"
      case "Completed":
        return "text-emerald-500 bg-emerald-500/15 border-emerald-500/20"
      case "On Hold":
        return "text-amber-500 bg-amber-500/15 border-amber-500/20"
      default:
        return "text-muted-foreground bg-muted"
    }
  }

  const handleStatusChange = (taskId, newStatus) => {
    const updatedTasks = allTasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    setTasks(updatedTasks)

    toast({
      title: "Task updated",
      description: `"${task.title}" moved to ${newStatus}`,
    })
  }

  const formatDate = (dateString) => {
    if (!dateString) return "No due date"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  return (
    <div className="task-card rounded-xl border bg-card/50 shadow-sm hover:bg-card overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="font-medium">{task.title}</h3>
          <div className={`rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(task.status)}`}>
            {task.status}
          </div>
        </div>

        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{task.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <div className={`rounded-lg px-2 py-1 text-xs ${getPriorityColor(task.priority)}`}>
            {task.priority} Priority
          </div>
          <div className="rounded-lg bg-muted px-2 py-1 text-xs">Due: {formatDate(task.dueDate)}</div>
        </div>
      </div>

      <div className="border-t bg-muted/50 p-3">
        <div className="flex justify-between items-center">
          <Select defaultValue={task.status} onValueChange={(value) => handleStatusChange(task.id, value)}>
            <SelectTrigger className="h-8 w-[140px] text-xs">
              <SelectValue placeholder="Change status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="To Do">To Do</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="On Hold">On Hold</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
