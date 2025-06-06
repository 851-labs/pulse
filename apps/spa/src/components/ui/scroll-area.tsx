import * as React from "react"
import { ScrollArea as ScrollAreaPrimitive } from "@base-ui-components/react/scroll-area"
import { cn } from "~/utils/cn"

// -------------------------------------------------------------------------------------------------------------------

interface ScrollAreaRootProps extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  className?: string
  orientation?: "vertical" | "horizontal"
}

function ScrollAreaRoot({ className, children, orientation = "vertical", ...props }: ScrollAreaRootProps) {
  return (
    <ScrollAreaPrimitive.Root className={cn(className)} {...props}>
      {children}
      <ScrollAreaScrollbar orientation={orientation}>
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollAreaPrimitive.Root>
  )
}

// -------------------------------------------------------------------------------------------------------------------

interface ScrollAreaViewportProps extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Viewport> {
  className?: string
}

function ScrollAreaViewport({ className, ...props }: ScrollAreaViewportProps) {
  return (
    <ScrollAreaPrimitive.Viewport
      className={cn("h-full w-full overscroll-contain rounded-[inherit]", className)}
      {...props}
    />
  )
}

// -------------------------------------------------------------------------------------------------------------------

interface ScrollAreaContentProps extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Content> {
  className?: string
}

function ScrollAreaContent({ className, ...props }: ScrollAreaContentProps) {
  return <ScrollAreaPrimitive.Content className={className} {...props} />
}

// -------------------------------------------------------------------------------------------------------------------

interface ScrollAreaScrollbarProps extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Scrollbar> {
  className?: string
  orientation?: "vertical" | "horizontal"
}

function ScrollAreaScrollbar({ className, orientation = "vertical", ...props }: ScrollAreaScrollbarProps) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      orientation={orientation}
      className={cn(
        "flex touch-none select-none",
        orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-px",
        orientation === "horizontal" && "h-2.5 w-full flex-col border-t border-t-transparent p-px",
        "opacity-0 transition-opacity delay-300",
        "data-[hovering]:opacity-100 data-[hovering]:delay-0 data-[hovering]:duration-75",
        "data-[scrolling]:opacity-100 data-[scrolling]:delay-0 data-[scrolling]:duration-75",
        className,
      )}
      {...props}
    />
  )
}

// -------------------------------------------------------------------------------------------------------------------

interface ScrollAreaThumbProps extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Thumb> {
  className?: string
}

function ScrollAreaThumb({ className, ...props }: ScrollAreaThumbProps) {
  return (
    <ScrollAreaPrimitive.Thumb
      className={cn("relative flex-1 rounded-full bg-gray-300 transition-colors hover:bg-gray-400", className)}
      {...props}
    />
  )
}

// -------------------------------------------------------------------------------------------------------------------

interface ScrollAreaCornerProps extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Corner> {
  className?: string
}

function ScrollAreaCorner({ className, ...props }: ScrollAreaCornerProps) {
  return <ScrollAreaPrimitive.Corner className={cn("bg-gray-200", className)} {...props} />
}

// -------------------------------------------------------------------------------------------------------------------

const ScrollArea = Object.assign(ScrollAreaRoot, {
  Root: ScrollAreaRoot,
  Viewport: ScrollAreaViewport,
  Content: ScrollAreaContent,
})

export { ScrollArea }
export type { ScrollAreaRootProps, ScrollAreaViewportProps, ScrollAreaContentProps }
