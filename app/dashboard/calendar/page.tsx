"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Plus, CalendarIcon } from "lucide-react"

// Sample events data
const events = [
  {
    id: "1",
    title: "Sprint Planning",
    date: "2025-04-22",
    time: "10:00 AM - 11:30 AM",
    type: "Meeting",
  },
  {
    id: "2",
    title: "Client Presentation",
    date: "2025-04-22",
    time: "2:00 PM - 3:00 PM",
    type: "Meeting",
  },
  {
    id: "3",
    title: "API Documentation Deadline",
    date: "2025-04-24",
    time: "All day",
    type: "Deadline",
  },
  {
    id: "4",
    title: "Team Retrospective",
    date: "2025-04-29",
    time: "11:00 AM - 12:00 PM",
    type: "Meeting",
  },
  {
    id: "5",
    title: "Frontend Review",
    date: "2025-04-25",
    time: "3:00 PM - 4:00 PM",
    type: "Meeting",
  },
]

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 3, 22)) // April 22, 2025
  const [view, setView] = useState("month")

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const renderCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-muted p-1" />)
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const dateString = date.toISOString().split("T")[0]
      const dayEvents = events.filter((event) => event.date === dateString)

      days.push(
        <div key={day} className="min-h-24 border border-muted p-1 hover:bg-muted/30 transition-colors">
          <div className="flex justify-between">
            <span
              className={`text-sm font-medium ${day === 22 ? "bg-primary text-primary-foreground rounded-lg h-6 w-6 flex items-center justify-center shadow-sm" : ""}`}
            >
              {day}
            </span>
            {dayEvents.length > 0 && <span className="text-xs text-muted-foreground">{dayEvents.length} events</span>}
          </div>
          <div className="mt-1 space-y-1">
            {dayEvents.slice(0, 2).map((event) => (
              <div
                key={event.id}
                className={`text-xs truncate rounded-lg px-1 py-0.5 ${
                  event.type === "Meeting" ? "bg-blue-500/15 text-blue-700" : "bg-amber-500/15 text-amber-700"
                }`}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-muted-foreground pl-1">+{dayEvents.length - 2} more</div>
            )}
          </div>
        </div>,
      )
    }

    return days
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <div className="flex items-center gap-2">
            <Select value={view} onValueChange={setView}>
              <SelectTrigger className="w-[120px] rounded-xl">
                <SelectValue placeholder="View" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="day">Day</SelectItem>
              </SelectContent>
            </Select>
            <Button className="rounded-xl shadow-sm transition-all hover:shadow">
              <Plus className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <Card className="rounded-xl border-none shadow-sm md:col-span-3">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={previousMonth}
                    className="rounded-xl shadow-sm transition-all hover:shadow"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <h2 className="text-lg font-semibold">
                    {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </h2>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextMonth}
                    className="rounded-xl shadow-sm transition-all hover:shadow"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentDate(new Date(2025, 3, 22))}
                  className="rounded-xl shadow-sm transition-all hover:shadow"
                >
                  Today
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-0">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center text-sm font-medium py-2">
                    {day}
                  </div>
                ))}
                {renderCalendarDays()}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl border-none shadow-sm">
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>
                Events for {currentDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events
                  .filter((event) => event.date === "2025-04-22")
                  .map((event) => (
                    <div key={event.id} className="flex items-start gap-2 border-b pb-3">
                      <CalendarIcon className="mt-0.5 h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-muted-foreground">{event.time}</p>
                        <Badge
                          variant="outline"
                          className={
                            event.type === "Meeting"
                              ? "mt-1 text-blue-700 bg-blue-500/15 border-blue-500/20 rounded-lg px-2 py-0.5"
                              : "mt-1 text-amber-700 bg-amber-500/15 border-amber-500/20 rounded-lg px-2 py-0.5"
                          }
                        >
                          {event.type}
                        </Badge>
                      </div>
                    </div>
                  ))}

                <div className="pt-2">
                  <h3 className="font-medium mb-2">Upcoming</h3>
                  {events
                    .filter((event) => event.date > "2025-04-22")
                    .slice(0, 3)
                    .map((event) => (
                      <div key={event.id} className="flex items-start gap-2 border-b pb-3 mb-3">
                        <CalendarIcon className="mt-0.5 h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })} •{" "}
                            {event.time}
                          </p>
                          <Badge
                            variant="outline"
                            className={
                              event.type === "Meeting"
                                ? "mt-1 text-blue-700 bg-blue-500/15 border-blue-500/20 rounded-lg px-2 py-0.5"
                                : "mt-1 text-amber-700 bg-amber-500/15 border-amber-500/20 rounded-lg px-2 py-0.5"
                            }
                          >
                            {event.type}
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
