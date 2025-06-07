import React from "react"
import { cn } from "~/utils/cn"

interface DesignBadgeProps {
  children: React.ReactNode
  href?: string
  className?: string
  icon?: React.ReactNode
}

function DesignBadge({ children, href, className, icon }: DesignBadgeProps) {
  const baseClasses =
    "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-700 transition-colors duration-150 cursor-pointer"

  const content = (
    <>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cn(baseClasses, className)}>
        {content}
      </a>
    )
  }

  return <span className={cn(baseClasses, className)}>{content}</span>
}

export { DesignBadge }
export type { DesignBadgeProps }
