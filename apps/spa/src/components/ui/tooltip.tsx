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
            "flex origin-[var(--transform-origin)] flex-col rounded-md bg-[canvas] px-2 py-1.5",
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
            "data-[ending-style]:scale-90 data-[ending-style]:opacity-0",
            "data-[instant]:duration-0",
            "data-[starting-style]:scale-90 data-[starting-style]:opacity-0",
          )}
        >
          <TooltipPrimitive.Arrow className="hidden data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=right]:left-[-13px] data-[side=top]:bottom-[-8px] data-[side=left]:rotate-90 data-[side=right]:-rotate-90 data-[side=top]:rotate-180">
            <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
              <path
                d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
                className="fill-[canvas]"
              />
              {/* <path
                d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
                className="fill-gray-200 dark:fill-none"
              /> */}
              <path
                d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
                className="fill-gray-300"
              />
            </svg>
          </TooltipPrimitive.Arrow>

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
