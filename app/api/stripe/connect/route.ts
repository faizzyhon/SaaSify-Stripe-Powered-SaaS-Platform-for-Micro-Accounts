import { NextResponse } from "next/server"
import Stripe from "stripe"

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

export async function POST(request: Request) {
  try {
    const { userId, companyId } = await request.json()

    if (!userId || !companyId) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    // In a real app, this would create a Stripe Connect account
    // and store the account ID in Firestore

    // Mock successful response with a redirect URL
    const mockAccountLinkUrl = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/stripe/onboarding?mock=true`

    return NextResponse.json({ url: mockAccountLinkUrl })
  } catch (error) {
    console.error("Error creating Stripe Connect account:", error)
    return NextResponse.json({ error: "Failed to create Stripe Connect account" }, { status: 500 })
  }
}
