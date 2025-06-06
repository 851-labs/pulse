import { useEffect, useState } from "react"
import { codeToHtml } from "shiki"
import { cn } from "~/utils/cn"

// -------------------------------------------------------------------------------------------------------------------

interface CodeBlockProps {
  code: string
  language?: string
  theme?: string
  className?: string
}

function CodeBlock({ code, language = "typescript", theme = "github-dark", className }: CodeBlockProps) {
  const [highlightedHtml, setHighlightedHtml] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function highlightCode() {
      try {
        setIsLoading(true)
        const html = await codeToHtml(code.trim(), {
          lang: language,
          theme: theme,
        })
        setHighlightedHtml(html)
      } catch (error) {
        console.error("Failed to highlight code:", error)
        // Fallback to plain code if highlighting fails
        setHighlightedHtml(`<pre><code>${code.trim()}</code></pre>`)
      } finally {
        setIsLoading(false)
      }
    }

    highlightCode()
  }, [code, language, theme])

  // Show actual code content during loading to prevent layout shift
  if (isLoading) {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-lg bg-gray-900",
          "shadow-inner",
          "before:pointer-events-none before:absolute before:inset-0 before:rounded-lg before:border before:border-gray-800/20",
          className,
        )}
      >
        <pre className="m-0 overflow-x-auto whitespace-pre p-4 font-mono text-[13px] leading-relaxed text-gray-300">
          <code>{code.trim()}</code>
        </pre>
      </div>
    )
  }

  return (
    <div
      className={cn(
        // Container styling with inset effect
        "relative overflow-hidden rounded-lg",
        "shadow-inner",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-lg before:border before:border-gray-800/20",
        // Custom typography for code
        "[&_pre]:!font-mono [&_pre]:!text-[13px] [&_pre]:!leading-relaxed",
        "[&_pre]:m-0 [&_pre]:p-4",
        // Ensure proper overflow handling
        "[&_pre]:overflow-x-auto [&_pre]:whitespace-pre",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: highlightedHtml }}
    />
  )
}

// -------------------------------------------------------------------------------------------------------------------

export { CodeBlock }
export type { CodeBlockProps }
