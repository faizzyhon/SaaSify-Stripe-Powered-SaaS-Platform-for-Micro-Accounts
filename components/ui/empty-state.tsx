"use client"

import type { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  actionLink?: string
  onAction?: () => void
}

export function EmptyState({ icon: Icon, title, description, actionLabel, actionLink, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="rounded-full bg-muted p-4 mb-4">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-md mb-6">{description}</p>
      {actionLabel &&
        (actionLink || onAction) &&
        (actionLink ? (
          <Link href={actionLink}>
            <Button size="lg">{actionLabel}</Button>
          </Link>
        ) : (
          <Button size="lg" onClick={onAction}>
            {actionLabel}
          </Button>
        ))}
    </div>
  )
}
