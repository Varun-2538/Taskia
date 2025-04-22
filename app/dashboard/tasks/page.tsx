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
    },
  },
]

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [priorityFilter, setPriorityFilter] = useState("All")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    status: "To Do",
    assignee: {
      name: "John Doe",
      avatar: "/placeholder-user.jpg",
      initials: "JD",
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

  const handleCreateTask = () => {
    const id = (tasks.length + 1).toString()
    const task = { id, ...newTask }
    setTasks([...tasks, task])
    setIsDialogOpen(false)
    setNewTask({
      title: "",
      description: "",
      dueDate: "",
      priority: "Medium",
      status: "To Do",
      assignee: {
        name: "John Doe",
        avatar: "/placeholder-user.jpg",
        initials: "JD",
      },
    })
    toast({
      title: "Task created",
      description: `"${task.title}" has been added to your tasks.`,
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
      </div>
    </DashboardLayout>
  )
}
