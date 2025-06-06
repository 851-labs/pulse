import { BookIcon, CodeIcon, GithubIcon } from "lucide-react"
import { DesignBadge } from "./design-badge"

// -------------------------------------------------------------------------------------------------------------------

interface DesignPageHeaderProps {
  title: string
  description: string
  componentName?: string
}

function DesignPageHeader({ title, description, componentName }: DesignPageHeaderProps) {
  // Use component name for links, fallback to lowercased title
  const componentSlug = componentName || title.toLowerCase()

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      <p className="mt-2 text-lg text-gray-500">{description}</p>

      <div className="mt-4 flex items-center gap-2">
        <DesignBadge href={`https://base-ui.com/react/components/${componentSlug}`} icon={<BookIcon size={12} />}>
          Docs
        </DesignBadge>
        <DesignBadge
          href={`https://base-ui.com/react/components/${componentSlug}#api-reference`}
          icon={<CodeIcon size={12} />}
        >
          API Reference
        </DesignBadge>
        <DesignBadge
          href={`https://github.com/851-labs/pulse/blob/main/apps/web/src/components/ui/${componentSlug}.tsx`}
          icon={<GithubIcon size={12} />}
        >
          Source
        </DesignBadge>
      </div>
    </div>
  )
}

// -------------------------------------------------------------------------------------------------------------------

export { DesignPageHeader }
export type { DesignPageHeaderProps }
