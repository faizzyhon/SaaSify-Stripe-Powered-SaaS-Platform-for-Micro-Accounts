"use client"

import type React from "react"

import { useState } from "react"
import { useApi } from "@/context/api-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { AlertCircle, KeyRound } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function ApiKeyPrompt() {
  const { apiKeys, setApiKey } = useApi()
  const [stripeKey, setStripeKey] = useState("")
  const [mailgunKey, setMailgunKey] = useState("")
  const [firebaseApiKey, setFirebaseApiKey] = useState("")
  const [firebaseAuthDomain, setFirebaseAuthDomain] = useState("")
  const [firebaseProjectId, setFirebaseProjectId] = useState("")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripeKey && !apiKeys.stripeKey) {
      toast({
        variant: "destructive",
        title: "Stripe key required",
        description: "Please enter your Stripe secret key to continue.",
      })
      return
    }

    if (!mailgunKey && !apiKeys.mailgunKey) {
      toast({
        variant: "destructive",
        title: "Mailgun key required",
        description: "Please enter your Mailgun API key to continue.",
      })
      return
    }

    if (!apiKeys.firebaseConfigured && (!firebaseApiKey || !firebaseAuthDomain || !firebaseProjectId)) {
      toast({
        variant: "destructive",
        title: "Firebase configuration required",
        description: "Please enter your Firebase configuration details to continue.",
      })
      return
    }

    if (stripeKey) setApiKey("stripeKey", stripeKey)
    if (mailgunKey) setApiKey("mailgunKey", mailgunKey)

    if (firebaseApiKey && firebaseAuthDomain && firebaseProjectId) {
      // In a real app, you would store the complete Firebase config
      localStorage.setItem("NEXT_PUBLIC_FIREBASE_API_KEY", firebaseApiKey)
      localStorage.setItem("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN", firebaseAuthDomain)
      localStorage.setItem("NEXT_PUBLIC_FIREBASE_PROJECT_ID", firebaseProjectId)
      setApiKey("firebaseConfigured", true)
    }

    toast({
      title: "API keys saved",
      description: "Your API keys have been saved successfully.",
    })
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center mb-2">
          <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <KeyRound className="h-6 w-6" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-center">API Configuration</CardTitle>
        <CardDescription className="text-center">
          Please provide the necessary API keys to use the platform
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <Alert
            variant="outline"
            className="bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/20 dark:border-amber-800/30 dark:text-amber-400"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Your API keys will be stored securely in your browser.</AlertDescription>
          </Alert>

          {!apiKeys.stripeKey && (
            <div className="space-y-2">
              <Label htmlFor="stripe-key">Stripe Secret Key</Label>
              <Input
                id="stripe-key"
                value={stripeKey}
                onChange={(e) => setStripeKey(e.target.value)}
                placeholder="sk_test_..."
                type="password"
                className="h-11"
              />
            </div>
          )}

          {!apiKeys.mailgunKey && (
            <div className="space-y-2">
              <Label htmlFor="mailgun-key">Mailgun API Key</Label>
              <Input
                id="mailgun-key"
                value={mailgunKey}
                onChange={(e) => setMailgunKey(e.target.value)}
                placeholder="key-..."
                type="password"
                className="h-11"
              />
            </div>
          )}

          {!apiKeys.firebaseConfigured && (
            <>
              <div className="pt-2 border-t">
                <h3 className="font-medium mb-2">Firebase Configuration</h3>
              </div>
              <div className="space-y-2">
                <Label htmlFor="firebase-api-key">Firebase API Key</Label>
                <Input
                  id="firebase-api-key"
                  value={firebaseApiKey}
                  onChange={(e) => setFirebaseApiKey(e.target.value)}
                  placeholder="AIzaSyC..."
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="firebase-auth-domain">Firebase Auth Domain</Label>
                <Input
                  id="firebase-auth-domain"
                  value={firebaseAuthDomain}
                  onChange={(e) => setFirebaseAuthDomain(e.target.value)}
                  placeholder="your-app.firebaseapp.com"
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="firebase-project-id">Firebase Project ID</Label>
                <Input
                  id="firebase-project-id"
                  value={firebaseProjectId}
                  onChange={(e) => setFirebaseProjectId(e.target.value)}
                  placeholder="your-project-id"
                  className="h-11"
                />
              </div>
            </>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full h-11">
            Save API Keys
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
