import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const signature = request.headers.get("stripe-signature") || ""

    // In a real app, this would verify the webhook signature
    // and process the event based on its type

    console.log("Received webhook event")
    console.log("Signature:", signature.substring(0, 10) + "...")
    console.log("Body length:", body.length)

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error(`Webhook error: ${error.message}`)
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
