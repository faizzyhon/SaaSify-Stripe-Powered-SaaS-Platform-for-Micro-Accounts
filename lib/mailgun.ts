// Replace with a simpler implementation that doesn't rely on mailgun.js

// Helper functions for Mailgun operations
export const sendEmail = async (
  to: string,
  subject: string,
  template: string,
  variables: Record<string, any>,
  domain?: string,
) => {
  try {
    // In a real implementation, this would use the Mailgun API
    console.log(`Sending email to ${to} with subject "${subject}" using template "${template}"`)
    console.log("Variables:", variables)
    console.log("Domain:", domain || process.env.MAILGUN_DOMAIN)

    // Mock successful response
    return {
      id: `mock-email-${Date.now()}`,
      message: "Email sent successfully",
    }
  } catch (error) {
    console.error("Error sending email:", error)
    throw error
  }
}

export const sendWelcomeEmail = async (to: string, name: string, companyName: string, domain?: string) => {
  return sendEmail(
    to,
    "Welcome to SaaSify",
    "welcome_template",
    {
      name,
      companyName,
      loginUrl: `${process.env.NEXT_PUBLIC_APP_URL}/auth/login`,
    },
    domain,
  )
}

export const sendPasswordResetEmail = async (to: string, resetLink: string, domain?: string) => {
  return sendEmail(
    to,
    "Reset Your Password",
    "password_reset_template",
    {
      resetLink,
    },
    domain,
  )
}

export const sendStripeAccountUpdatedEmail = async (to: string, accountStatus: string, domain?: string) => {
  return sendEmail(
    to,
    "Your Stripe Account Status Has Been Updated",
    "stripe_account_updated_template",
    {
      accountStatus,
      dashboardUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    },
    domain,
  )
}

export const sendPayoutNotificationEmail = async (
  to: string,
  amount: number,
  currency: string,
  status: string,
  domain?: string,
) => {
  return sendEmail(
    to,
    `Payout ${status === "paid" ? "Completed" : "Update"}`,
    "payout_notification_template",
    {
      amount,
      currency,
      status,
      dashboardUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/payouts`,
    },
    domain,
  )
}
