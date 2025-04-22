"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"

// Sample notifications data
const notifications = [
  {
    id: 1,
    title: "Task assigned to you",
    description: "Alex assigned you to 'Update API documentation'",
    time: "10 minutes ago",
    read: false,
  },
  {
    id: 2,
    title: "Comment on your task",
    description: "Sarah commented on 'Frontend redesign'",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    title: "Sprint planning reminder",
    description: "Sprint planning meeting tomorrow at 10 AM",
    time: "2 hours ago",
    read: true,
  },
  {
    id: 4,
    title: "Task completed",
    description: "Mike marked 'Database optimization' as complete",
    time: "Yesterday",
    read: true,
  },
]

export function NotificationsPopover() {
  const [open, setOpen] = useState(false)
  const [notificationsList, setNotificationsList] = useState(notifications)

  const unreadCount = notificationsList.filter((n) => !n.read).length

  const markAllAsRead = () => {
    setNotificationsList(notificationsList.map((n) => ({ ...n, read: true })))
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative rounded-xl">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center shadow-sm">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 rounded-xl shadow-md border-none" align="end">
        <div className="flex items-center justify-between p-4">
          <h4 className="font-medium">Notifications</h4>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
        <Separator />
        <div className="max-h-80 overflow-auto">
          {notificationsList.length > 0 ? (
            <div>
              {notificationsList.map((notification) => (
                <div key={notification.id} className="flex flex-col p-4 hover:bg-muted/50">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {notification.title}
                        {!notification.read && (
                          <span className="ml-2 rounded-full bg-primary h-2 w-2 inline-block shadow-sm" />
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground">{notification.description}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-muted-foreground">No notifications</div>
          )}
        </div>
        <Separator />
        <div className="p-4 text-center">
          <Button variant="ghost" size="sm" className="w-full" asChild>
            <a href="/dashboard/notifications">View all notifications</a>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
