import { forwardRef } from "react"
import { cn } from "../../utils/cn"

// -------------------------------------------------------------------------------------------------------------------

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline-solid" | "destructive"
  size?: "sm" | "md" | "lg"
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, disabled, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-40 disabled:pointer-events-none"

    const variants = {
      primary: "bg-gray-900 text-white hover:bg-gray-800 shadow-xs hover:shadow-md focus-visible:ring-gray-500",
      secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200/60 focus-visible:ring-gray-400",
      outline:
        "border border-gray-300/80 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400/80 shadow-xs focus-visible:ring-gray-400",
      destructive: "bg-red-500 text-white hover:bg-red-600 shadow-xs hover:shadow-md focus-visible:ring-red-400",
    }

    const sizes = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base",
    }

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="-ml-1 mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    )
  },
)

// -------------------------------------------------------------------------------------------------------------------

export { Button }
export type { ButtonProps }
