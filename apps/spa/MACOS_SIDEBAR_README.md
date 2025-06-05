# macOS-Style Sidebar Implementation

This implementation provides a pixel-perfect recreation of the macOS Mail app sidebar with the following features:

## Key Features

1. **Authentic macOS Styling**
   - System font stack (-apple-system, SF Pro Text)
   - Precise color values matching macOS design
   - Native-style scrollbars
   - Traffic light window controls

2. **Hierarchical Navigation**
   - Collapsible sections with smooth animations
   - Nested items with proper indentation
   - Active state highlighting
   - Item counts displayed on the right

3. **Interactive Elements**
   - Hover states with macOS-style transitions
   - Expandable/collapsible sections
   - Smooth animations (150ms transitions)
   - User profile section with logout

## Color Palette

- Background: `#f5f5f7`
- Borders: `#d2d2d7`
- Text Primary: `#1d1d1f`
- Text Secondary: `#6e6e73`
- Text Tertiary: `#8e8e93`
- Hover State: `#e8e8e8`
- Active State: `#e1e1e1`
- Blue Accent: `#007AFF`
- Green: `#34C759`
- Red: `#FF3B30`

## Typography

- Section Headers: 11px, uppercase, 0.06em tracking
- Items: 13px, normal weight
- Counts: 13px, normal weight

## Usage

The sidebar is integrated into the authenticated layout and automatically appears when users are logged in. It includes:

- Navigation items with icons
- Collapsible sections
- User profile with avatar
- Sign out option

## File Structure

- `/components/MacOSSidebar.tsx` - Main sidebar component
- `/styles/app.css` - Global styles including macOS font stack
- `/routes/_authed.tsx` - Layout integration

The sidebar respects macOS design principles while being fully functional in a web environment.