"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Overview } from "@/components/dashboard/overview"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { DollarSign, Users, ShoppingCart, TrendingUp, Loader2, AlertCircle } from "lucide-react"
import { useApi } from "@/context/api-context"
import { useToast } from "@/components/ui/use-toast"

interface DashboardStats {
  revenue: {
    total: number
    change: number
  }
  sellers: {
    total: number
    change: number
  }
  products: {
    total: number
    change: number
  }
  companies: {
    total: number
    change: number
  }
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { apiKeys } = useApi()
  const { toast } = useToast()

  useEffect(() => {
    let isMounted = true
    const fetchDashboardData = async () => {
      if (!isMounted) return

      setIsLoading(true)
      setError(null)

      try {
        // In a real app, this would be an API call to your backend
        // For now, we'll simulate an API call with a timeout
        if (!apiKeys.firebaseConfigured) {
          throw new Error("Firebase is not configured")
        }

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Simulate no data scenario
        if (isMounted) {
          setStats(null)
          setError("No dashboard data available. This could be because your account is new or there's no activity yet.")
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error fetching dashboard data:", err)
          setError(err instanceof Error ? err.message : "Failed to fetch dashboard data")
          toast({
            variant: "destructive",
            title: "Error fetching dashboard data",
            description: err instanceof Error ? err.message : "An unknown error occurred",
          })
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchDashboardData()

    return () => {
      isMounted = false
    }
  }, [apiKeys.firebaseConfigured, toast])

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
              <p className="text-muted-foreground">Loading dashboard data...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-3 mb-2">
                <AlertCircle className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="font-medium mb-1">No data available</p>
              <p className="text-sm text-muted-foreground max-w-md">{error}</p>
            </div>
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="size-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${stats?.revenue.total.toFixed(2)}</div>
                    <p className="text-xs text-muted-foreground">
                      {stats?.revenue.change > 0 ? "+" : ""}
                      {stats?.revenue.change.toFixed(1)}% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Sellers</CardTitle>
                    <Users className="size-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+{stats?.sellers.total}</div>
                    <p className="text-xs text-muted-foreground">
                      {stats?.sellers.change > 0 ? "+" : ""}
                      {stats?.sellers.change.toFixed(1)}% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Products</CardTitle>
                    <ShoppingCart className="size-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+{stats?.products.total}</div>
                    <p className="text-xs text-muted-foreground">
                      {stats?.products.change > 0 ? "+" : ""}
                      {stats?.products.change.toFixed(1)}% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Companies</CardTitle>
                    <TrendingUp className="size-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+{stats?.companies.total}</div>
                    <p className="text-xs text-muted-foreground">+{stats?.companies.change} since last week</p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Recent platform activity across all tenants</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentActivity />
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>Detailed platform analytics and metrics</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">
                  Analytics data will be available once you have more platform activity
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>Generate and view platform reports</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Reports will be available once you have more platform activity</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
