import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import Link from "next/link"

export default function ProductsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Products</h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Manage Products</CardTitle>
          <CardDescription>View and manage all products across all companies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
              <Input type="search" placeholder="Search products..." className="w-full pl-8" />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Seller</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        product.status === "approved"
                          ? "default"
                          : product.status === "pending"
                            ? "outline"
                            : "destructive"
                      }
                    >
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{product.seller}</TableCell>
                  <TableCell>{product.company}</TableCell>
                  <TableCell>{product.created}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/dashboard/products/${product.id}`}>
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

const products = [
  {
    id: "1",
    name: "Premium Widget",
    price: 29.99,
    status: "approved",
    seller: "Jane Smith",
    company: "Acme Inc",
    created: "Apr 26, 2023",
  },
  {
    id: "2",
    name: "Deluxe Gadget",
    price: 49.99,
    status: "approved",
    seller: "Jane Smith",
    company: "Acme Inc",
    created: "Apr 28, 2023",
  },
  {
    id: "3",
    name: "Super Tool",
    price: 19.99,
    status: "pending",
    seller: "Alice Williams",
    company: "Globex Corporation",
    created: "May 20, 2023",
  },
  {
    id: "4",
    name: "Mega Device",
    price: 99.99,
    status: "rejected",
    seller: "Alice Williams",
    company: "Globex Corporation",
    created: "May 22, 2023",
  },
  {
    id: "5",
    name: "Ultimate Solution",
    price: 149.99,
    status: "approved",
    seller: "Jane Smith",
    company: "Acme Inc",
    created: "Jun 05, 2023",
  },
]
