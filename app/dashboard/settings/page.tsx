"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Switch } from "@/components/ui/switch"
import { CreditCard } from "lucide-react"

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Get user role from localStorage
    const storedRole = localStorage.getItem("userRole")
    setUserRole(storedRole)
  }, [])

  const handleSave = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Settings saved",
        description: "Your settings have been saved successfully.",
      })
    }, 1000)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          {userRole === "super-admin" && <TabsTrigger value="platform-api">Platform API</TabsTrigger>}
          {(userRole === "super-admin" || userRole === "company-admin") && (
            <>
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="stripe">Stripe</TabsTrigger>
            </>
          )}
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* General Settings Tab */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your account settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  defaultValue={
                    userRole === "super-admin"
                      ? "Super Admin"
                      : userRole === "company-admin"
                        ? "Company Admin"
                        : "Seller User"
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  defaultValue={
                    userRole === "super-admin"
                      ? "admin@saasify.app"
                      : userRole === "company-admin"
                        ? "company@example.com"
                        : "seller@example.com"
                  }
                />
              </div>
              {(userRole === "super-admin" || userRole === "company-admin") && (
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" defaultValue={userRole === "super-admin" ? "SaaSify" : "Acme Inc"} />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <select
                  id="timezone"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                </select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Platform API Settings Tab (Super Admin Only) */}
        {userRole === "super-admin" && (
          <TabsContent value="platform-api" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Firebase Configuration</CardTitle>
                <CardDescription>Configure your Firebase settings for authentication and database</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="firebase-api-key">Firebase API Key</Label>
                  <Input id="firebase-api-key" placeholder="AIzaSyC..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="firebase-auth-domain">Firebase Auth Domain</Label>
                  <Input id="firebase-auth-domain" placeholder="your-app.firebaseapp.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="firebase-project-id">Firebase Project ID</Label>
                  <Input id="firebase-project-id" placeholder="your-project-id" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="firebase-storage-bucket">Firebase Storage Bucket</Label>
                  <Input id="firebase-storage-bucket" placeholder="your-app.appspot.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="firebase-messaging-sender-id">Firebase Messaging Sender ID</Label>
                  <Input id="firebase-messaging-sender-id" placeholder="123456789012" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="firebase-app-id">Firebase App ID</Label>
                  <Input id="firebase-app-id" placeholder="1:123456789012:web:abc123def456" />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>Configure global platform settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="platform-name">Platform Name</Label>
                  <Input id="platform-name" defaultValue="SaaSify" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="platform-url">Platform URL</Label>
                  <Input id="platform-url" defaultValue="https://saasify.app" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="platform-description">Platform Description</Label>
                  <Textarea
                    id="platform-description"
                    defaultValue="Multi-tenant SaaS platform for managing sellers, products, and payments."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rate-limit">API Rate Limit (requests/hour)</Label>
                  <Input id="rate-limit" type="number" defaultValue="1000" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="auto-suspend" />
                  <Label htmlFor="auto-suspend">Auto-suspend companies with invalid Stripe accounts</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        )}

        {/* Email Settings Tab */}
        {(userRole === "super-admin" || userRole === "company-admin") && (
          <TabsContent value="email" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Email Settings</CardTitle>
                <CardDescription>Configure your Mailgun settings for transactional emails</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mailgun-api-key">Mailgun API Key</Label>
                  <Input id="mailgun-api-key" type="password" placeholder="key-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mailgun-domain">Mailgun Domain</Label>
                  <Input id="mailgun-domain" placeholder="mail.yourdomain.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="from-email">From Email</Label>
                  <Input id="from-email" placeholder="noreply@yourdomain.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reply-to-email">Reply-To Email</Label>
                  <Input id="reply-to-email" placeholder="support@yourdomain.com" />
                </div>
                {userRole === "company-admin" && (
                  <div className="flex items-center space-x-2">
                    <Switch id="white-label" />
                    <Label htmlFor="white-label">Enable white-label emails with company branding</Label>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>

            {userRole === "super-admin" && (
              <Card>
                <CardHeader>
                  <CardTitle>Email Templates</CardTitle>
                  <CardDescription>Manage system email templates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="justify-start">
                      Welcome Email
                    </Button>
                    <Button variant="outline" className="justify-start">
                      Password Reset
                    </Button>
                    <Button variant="outline" className="justify-start">
                      Account Verification
                    </Button>
                    <Button variant="outline" className="justify-start">
                      Stripe Connect Onboarding
                    </Button>
                    <Button variant="outline" className="justify-start">
                      Payout Notification
                    </Button>
                    <Button variant="outline" className="justify-start">
                      Order Confirmation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        )}

        {/* Stripe Settings Tab */}
        {(userRole === "super-admin" || userRole === "company-admin") && (
          <TabsContent value="stripe" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Stripe Settings</CardTitle>
                <CardDescription>Configure your Stripe Connect settings for payments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="stripe-publishable-key">Stripe Publishable Key</Label>
                  <Input id="stripe-publishable-key" placeholder="pk_test_..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stripe-secret-key">Stripe Secret Key</Label>
                  <Input id="stripe-secret-key" type="password" placeholder="sk_test_..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stripe-webhook-secret">Stripe Webhook Secret</Label>
                  <Input id="stripe-webhook-secret" type="password" placeholder="whsec_..." />
                </div>
                {userRole === "super-admin" && (
                  <div className="space-y-2">
                    <Label htmlFor="platform-fee-percentage">Platform Fee Percentage</Label>
                    <Input id="platform-fee-percentage" type="number" defaultValue="5" />
                  </div>
                )}
                {userRole === "company-admin" && (
                  <div className="space-y-2">
                    <Label htmlFor="company-fee-percentage">Company Fee Percentage</Label>
                    <Input id="company-fee-percentage" type="number" defaultValue="10" />
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>

            {userRole === "company-admin" && (
              <Card>
                <CardHeader>
                  <CardTitle>Connect Stripe Account</CardTitle>
                  <CardDescription>Connect your company's Stripe account to receive payments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-md bg-muted p-4">
                    <div className="flex items-center gap-4">
                      <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <CreditCard className="size-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Stripe Account Status</p>
                        <p className="text-sm text-muted-foreground">Not connected</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Connect Stripe Account</Button>
                </CardFooter>
              </Card>
            )}
          </TabsContent>
        )}

        {/* Notifications Settings Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">In-App Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive notifications within the platform</p>
                  </div>
                  <Switch id="in-app-notifications" defaultChecked />
                </div>
                <Separator className="my-4" />
                <h3 className="text-lg font-medium">Notification Types</h3>
                <div className="space-y-2">
                  {notificationTypes.map((type) => (
                    <div key={type.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{type.name}</p>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </div>
                      <Switch id={`notification-${type.id}`} defaultChecked={type.defaultEnabled} />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Security Settings Tab */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="two-factor" />
                <Label htmlFor="two-factor">Enable Two-Factor Authentication</Label>
              </div>
              {userRole === "super-admin" && (
                <>
                  <Separator className="my-4" />
                  <h3 className="text-lg font-medium">API Access</h3>
                  <div className="space-y-2">
                    <Label htmlFor="api-token">API Token</Label>
                    <div className="flex gap-2">
                      <Input id="api-token" value="••••••••••••••••••••••••••••••" readOnly />
                      <Button variant="outline" size="sm">
                        Generate New
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      This token provides full access to the API. Keep it secure.
                    </p>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Helper components
const Separator = ({ className }: { className?: string }) => (
  <div className={cn("h-[1px] w-full bg-border", className)} />
)

// Helper function
const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(" ")
}

// Sample notification types
const notificationTypes = [
  {
    id: "account",
    name: "Account Updates",
    description: "Notifications about your account status and security",
    defaultEnabled: true,
  },
  {
    id: "products",
    name: "Product Updates",
    description: "Notifications about product approvals and changes",
    defaultEnabled: true,
  },
  {
    id: "payments",
    name: "Payment Notifications",
    description: "Notifications about payments and payouts",
    defaultEnabled: true,
  },
  {
    id: "users",
    name: "User Management",
    description: "Notifications about user registrations and changes",
    defaultEnabled: true,
  },
  {
    id: "system",
    name: "System Notifications",
    description: "Important system updates and maintenance notices",
    defaultEnabled: true,
  },
]
