import React from "react"

// -------------------------------------------------------------------------------------------------------------------

interface DesignPageHeaderProps {
  title: string
  description: string
}

function DesignPageHeader({ title, description }: DesignPageHeaderProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      <p className="mt-2 text-lg text-gray-500">{description}</p>
    </div>
  )
}

// -------------------------------------------------------------------------------------------------------------------

export { DesignPageHeader }
export type { DesignPageHeaderProps }
