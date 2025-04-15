import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import Link from "next/link"

export default function UsersPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Users</h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Manage Users</CardTitle>
          <CardDescription>View and manage all users across all companies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
              <Input type="search" placeholder="Search users..." className="w-full pl-8" />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.company}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.status === "active" ? "default" : user.status === "pending" ? "outline" : "destructive"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.products}</TableCell>
                  <TableCell>{user.created}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/dashboard/users/${user.id}`}>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

const users = [
  {
    id: "1",
    name: "John Doe",
    email: "john@acme.com",
    role: "Company Admin",
    company: "Acme Inc",
    status: "active",
    products: 0,
    created: "Apr 23, 2023",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@acme.com",
    role: "Sub-User",
    company: "Acme Inc",
    status: "active",
    products: 24,
    created: "Apr 25, 2023",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@globex.com",
    role: "Company Admin",
    company: "Globex Corporation",
    status: "active",
    products: 0,
    created: "May 15, 2023",
  },
  {
    id: "4",
    name: "Alice Williams",
    email: "alice@globex.com",
    role: "Sub-User",
    company: "Globex Corporation",
    status: "pending",
    products: 12,
    created: "May 18, 2023",
  },
  {
    id: "5",
    name: "Charlie Brown",
    email: "charlie@stark.com",
    role: "Company Admin",
    company: "Stark Industries",
    status: "pending",
    products: 0,
    created: "Jun 02, 2023",
  },
]
