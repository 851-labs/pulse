import * as React from "react"
import { Tooltip as TooltipPrimitive } from "@base-ui-components/react/tooltip"
import { cn } from "~/utils/cn"

// -------------------------------------------------------------------------------------------------------------------

const Provider = TooltipPrimitive.Provider

// -------------------------------------------------------------------------------------------------------------------

const Root = TooltipPrimitive.Root

// -------------------------------------------------------------------------------------------------------------------

const Trigger = TooltipPrimitive.Trigger

// -------------------------------------------------------------------------------------------------------------------

type ContentProps = React.ComponentProps<typeof TooltipPrimitive.Popup> & {
  side?: "top" | "bottom" | "left" | "right"
  sideOffset?: number
  align?: "start" | "center" | "end"
}

function Content({ className, side = "top", sideOffset = 10, align = "center", ...props }: ContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner side={side} sideOffset={sideOffset} align={align}>
        <TooltipPrimitive.Popup
          {...props}
          className={cn(
            "origin-(--transform-origin) flex flex-col rounded-md bg-[canvas] px-2 py-1.5",
            // Text
            "text-xs font-[450] leading-none text-gray-700 dark:text-gray-100",
            // Background color
            "bg-gray-100/80 backdrop-blur-xl backdrop-saturate-200 dark:bg-gray-800/80",
            // Shadow
            "shadow-md dark:shadow-xl",
            // Border
            "border-[0.5px]",
            // Animations
            "transition-[transform,scale,opacity]",
            "data-ending-style:scale-90 data-ending-style:opacity-0",
            "data-instant:duration-0",
            "data-starting-style:scale-90 data-starting-style:opacity-0",
          )}
        >
          {props.children}
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
}

// -------------------------------------------------------------------------------------------------------------------

export const TooltipProvider = Provider
export const Tooltip = Object.assign(Root, {
  Trigger,
  Content,
})

export type { ContentProps as TooltipContentProps }
