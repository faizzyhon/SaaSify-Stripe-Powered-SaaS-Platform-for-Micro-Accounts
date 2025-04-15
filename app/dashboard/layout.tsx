"use client"

import type React from "react"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { UserNav } from "@/components/dashboard/user-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { useApi } from "@/context/api-context"
import { ApiKeyPrompt } from "@/components/api-key-prompt"
import { useEffect, useState } from "react"
import { Loader2, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { apiKeys, isLoading, checkApiKeys } = useApi()
  const [isCheckingKeys, setIsCheckingKeys] = useState(true)
  const [keysConfigured, setKeysConfigured] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const checkKeys = async () => {
      if (!isCheckingKeys) return // Prevent multiple checks

      try {
        const result = await checkApiKeys()
        setKeysConfigured(result)
      } finally {
        setIsCheckingKeys(false)
      }
    }

    checkKeys()
  }, [checkApiKeys, isCheckingKeys]) // Only depend on checkApiKeys and isCheckingKeys

  if (isLoading || isCheckingKeys) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading...</span>
      </div>
    )
  }

  if (!keysConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4 bg-muted/30">
        <ApiKeyPrompt />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[300px] p-0">
                <div className="flex h-16 items-center border-b px-4">
                  <div className="flex items-center gap-2 font-bold">
                    <div className="size-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                      S
                    </div>
                    <span>SaaSify</span>
                  </div>
                </div>
                <div className="py-4">
                  <DashboardNav onItemClick={() => setIsMobileMenuOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>
            <div className="flex items-center gap-2 font-bold">
              <div className="size-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                S
              </div>
              <span>SaaSify</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <UserNav />
          </div>
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-16 z-30 -ml-2 hidden h-[calc(100vh-4rem)] w-full shrink-0 md:sticky md:block">
          <DashboardNav />
        </aside>
        <main className="flex w-full flex-col overflow-hidden pt-4 md:pt-0">
          <div className="flex-1 space-y-4 p-4 md:p-8 md:pt-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
