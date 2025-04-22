import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Clock, ListTodo, AlertCircle, Calendar, Plus } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { TaskCard } from "@/components/task-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              April 22, 2025
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="rounded-xl border-none shadow-sm overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
              <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <ListTodo className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <span className="text-primary">↑</span> +2 from yesterday
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-xl border-none shadow-sm overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10">
                <Clock className="h-4 w-4 text-blue-500" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <span className="text-destructive">↓</span> -1 from yesterday
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-xl border-none shadow-sm overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <span className="text-primary">↑</span> +3 from yesterday
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-xl border-none shadow-sm overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 to-transparent"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
              <CardTitle className="text-sm font-medium">Overdue</CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/10">
                <AlertCircle className="h-4 w-4 text-destructive" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Same as yesterday</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 rounded-xl border-none shadow-sm">
            <CardHeader>
              <CardTitle>Current Sprint Progress</CardTitle>
              <CardDescription>Sprint #3: Advanced Features (April 15 - April 29)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Client View</span>
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">75%</span>
                    </div>
                    <span className="text-sm text-muted-foreground">15/20 tasks</span>
                  </div>
                  <Progress value={75} className="h-2 rounded-full bg-muted" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Productivity Analytics</span>
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">60%</span>
                    </div>
                    <span className="text-sm text-muted-foreground">12/20 tasks</span>
                  </div>
                  <Progress value={60} className="h-2 rounded-full bg-muted" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Google Calendar Integration</span>
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">40%</span>
                    </div>
                    <span className="text-sm text-muted-foreground">8/20 tasks</span>
                  </div>
                  <Progress value={40} className="h-2 rounded-full bg-muted" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-3 rounded-xl border-none shadow-sm">
            <CardHeader>
              <CardTitle>Team Activity</CardTitle>
              <CardDescription>Recent activity from your team members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>AM</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Alex Miller</p>
                    <p className="text-sm text-muted-foreground">Completed task "Update API documentation"</p>
                    <p className="text-xs text-muted-foreground">10 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Sarah Johnson</p>
                    <p className="text-sm text-muted-foreground">Commented on "Frontend redesign"</p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>MP</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Mike Peterson</p>
                    <p className="text-sm text-muted-foreground">Created new task "Implement voice commands"</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Tabs defaultValue="my-tasks">
            <div className="flex items-center justify-between">
              <TabsList className="rounded-xl p-1">
                <TabsTrigger value="my-tasks" className="rounded-lg">
                  My Tasks
                </TabsTrigger>
                <TabsTrigger value="team-tasks" className="rounded-lg">
                  Team Tasks
                </TabsTrigger>
                <TabsTrigger value="upcoming" className="rounded-lg">
                  Upcoming
                </TabsTrigger>
              </TabsList>
              <Button size="sm" className="rounded-xl shadow-sm transition-all hover:shadow">
                <Plus className="mr-2 h-4 w-4" />
                Add Task
              </Button>
            </div>
            <TabsContent value="my-tasks" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <TaskCard
                  title="Update documentation"
                  description="Add new API endpoints to the documentation"
                  dueDate="Today"
                  priority="High"
                  status="In Progress"
                  assignee={{
                    name: "John Doe",
                    avatar: "/placeholder-user.jpg",
                    initials: "JD",
                  }}
                />
                <TaskCard
                  title="Fix login issues"
                  description="Investigate and fix login issues on mobile devices"
                  dueDate="Tomorrow"
                  priority="Medium"
                  status="To Do"
                  assignee={{
                    name: "John Doe",
                    avatar: "/placeholder-user.jpg",
                    initials: "JD",
                  }}
                />
                <TaskCard
                  title="Implement voice commands"
                  description="Add voice command functionality for task creation"
                  dueDate="Apr 25"
                  priority="Low"
                  status="To Do"
                  assignee={{
                    name: "John Doe",
                    avatar: "/placeholder-user.jpg",
                    initials: "JD",
                  }}
                />
              </div>
            </TabsContent>
            <TabsContent value="team-tasks" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <TaskCard
                  title="Design new dashboard"
                  description="Create wireframes for the new dashboard layout"
                  dueDate="Apr 24"
                  priority="Medium"
                  status="In Progress"
                  assignee={{
                    name: "Sarah Johnson",
                    avatar: "/placeholder-user.jpg",
                    initials: "SJ",
                  }}
                />
                <TaskCard
                  title="Optimize database queries"
                  description="Improve performance of main dashboard queries"
                  dueDate="Apr 26"
                  priority="High"
                  status="To Do"
                  assignee={{
                    name: "Mike Peterson",
                    avatar: "/placeholder-user.jpg",
                    initials: "MP",
                  }}
                />
                <TaskCard
                  title="User testing"
                  description="Conduct user testing for the new features"
                  dueDate="Apr 28"
                  priority="Medium"
                  status="To Do"
                  assignee={{
                    name: "Alex Miller",
                    avatar: "/placeholder-user.jpg",
                    initials: "AM",
                  }}
                />
              </div>
            </TabsContent>
            <TabsContent value="upcoming" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <TaskCard
                  title="Sprint planning"
                  description="Prepare for next sprint planning meeting"
                  dueDate="Apr 29"
                  priority="High"
                  status="To Do"
                  assignee={{
                    name: "John Doe",
                    avatar: "/placeholder-user.jpg",
                    initials: "JD",
                  }}
                />
                <TaskCard
                  title="Client presentation"
                  description="Prepare slides for client presentation"
                  dueDate="May 2"
                  priority="Medium"
                  status="To Do"
                  assignee={{
                    name: "John Doe",
                    avatar: "/placeholder-user.jpg",
                    initials: "JD",
                  }}
                />
                <TaskCard
                  title="Code review"
                  description="Review pull requests for the new features"
                  dueDate="May 3"
                  priority="Low"
                  status="To Do"
                  assignee={{
                    name: "John Doe",
                    avatar: "/placeholder-user.jpg",
                    initials: "JD",
                  }}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  )
}
