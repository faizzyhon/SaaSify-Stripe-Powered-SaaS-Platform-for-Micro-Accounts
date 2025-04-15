import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <div className="size-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              S
            </div>
            <span>SaaSify</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-24 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    Multi-Tenant SaaS Platform for Your Business
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Empower your company with a scalable platform for managing sellers, products, and payments.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/auth/register">
                    <Button size="lg" className="gap-1.5">
                      Get Started <ArrowRight className="size-4" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline">
                      Contact Sales
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-full overflow-hidden rounded-xl bg-muted p-4 md:h-[450px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-muted-foreground/20 opacity-50" />
                  <div className="relative z-10 h-full w-full rounded-lg bg-background/80 p-6 backdrop-blur-sm">
                    <div className="space-y-4">
                      <div className="h-6 w-24 rounded-md bg-muted" />
                      <div className="space-y-2">
                        <div className="h-4 w-full rounded-md bg-muted" />
                        <div className="h-4 w-full rounded-md bg-muted" />
                        <div className="h-4 w-2/3 rounded-md bg-muted" />
                      </div>
                      <div className="flex gap-2">
                        <div className="h-8 w-20 rounded-md bg-primary" />
                        <div className="h-8 w-20 rounded-md bg-muted" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Platform Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to manage your multi-tenant business
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex flex-col items-start space-y-4 rounded-lg border p-6 bg-background shadow-sm"
                >
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <feature.icon className="size-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Simple, Transparent Pricing
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that's right for your business
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 lg:grid-cols-3">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={cn(
                    "flex flex-col rounded-lg border bg-background p-6 shadow-sm",
                    plan.featured && "border-primary shadow-md",
                  )}
                >
                  <div className="space-y-2">
                    {plan.featured && (
                      <div className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                        Most Popular
                      </div>
                    )}
                    <h3 className="font-bold">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="ml-1 text-sm font-medium text-muted-foreground">/month</span>
                  </div>
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="size-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Link href="/auth/register">
                      <Button className="w-full" variant={plan.featured ? "default" : "outline"}>
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">© 2025 SaaSify. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    title: "Multi-Tenant Architecture",
    description: "Securely isolate data between companies with our robust multi-tenant infrastructure.",
    icon: CheckCircle,
  },
  {
    title: "Stripe Connect Integration",
    description: "Seamlessly connect seller accounts and manage payouts with Stripe Connect.",
    icon: CheckCircle,
  },
  {
    title: "Role-Based Access Control",
    description: "Granular permissions for Super Admins, Company Admins, and Sub-Users.",
    icon: CheckCircle,
  },
  {
    title: "White-Label Email Delivery",
    description: "Configure custom Mailgun domains for branded email communication.",
    icon: CheckCircle,
  },
  {
    title: "Real-Time Notifications",
    description: "Instant updates on account status, payouts, and system events.",
    icon: CheckCircle,
  },
  {
    title: "Comprehensive Analytics",
    description: "Track platform usage, performance metrics, and business insights.",
    icon: CheckCircle,
  },
]

const pricingPlans = [
  {
    name: "Starter",
    description: "Perfect for small businesses just getting started",
    price: 49,
    featured: false,
    features: [
      "Up to 5 Company Admins",
      "Up to 20 Sub-Users",
      "Basic analytics",
      "Standard email templates",
      "Community support",
    ],
  },
  {
    name: "Professional",
    description: "Ideal for growing businesses with multiple sellers",
    price: 99,
    featured: true,
    features: [
      "Up to 20 Company Admins",
      "Up to 100 Sub-Users",
      "Advanced analytics",
      "Custom email templates",
      "Priority support",
      "API access",
    ],
  },
  {
    name: "Enterprise",
    description: "For large organizations with complex requirements",
    price: 249,
    featured: false,
    features: [
      "Unlimited Company Admins",
      "Unlimited Sub-Users",
      "Enterprise analytics",
      "Custom integrations",
      "Dedicated support",
      "SLA guarantees",
    ],
  },
]
