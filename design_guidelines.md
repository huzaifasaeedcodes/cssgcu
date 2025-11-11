# Computer Science Society Website - Design Guidelines

## Design Approach
**System-Based Approach** with modern institutional aesthetics. Drawing from professional university and tech society websites with emphasis on clarity, professionalism, and student engagement. The design balances academic credibility with youthful energy.

## Core Design Principles
- **Professional yet Approachable**: Academic prestige meets student accessibility
- **Information Hierarchy**: Clear visual flow guiding users to key actions (event registration, team info)
- **Grid-Based Precision**: Structured layouts maintaining consistency across all sections

## Typography System

**Primary Font**: Poppins (via Google Fonts CDN)
- Hero/H1: 3.5rem (56px) / font-bold
- H2 Section Headers: 2.5rem (40px) / font-semibold
- H3 Card Titles: 1.5rem (24px) / font-medium
- Body Text: 1rem (16px) / font-normal
- Small/Meta: 0.875rem (14px) / font-normal

**Fallback Stack**: system-ui, -apple-system, sans-serif

## Layout System

**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, 20
- Section Padding: py-16 to py-20 (desktop), py-12 (mobile)
- Card Padding: p-6
- Component Gaps: gap-6 to gap-8
- Container Max-Width: max-w-7xl

**Grid Patterns**:
- Team Cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- Event Cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Past Events Gallery: grid-cols-2 md:grid-cols-3 lg:grid-cols-4

## Component Library

### Navigation Header
- Fixed top navigation with backdrop blur on scroll
- Horizontal menu items with subtle hover underline effect
- Mobile: Hamburger menu transforming to full-screen overlay
- Logo placement: left-aligned with society name
- CTA button (Join/Register) prominently placed right-aligned

### Hero Section (Homepage)
- Large hero with CSS society branding
- Welcoming headline introducing the society
- Brief tagline emphasizing community and innovation
- Dual CTAs: "Explore Events" (primary) and "Meet the Team" (secondary)
- Subtle animated gradient background or tech-themed pattern

### Cards (Team & Events)
- Consistent rounded corners (rounded-lg)
- Photo at top (aspect-ratio-square for team, aspect-ratio-video for events)
- Content padding: p-6
- Subtle shadow: shadow-md with hover:shadow-xl transition
- Team cards: Photo, Name (font-semibold, text-lg), Designation (text-sm, muted)
- Event cards: Image, Title, Date badge, Short description, CTA button

### Forms (Registration & Contact)
- Clean single-column layout (max-w-2xl)
- Input fields: border with focus ring effect
- Labels above inputs (text-sm, font-medium)
- Required fields marked with asterisk
- Submit button: Full-width on mobile, auto-width on desktop
- Validation messages below each field

### Announcements Panel
- Card-based layout with recent updates
- Each announcement: Date badge, Title, Brief text, "Read More" link
- Chronologically ordered (newest first)
- Limit to 5-6 most recent on homepage, full list on dedicated page

### Footer
- Three-column layout (desktop): About/Links/Contact
- Social media icons using Font Awesome
- Copyright and competition credits
- Subtle top border separator

## Animations & Interactions

**Subtle Transitions**:
- Card hover: transform scale(1.02) with shadow enhancement (300ms ease)
- Button hover: slight background darkening
- Navigation items: underline slide-in effect
- Smooth scroll for anchor links

**NO excessive animations** - maintain professional demeanor

## Images Section

**Hero Section**: Large banner image showcasing GCU Lahore campus or CS students collaborating (1920x800px approx, optimized). Overlay with semi-transparent gradient for text readability.

**Team Member Photos**: Square headshots (400x400px), professional student portraits with consistent lighting/background

**Event Images**: Landscape format (1200x675px) showing past CSS events - workshops, competitions, seminars. For upcoming events, use relevant tech/event themed illustrations.

**Gallery (Past Events)**: Multiple photos per event in masonry/grid layout, optimized thumbnails with lightbox capability

**Placement**: 
- Homepage hero: Full-width background image
- Team cards: Circular or rounded square avatars
- Event cards: Top-positioned featured images
- Past events: Multi-image galleries with hover previews

## Responsive Behavior

**Breakpoints**:
- Mobile: < 768px (single column, stacked navigation)
- Tablet: 768px - 1024px (2-column grids)
- Desktop: > 1024px (3-4 column grids, full navigation)

**Mobile Priorities**:
- Hamburger menu with clean slide-out
- Single-column card stacking
- Touch-friendly button sizes (min 44px height)
- Optimized image sizes per viewport

## Accessibility Standards

- Minimum contrast ratio 4.5:1 for body text
- Focus indicators on all interactive elements (ring-2 ring-offset-2)
- Semantic HTML (header, nav, main, section, footer)
- Alt text for all images
- ARIA labels for icon-only buttons
- Keyboard navigation support throughout