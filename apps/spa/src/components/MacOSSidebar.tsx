import { useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'

interface SidebarItem {
  id: string
  label: string
  icon: string
  count?: number
  path?: string
  children?: SidebarItem[]
  isExpanded?: boolean
}

interface SidebarSection {
  id: string
  title: string
  items: SidebarItem[]
  isCollapsible?: boolean
  isExpanded?: boolean
}

const MacOSSidebar = () => {
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname

  const [sections, setSections] = useState<SidebarSection[]>([
    {
      id: 'favorites',
      title: 'Favorites',
      isCollapsible: false,
      items: [
        { id: 'today', label: 'Today', icon: '⚙️', path: '/today' },
        { id: 'all-inboxes', label: 'All Inboxes', icon: '📥', count: 9, path: '/inboxes' },
        { id: 'flagged', label: 'Flagged', icon: '🚩', count: 40, path: '/flagged' },
        { id: 'personal', label: 'Personal', icon: '🔷', count: 357, path: '/personal' },
      ],
    },
    {
      id: 'on-my-mac',
      title: 'On My Mac',
      isCollapsible: true,
      isExpanded: true,
      items: [
        { id: 'recovered', label: 'Recovered Mess...', icon: '📁', path: '/recovered' },
      ],
    },
    {
      id: 'personal-section',
      title: 'Personal',
      isCollapsible: true,
      isExpanded: true,
      items: [
        { id: 'important', label: 'Important', icon: '📁', count: 111, path: '/important' },
        { id: 'inbox', label: 'Inbox', icon: '📥', count: 2, path: '/inbox' },
        { id: 'drafts', label: 'Drafts', icon: '📄', path: '/drafts' },
        { id: 'sent', label: 'Sent', icon: '📤', path: '/sent' },
        { id: 'junk', label: 'Junk', icon: '🗑️', count: 3, path: '/junk' },
        { id: 'trash', label: 'Trash', icon: '🗑️', path: '/trash' },
        { id: 'archive', label: 'Archive', icon: '📦', count: 241, path: '/archive' },
        { id: 'amie', label: 'Amie', icon: '📁', path: '/amie' },
        { id: 'palette', label: 'Palette', icon: '📁', path: '/palette' },
        { id: 'receipts', label: 'Receipts', icon: '📁', path: '/receipts' },
        {
          id: 'zold',
          label: 'Zold',
          icon: '📁',
          path: '/zold',
          isExpanded: false,
          children: [
            { id: 'notion', label: '[Notion]', icon: '📁', path: '/zold/notion' },
            { id: 'campsite', label: 'Campsite', icon: '📁', path: '/zold/campsite' },
            { id: 'important-sub', label: 'Important', icon: '📁', path: '/zold/important' },
          ],
        },
      ],
    },
    {
      id: 'yahoo',
      title: 'Yahoo!',
      isCollapsible: true,
      isExpanded: true,
      items: [
        { id: 'yahoo-inbox', label: 'Inbox', icon: '📥', count: 46, path: '/yahoo/inbox' },
      ],
    },
    {
      id: 'icloud',
      title: 'iCloud',
      isCollapsible: true,
      isExpanded: true,
      items: [
        { id: 'icloud-inbox', label: 'Inbox', icon: '📥', path: '/icloud/inbox' },
      ],
    },
  ])

  const toggleSection = (sectionId: string) => {
    setSections(prev =>
      prev.map(section =>
        section.id === sectionId
          ? { ...section, isExpanded: !section.isExpanded }
          : section
      )
    )
  }

  const toggleItem = (sectionId: string, itemId: string) => {
    setSections(prev =>
      prev.map(section =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map(item =>
                item.id === itemId
                  ? { ...item, isExpanded: !item.isExpanded }
                  : item
              ),
            }
          : section
      )
    )
  }

  const renderItem = (item: SidebarItem, sectionId: string, depth: number = 0) => {
    const isActive = item.path === currentPath
    const hasChildren = item.children && item.children.length > 0

    return (
      <div key={item.id}>
        <Link
          to={item.path || '#'}
          className={`
            flex items-center px-2 py-0.5 mx-1 rounded-md text-[13px] leading-[22px]
            ${isActive ? 'bg-gray-300/50' : 'hover:bg-gray-200/50'}
            ${depth > 0 ? 'ml-5' : ''}
            transition-colors duration-150
          `}
          onClick={(e) => {
            if (hasChildren) {
              e.preventDefault()
              toggleItem(sectionId, item.id)
            }
          }}
        >
          {hasChildren && (
            <span
              className={`
                mr-1 text-gray-500 transition-transform duration-200
                ${item.isExpanded ? 'rotate-90' : ''}
              `}
            >
              ▶
            </span>
          )}
          <span className="mr-2 text-[16px]">{item.icon}</span>
          <span className="flex-1 text-gray-700">{item.label}</span>
          {item.count !== undefined && (
            <span className="text-gray-500 font-normal">{item.count}</span>
          )}
        </Link>
        {hasChildren && item.isExpanded && (
          <div>
            {item.children!.map(child => renderItem(child, sectionId, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="w-64 h-full bg-[#f5f5f7] border-r border-gray-300/50 overflow-y-auto select-none">
      {/* Window controls placeholder */}
      <div className="h-12 flex items-center px-4 border-b border-gray-300/30">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>

      {/* Sidebar content */}
      <div className="py-2">
        {sections.map(section => (
          <div key={section.id} className="mb-4">
            {section.title && (
              <div
                className={`
                  px-3 py-1 text-[11px] font-semibold text-gray-500 uppercase tracking-wide
                  flex items-center justify-between
                  ${section.isCollapsible ? 'cursor-pointer hover:text-gray-600' : ''}
                `}
                onClick={() => section.isCollapsible && toggleSection(section.id)}
              >
                <span>{section.title}</span>
                {section.isCollapsible && (
                  <span
                    className={`
                      text-[10px] transition-transform duration-200
                      ${section.isExpanded ? 'rotate-90' : ''}
                    `}
                  >
                    ▶
                  </span>
                )}
              </div>
            )}
            {section.isExpanded !== false && (
              <div>
                {section.items.map(item => renderItem(item, section.id))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MacOSSidebar