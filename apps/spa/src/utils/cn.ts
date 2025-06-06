import { twMerge } from "tailwind-merge"

function cn(...inputs: (string | undefined | null | false)[]): string {
  return twMerge(inputs.filter(Boolean).join(" "))
}

export { cn }
