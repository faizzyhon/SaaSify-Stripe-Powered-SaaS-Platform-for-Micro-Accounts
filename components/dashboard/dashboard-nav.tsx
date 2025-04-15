"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  Building2,
  CreditCard,
  Home,
  Package,
  Settings,
  Users,
  ShoppingCart,
  FileText,
  Bell,
} from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  roles: string[]
}

const allNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
    roles: ["super-admin", "company-admin", "sub-user"],
  },
  {
    title: "Companies",
    href: "/dashboard/companies",
    icon: Building2,
    roles: ["super-admin"],
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: Users,
    roles: ["super-admin", "company-admin"],
  },
  {
    title: "Products",
    href: "/dashboard/products",
    icon: Package,
    roles: ["super-admin", "company-admin", "sub-user"],
  },
  {
    title: "Orders",
    href: "/dashboard/orders",
    icon: ShoppingCart,
    roles: ["super-admin", "company-admin", "sub-user"],
  },
  {
    title: "Payments",
    href: "/dashboard/payments",
    icon: CreditCard,
    roles: ["super-admin", "company-admin", "sub-user"],
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
    roles: ["super-admin", "company-admin"],
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: FileText,
    roles: ["super-admin", "company-admin"],
  },
  {
    title: "Notifications",
    href: "/dashboard/notifications",
    icon: Bell,
    roles: ["super-admin", "company-admin", "sub-user"],
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    roles: ["super-admin", "company-admin", "sub-user"],
  },
]

interface DashboardNavProps {
  onItemClick?: () => void
}

export function DashboardNav({ onItemClick }: DashboardNavProps) {
  const pathname = usePathname()
  const [userRole, setUserRole] = useState<string | null>(null)
  const [navItems, setNavItems] = useState<NavItem[]>([])

  useEffect(() => {
    // Get user role from localStorage
    const storedRole = localStorage.getItem("userRole")
    setUserRole(storedRole)

    // Filter nav items based on user role
    if (storedRole) {
      const filteredItems = allNavItems.filter((item) => item.roles.includes(storedRole))
      setNavItems(filteredItems)
    } else {
      // Default to showing all items if no role is found
      setNavItems(allNavItems)
    }
  }, [])

  return (
    <nav className="grid items-start gap-2 px-2 py-4">
      {navItems.map((item) => (
        <Link key={item.href} href={item.href} onClick={onItemClick}>
          <Button
            variant={pathname === item.href ? "default" : "ghost"}
            className={cn("w-full justify-start gap-2", pathname === item.href && "bg-primary text-primary-foreground")}
          >
            <item.icon className="size-4" />
            {item.title}
          </Button>
        </Link>
      ))}
    </nav>
  )
}
