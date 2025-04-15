"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [userName, setUserName] = useState("User")
  const [userEmail, setUserEmail] = useState("user@example.com")
  const { toast } = useToast()

  useEffect(() => {
    // Get user info from localStorage
    const storedRole = localStorage.getItem("userRole")
    const storedName = localStorage.getItem("userName")
    const storedEmail = localStorage.getItem("userEmail")

    if (storedRole) setUserRole(storedRole)
    if (storedName) setUserName(storedName)
    if (storedEmail) setUserEmail(storedEmail)
  }, [])

  const handleSave = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
        <p className="text-muted-foreground">Manage your personal information and preferences</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg" alt="Profile picture" />
                <AvatarFallback className="text-lg">
                  {userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col space-y-2">
                <Button variant="outline" size="sm">
                  Upload new image
                </Button>
                <Button variant="ghost" size="sm">
                  Remove image
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue={userName} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={userEmail} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" placeholder="Tell us about yourself" />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>View your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Account Type</p>
                <p className="text-sm text-muted-foreground">
                  {userRole === "super-admin"
                    ? "Super Admin"
                    : userRole === "company-admin"
                      ? "Company Admin"
                      : "Seller"}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">Account Created</p>
                <p className="text-sm text-muted-foreground">April 15, 2023</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">Last Login</p>
                <p className="text-sm text-muted-foreground">Today at 10:30 AM</p>
              </div>

              {userRole === "sub-user" && (
                <div className="space-y-1">
                  <p className="text-sm font-medium">Stripe Connect Status</p>
                  <p className="text-sm text-muted-foreground">Not connected</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Connect Stripe Account
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {(userRole === "company-admin" || userRole === "sub-user") && (
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>Your company details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Company Name</p>
                  <p className="text-sm text-muted-foreground">Acme Inc</p>
                </div>

                {userRole === "sub-user" && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Company Admin</p>
                    <p className="text-sm text-muted-foreground">John Doe (john@acme.com)</p>
                  </div>
                )}

                {userRole === "company-admin" && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Sellers</p>
                    <p className="text-sm text-muted-foreground">5 active sellers</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
