import { useState } from "react"
import { Link, useRouterState } from "@tanstack/react-router"
import { Route as RootRoute } from "../routes/__root"

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
  const { user } = RootRoute.useRouteContext()

  const [sections, setSections] = useState<SidebarSection[]>([
    {
      id: "favorites",
      title: "Favorites",
      isCollapsible: false,
      items: [
        { id: "today", label: "Today", icon: "⚙", path: "/" },
        { id: "all-inboxes", label: "All Posts", icon: "📥", count: 9, path: "/posts" },
        { id: "flagged", label: "Flagged", icon: "🚩", count: 40, path: "/posts" },
        { id: "personal", label: "Personal", icon: "G", count: 357, path: "/posts" },
      ],
    },
    {
      id: "on-my-mac",
      title: "On My Mac",
      isCollapsible: true,
      isExpanded: true,
      items: [{ id: "recovered", label: "Recovered Mess...", icon: "📁", path: "/posts" }],
    },
    {
      id: "personal-section",
      title: "Personal",
      isCollapsible: true,
      isExpanded: true,
      items: [
        { id: "important", label: "Important", icon: "📁", count: 111, path: "/posts" },
        { id: "inbox", label: "Inbox", icon: "📥", count: 2, path: "/posts" },
        { id: "drafts", label: "Drafts", icon: "📄", path: "/posts" },
        { id: "sent", label: "Sent", icon: "➤", path: "/posts" },
        { id: "junk", label: "Junk", icon: "🗑", count: 3, path: "/posts" },
        { id: "trash", label: "Trash", icon: "🗑", path: "/posts" },
        { id: "archive", label: "Archive", icon: "📦", count: 241, path: "/posts" },
        { id: "amie", label: "Amie", icon: "📁", path: "/posts" },
        { id: "palette", label: "Palette", icon: "📁", path: "/posts" },
        { id: "receipts", label: "Receipts", icon: "📁", path: "/posts" },
        {
          id: "zold",
          label: "Zold",
          icon: "▸",
          path: "/posts",
          isExpanded: false,
          children: [
            { id: "notion", label: "[Notion]", icon: "📁", path: "/posts" },
            { id: "campsite", label: "Campsite", icon: "📁", path: "/posts" },
            { id: "important-sub", label: "Important", icon: "📁", path: "/posts" },
          ],
        },
      ],
    },
    {
      id: "yahoo",
      title: "Yahoo!",
      isCollapsible: true,
      isExpanded: true,
      items: [{ id: "yahoo-inbox", label: "Inbox", icon: "📥", count: 46, path: "/posts" }],
    },
    {
      id: "icloud",
      title: "iCloud",
      isCollapsible: true,
      isExpanded: true,
      items: [{ id: "icloud-inbox", label: "Inbox", icon: "📥", path: "/posts" }],
    },
  ])

  const toggleSection = (sectionId: string) => {
    setSections((prev) =>
      prev.map((section) => (section.id === sectionId ? { ...section, isExpanded: !section.isExpanded } : section)),
    )
  }

  const toggleItem = (sectionId: string, itemId: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map((item) =>
                item.id === itemId ? { ...item, isExpanded: !item.isExpanded } : item,
              ),
            }
          : section,
      ),
    )
  }

  const renderItem = (item: SidebarItem, sectionId: string, depth: number = 0) => {
    const isActive = item.path === currentPath
    const hasChildren = item.children && item.children.length > 0

    return (
      <div key={item.id}>
        <Link
          to={item.path || "#"}
          className={`mx-1 flex items-center rounded-[5px] px-2 py-0.5 text-[13px] leading-[22px] ${isActive ? "bg-[#e1e1e1]" : "hover:bg-[#e8e8e8]"} ${depth > 0 ? "ml-5" : ""} transition-colors duration-75`}
          onClick={(e) => {
            if (hasChildren) {
              e.preventDefault()
              toggleItem(sectionId, item.id)
            }
          }}
        >
          {hasChildren && (
            <span
              className={`mr-0.5 text-[11px] text-[#6e6e73] transition-transform duration-150 ${item.isExpanded ? "rotate-90" : ""} `}
            >
              ▸
            </span>
          )}
          {item.icon === "G" ? (
            <span className="mr-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#007AFF] text-[10px] font-medium text-white">
              G
            </span>
          ) : (
            <span className="mr-2 text-[16px] opacity-80">{item.icon}</span>
          )}
          <span className="flex-1 text-[#1d1d1f]">{item.label}</span>
          {item.count !== undefined && <span className="text-[13px] font-normal text-[#8e8e93]">{item.count}</span>}
        </Link>
        {hasChildren && item.isExpanded && (
          <div>{item.children!.map((child) => renderItem(child, sectionId, depth + 1))}</div>
        )}
      </div>
    )
  }

  return (
    <div className="macos-sidebar flex h-full w-64 select-none flex-col overflow-y-auto border-r border-[#d2d2d7] bg-[#f5f5f7]">
      {/* Window controls placeholder */}
      <div className="flex h-12 items-center border-b border-[#d2d2d7]/50 px-4">
        <div className="macos-traffic-lights flex gap-2">
          <div className="macos-traffic-light h-3 w-3 rounded-full bg-[#ff5f57]"></div>
          <div className="macos-traffic-light h-3 w-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="macos-traffic-light h-3 w-3 rounded-full bg-[#28ca42]"></div>
        </div>
      </div>

      {/* Sidebar content */}
      <div className="flex-1 py-1">
        {sections.map((section) => (
          <div key={section.id} className="mb-3">
            {section.title && (
              <div
                className={`flex items-center justify-between px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#6e6e73] ${section.isCollapsible ? "cursor-pointer hover:text-[#48484a]" : ""} `}
                onClick={() => section.isCollapsible && toggleSection(section.id)}
              >
                <span>{section.title}</span>
                {section.isCollapsible && (
                  <span
                    className={`text-[10px] transition-transform duration-150 ${section.isExpanded ? "rotate-90" : ""} `}
                  >
                    ▸
                  </span>
                )}
              </div>
            )}
            {section.isExpanded !== false && <div>{section.items.map((item) => renderItem(item, section.id))}</div>}
          </div>
        ))}
      </div>

      {/* User info and logout */}
      {user && (
        <div className="border-t border-[#d2d2d7] p-3">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#007AFF] text-sm font-medium text-white">
                {user.email.charAt(0).toUpperCase()}
              </div>
              <span className="max-w-[140px] truncate text-[13px] font-medium text-[#1d1d1f]">{user.email}</span>
            </div>
          </div>
          <Link to="/logout" className="block text-[13px] text-[#6e6e73] transition-colors hover:text-[#007AFF]">
            Sign Out
          </Link>
        </div>
      )}
    </div>
  )
}

export default MacOSSidebar
