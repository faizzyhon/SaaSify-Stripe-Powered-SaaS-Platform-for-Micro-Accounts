"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { useApi } from "@/context/api-context"
import { useToast } from "@/components/ui/use-toast"

interface Company {
  id: string
  name: string
  adminEmail: string
  status: "active" | "pending" | "suspended"
  sellers: number
  products: number
  created: string
}

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const { apiKeys } = useApi()
  const { toast } = useToast()

  useEffect(() => {
    let isMounted = true
    const fetchCompanies = async () => {
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
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // If we have no data, show an empty state
        if (isMounted) {
          const data: Company[] = []
          setCompanies(data)

          if (data.length === 0) {
            setError("No companies found. Create your first company to get started.")
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error fetching companies:", err)
          setError(err instanceof Error ? err.message : "Failed to fetch companies")
          toast({
            variant: "destructive",
            title: "Error fetching companies",
            description: err instanceof Error ? err.message : "An unknown error occurred",
          })
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchCompanies()

    return () => {
      isMounted = false
    }
  }, [apiKeys.firebaseConfigured, toast])

  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.adminEmail.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Companies</h2>
        <Link href="/dashboard/companies/new">
          <Button>
            <Plus className="mr-2 size-4" />
            Add Company
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Manage Companies</CardTitle>
          <CardDescription>View and manage all companies on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search companies..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline">Filter</Button>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
              <p className="text-muted-foreground">Loading companies...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="rounded-full bg-muted p-3 mb-2">
                <AlertCircle className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="font-medium mb-1">No companies found</p>
              <p className="text-sm text-muted-foreground max-w-md mb-4">{error}</p>
              <Link href="/dashboard/companies/new">
                <Button>
                  <Plus className="mr-2 size-4" />
                  Create Your First Company
                </Button>
              </Link>
            </div>
          ) : filteredCompanies.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="rounded-full bg-muted p-3 mb-2">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="font-medium mb-1">No results found</p>
              <p className="text-sm text-muted-foreground max-w-md">
                No companies match your search criteria. Try adjusting your search or create a new company.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company Name</TableHead>
                  <TableHead>Admin Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Sellers</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCompanies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell className="font-medium">{company.name}</TableCell>
                    <TableCell>{company.adminEmail}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          company.status === "active"
                            ? "default"
                            : company.status === "pending"
                              ? "outline"
                              : "destructive"
                        }
                      >
                        {company.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{company.sellers}</TableCell>
                    <TableCell>{company.products}</TableCell>
                    <TableCell>{company.created}</TableCell>
                    <TableCell className="text-right">
                      <Link href={`/dashboard/companies/${company.id}`}>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
