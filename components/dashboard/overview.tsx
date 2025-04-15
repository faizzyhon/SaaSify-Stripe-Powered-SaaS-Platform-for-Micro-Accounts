"use client"

import { useEffect, useState } from "react"
import { useApi } from "@/context/api-context"
import { Loader2, AlertCircle } from "lucide-react"

interface MonthlyData {
  month: string
  value: number
}

export function Overview() {
  const [data, setData] = useState<MonthlyData[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { apiKeys } = useApi()

  useEffect(() => {
    let isMounted = true
    const fetchOverviewData = async () => {
      if (!isMounted) return

      setIsLoading(true)
      setError(null)

      try {
        // In a real app, this would be an API call to your backend
        if (!apiKeys.firebaseConfigured) {
          throw new Error("Firebase is not configured")
        }

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Simulate no data scenario
        if (isMounted) {
          setData(null)
          setError("No historical data available yet")
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error fetching overview data:", err)
          setError(err instanceof Error ? err.message : "Failed to fetch overview data")
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchOverviewData()

    return () => {
      isMounted = false
    }
  }, [apiKeys.firebaseConfigured])

  if (isLoading) {
    return (
      <div className="w-full h-[350px] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="w-full h-[350px] flex flex-col items-center justify-center">
        <AlertCircle className="h-8 w-8 text-muted-foreground mb-2" />
        <p className="text-muted-foreground text-center">{error || "No data available"}</p>
      </div>
    )
  }

  // If we have data, render the chart
  return (
    <div className="w-full h-[350px] flex items-center justify-center">
      <div className="w-full h-full grid grid-cols-12 gap-2">
        {data.map((item, i) => (
          <div key={i} className="flex flex-col items-center justify-end">
            <div
              className="w-full bg-primary rounded-t-md"
              style={{ height: `${(item.value / Math.max(...data.map((d) => d.value))) * 70 + 30}%` }}
            ></div>
            <span className="text-xs text-muted-foreground mt-2">{item.month}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
