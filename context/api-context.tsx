"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useToast } from "@/components/ui/use-toast"

type ApiKeys = {
  stripeKey: string | null
  mailgunKey: string | null
  firebaseConfigured: boolean
}

type ApiContextType = {
  apiKeys: ApiKeys
  isLoading: boolean
  isAuthenticated: boolean
  checkApiKeys: () => Promise<boolean>
  setApiKey: (keyName: keyof ApiKeys, value: string | boolean) => void
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const ApiContext = createContext<ApiContextType | undefined>(undefined)

export function ApiProvider({ children }: { children: ReactNode }) {
  const [apiKeys, setApiKeys] = useState<ApiKeys>({
    stripeKey: null,
    mailgunKey: null,
    firebaseConfigured: false,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is authenticated on mount
    const checkAuth = async () => {
      try {
        // In a real app, this would verify the session with the backend
        const token = localStorage.getItem("authToken")
        if (token) {
          setIsAuthenticated(true)
          await checkApiKeys()
        }
      } catch (error) {
        console.error("Authentication check failed:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const checkApiKeys = async (): Promise<boolean> => {
    try {
      // In a real app, this would fetch API key status from the backend
      const stripeKey = process.env.STRIPE_SECRET_KEY || localStorage.getItem("stripeKey")
      const mailgunKey = process.env.MAILGUN_API_KEY || localStorage.getItem("mailgunKey")
      const firebaseConfigured = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
        ? true
        : localStorage.getItem("firebaseConfigured") === "true"

      // Only update state if values have changed
      setApiKeys((prevKeys) => {
        if (
          prevKeys.stripeKey !== stripeKey ||
          prevKeys.mailgunKey !== mailgunKey ||
          prevKeys.firebaseConfigured !== firebaseConfigured
        ) {
          return {
            stripeKey: stripeKey,
            mailgunKey: mailgunKey,
            firebaseConfigured,
          }
        }
        return prevKeys
      })

      return !!(stripeKey && mailgunKey && firebaseConfigured)
    } catch (error) {
      console.error("Failed to check API keys:", error)
      return false
    }
  }

  const setApiKey = (keyName: keyof ApiKeys, value: string | boolean) => {
    setApiKeys((prev) => ({ ...prev, [keyName]: value }))

    // Store in localStorage for persistence
    if (typeof value === "string") {
      localStorage.setItem(keyName.toString(), value)
    } else {
      localStorage.setItem(keyName.toString(), value.toString())
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // In a real app, this would call your authentication API
      // For now, we'll simulate a successful login with the test credentials
      if (
        (email === "admin" && password === "admin@!") ||
        (email.includes("company") && password === "password") ||
        (email.includes("seller") && password === "password")
      ) {
        // Store user role based on email
        let userRole = "sub-user"
        if (email === "admin") userRole = "super-admin"
        else if (email.includes("company")) userRole = "company-admin"

        localStorage.setItem("authToken", "mock-jwt-token")
        localStorage.setItem("userRole", userRole)
        localStorage.setItem(
          "userName",
          email === "admin" ? "Super Admin" : email.includes("company") ? "Company Admin" : "Seller User",
        )
        localStorage.setItem("userEmail", email)

        setIsAuthenticated(true)
        return true
      }

      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Invalid credentials. Try admin/admin@! for Super Admin access.",
      })
      return false
    } catch (error) {
      console.error("Login failed:", error)
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "An error occurred during login. Please try again.",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userRole")
    localStorage.removeItem("userName")
    localStorage.removeItem("userEmail")
    setIsAuthenticated(false)
  }

  return (
    <ApiContext.Provider
      value={{
        apiKeys,
        isLoading,
        isAuthenticated,
        checkApiKeys,
        setApiKey,
        login,
        logout,
      }}
    >
      {children}
    </ApiContext.Provider>
  )
}

export function useApi() {
  const context = useContext(ApiContext)
  if (context === undefined) {
    throw new Error("useApi must be used within an ApiProvider")
  }
  return context
}
