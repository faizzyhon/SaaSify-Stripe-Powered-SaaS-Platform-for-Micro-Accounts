"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useApi } from "@/context/api-context"
import { Loader2, AlertCircle } from "lucide-react"

interface Activity {
  id: string
  name: string
  action: string
  time: string
  avatar?: string
  initials: string
}

export function RecentActivity() {
  const [activities, setActivities] = useState<Activity[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { apiKeys } = useApi()

  useEffect(() => {
    let isMounted = true
    const fetchActivities = async () => {
      if (!isMounted) return

      setIsLoading(true)
      setError(null)

      try {
        // In a real app, this would be an API call to your backend
        if (!apiKeys.firebaseConfigured) {
          throw new Error("Firebase is not configured")
        }

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1200))

        // Simulate no data scenario
        if (isMounted) {
          setActivities(null)
          setError("No recent activity found")
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error fetching activities:", err)
          setError(err instanceof Error ? err.message : "Failed to fetch recent activities")
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchActivities()

    return () => {
      isMounted = false
    }
  }, [apiKeys.firebaseConfigured])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary mb-2" />
        <p className="text-sm text-muted-foreground">Loading activities...</p>
      </div>
    )
  }

  if (error || !activities || activities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <AlertCircle className="h-6 w-6 text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground">{error || "No recent activities found"}</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={activity.avatar || "/placeholder.svg"} alt="Avatar" />
            <AvatarFallback>{activity.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.name}</p>
            <p className="text-sm text-muted-foreground">{activity.action}</p>
          </div>
          <div className="ml-auto text-xs text-muted-foreground">{activity.time}</div>
        </div>
      ))}
    </div>
  )
}
