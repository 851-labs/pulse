import * as React from "react"
import { ScrollArea } from "~/components/ui/scroll-area"
import { cn } from "~/utils/cn"

// Root component props
interface AppShellRootProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

// Sidebar component props
interface AppShellSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  width?: string
  className?: string
}

// Content component props
interface AppShellContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  padding?: string
}

// Root component
function AppShellRoot({ children, className, ...props }: AppShellRootProps) {
  return (
    <div className={cn("flex h-full w-full flex-row flex-nowrap bg-gray-100 dark:bg-gray-950", className)} {...props}>
      {children}
    </div>
  )
}

// Sidebar component
function AppShellSidebar({ children, className, ...props }: AppShellSidebarProps) {
  return (
    <div className={cn("w-60", className)} {...props}>
      {children}
    </div>
  )
}

// Content component
function AppShellContent({ children, className, padding = "p-12", ...props }: AppShellContentProps) {
  return (
    <div className={cn("flex min-h-0 flex-1 flex-col flex-nowrap p-2 pl-0", className)} {...props}>
      <ScrollArea className="shadow-2xs flex min-h-0 flex-1 flex-col flex-nowrap rounded-lg border-[0.5px] bg-white dark:bg-gray-900">
        <ScrollArea.Viewport>
          <ScrollArea.Content className={cn(padding)}>{children}</ScrollArea.Content>
        </ScrollArea.Viewport>
      </ScrollArea>
    </div>
  )
}

// Compound component assembly
const AppShell = Object.assign(AppShellRoot, {
  Sidebar: AppShellSidebar,
  Content: AppShellContent,
})

export { AppShell }
export type { AppShellRootProps, AppShellSidebarProps, AppShellContentProps }
